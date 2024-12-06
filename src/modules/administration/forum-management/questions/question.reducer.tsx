import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { defaultValue, IQuestion } from "../../../../shared/models/question.model";
import { serializeAxiosError } from "../../../../shared/utils/reducers.utils";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../../configs/api";
import { IQuestionSearchModel } from "../../../../shared/models/requests/question-search.model";
import { IActivity } from "../../../../shared/models/activity.model";
import { IQuestionUpdateRequest } from "../../../../shared/models/requests/question-update-request.model";

const apiPath = "/forum/questions";

const initialState = {
  loading: false,
  questions: [] as ReadonlyArray<IQuestion>,
  question: defaultValue,
  totalItems: 0,
  totalPages: 0,
  updating: false,
  updateSuccess: false,
  errorMessage: null,
  serverError: null,
  successMessage: null,
};

// Async actions
export const searchQuestions = createAsyncThunk(
  "questions/searchQuestions",
  async (model: {
    searchModel: IQuestionSearchModel;
    pagingParams?: PaginationRequestParams;
  }) => {
    return await axiosInstance.post<ApiResponse<PaginatedResponse<IActivity>>>(
      `${apiPath}/list`,
      model.searchModel,
      {
        params: model.pagingParams,
      },
    );
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (createRequest: IQuestionUpdateRequest) => {
    return await axiosInstance.post<ApiResponse<IQuestion>>(apiPath, createRequest);
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
export const QuestionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetQuestionState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchQuestions.fulfilled, (state, action) => {
        console.log({ action });
        state.loading = false;
        state.questions = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      })
      .addMatcher(isPending(searchQuestions), (state) => ({
        ...initialState,
        loading: true,
      }))
      .addMatcher(isRejected(searchQuestions), (state, action) => ({
        ...initialState,
        errorMessage: action.error.message,
        serverError: true,
        loading: false,
      }));
  },
});

export type QuestionState = Readonly<typeof initialState>;

export default QuestionSlice.reducer;
