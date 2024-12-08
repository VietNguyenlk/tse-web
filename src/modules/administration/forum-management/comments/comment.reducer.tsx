import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { defaultValue, IComment } from "../../../../shared/models/comment.model";
import { serializeAxiosError } from "../../../../shared/utils/reducers.utils";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../../configs/api";
import { ICommentUpdateRequest } from "../../../../shared/models/requests/comment-update.request";
import { ICommentSearchModel } from "../../../../shared/models/requests/comment-search.model";

const urlPath = "/forum/comments";

const initialState = {
  loading: false,
  comments: [] as ReadonlyArray<IComment>,
  comment: defaultValue,
  totalItems: 0,
  totalPages: 0,
  updating: false,
  updateSuccess: false,
  errorMessage: null,
  serverError: null,
  successMessage: null,
};

export type CommentState = Readonly<typeof initialState>;

// Async actions

export const getAllCommentsOfQuestion = createAsyncThunk(
  "comments/getAllCommentsOfQuestion",
  async (request: {
    questionId: number;
    paginationRequest?: PaginationRequestParams;
    searchModel?: ICommentSearchModel;
  }) => {
    return await axiosInstance.post<ApiResponse<PaginatedResponse<IComment>>>(
      `/forum/questions/${request.questionId}/comments`,
      request.searchModel,
      {
        params: request.paginationRequest,
      },
    );
  },
  { serializeError: serializeAxiosError },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (request: ICommentUpdateRequest) => {
    return await axiosInstance.post<ApiResponse<IComment>>(`${urlPath}`, request);
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetCommentState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsOfQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.updating = false;
        state.comment = action.payload.data.data;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(updateComment, getAllCommentsOfQuestion), (state) => {
        state.loading = true;
      })
      .addMatcher(
        isRejected(updateComment, getAllCommentsOfQuestion),
        (state, action) => ({
          ...initialState,
          loading: false,
          serverError: true,
          errorMessage: action.error.message,
        }),
      );
  },
});

export const { resetCommentState } = CommentSlice.actions;

export default CommentSlice.reducer;
