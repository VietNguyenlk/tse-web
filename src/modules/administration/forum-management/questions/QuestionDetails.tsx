import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CustomSelect from "../../../../components/search/CustomSelect";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { formatCustomRelativeTime } from "../../../../shared/utils/date-utils";
import CommentCard from "../comments/CommentCard";
import { getQuestionById } from "./question.reducer";
import { NearMe, Send } from "@mui/icons-material";
import {
  getAllCommentsOfQuestion,
  resetCommentState,
  updateComment,
} from "../comments/comment.reducer";
import { ICommentSearchModel } from "../../../../shared/models/requests/comment-search.model";
import { PaginationRequestParams } from "../../../../configs/api";
import PaginationBar from "../../../../components/pagination/PaginationBar";

const QuestionDetails: React.FC = () => {
  const { questionId } = useParams();
  const dispatch = useAppDispatch();
  const questionState = useAppSelector((state) => state.question);
  const commentState = useAppSelector((state) => state.comment);
  const authState = useAppSelector((state) => state.authentication);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paginationParams: PaginationRequestParams = {
    page: currentPage,
    size: pageSize,
  };

  useEffect(() => {
    dispatch(getQuestionById(questionId));
  }, []);

  useEffect(() => {
    dispatch(
      getAllCommentsOfQuestion({
        questionId: Number(questionId),
        paginationRequest: paginationParams,
      }),
    );
  }, [
    pageSize,
    currentPage,
    commentState.errorMessage,
    commentState.successMessage,
    commentState.updateSuccess,
  ]);

  const handleCommentSubmit = () => {
    if (comment && comment.trim() !== "") {
      dispatch(resetCommentState());

      dispatch(
        updateComment({
          body: comment,
          questionId: Number(questionId),
          userId: authState.userLogin,
          isUpdate: false,
        }),
      );
      setComment("");
    }
  };

  if (questionState.loading) return <div>Loading...</div>;

  if (!questionState.loading && !questionState.question)
    return <Navigate to="/404" replace />;

  return (
    <div className="container bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-700">
            {questionState.question.title}
          </h1>
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-sm">
              Đăng bởi{" "}
              <span className="font-bold">
                {[
                  questionState.question.user?.firstName,
                  questionState.question.user?.lastName,
                ].join(" ")}
              </span>
            </span>
            <span>{formatCustomRelativeTime(questionState.question.createdAt)}</span>
          </div>
          <hr className="my-2" />
          <p>
            {questionState.question.body} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Eum, ullam ex. Non, ut nobis nulla provident est
            pariatur assumenda possimus aperiam modi at vitae ea ad ab quia beatae
            sunt?
          </p>
          <div className="text-blue-600 font-bold flex gap-2 pt-4">
            <span className="bg-blue-200 px-1 rounded-lg">c#</span>
            <span className="bg-blue-200 px-1 rounded-lg">Java</span>
          </div>
        </div>
        {questionState.question?.answer && <CommentCard />}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-800">
            {questionState.question?.comments
              ? questionState.question?.comments.length
              : 0}{" "}
            câu trả lời
          </h1>
          <div className="flex items-center gap-2">
            <span>Sắp xếp: </span>
            <CustomSelect placeholder="Mặc định" size="lg" />
          </div>
        </div>

        <div className="-mt-4 space-y-4">
          {commentState?.comments?.map((comment) => {
            return <CommentCard key={comment.id} comment={comment} />;
          })}
        </div>
        {commentState.totalPages > 0 && (
          <PaginationBar
            totalPages={commentState.totalPages}
            currentPage={currentPage}
            onPageSizeChange={setPageSize}
            onPageChange={setCurrentPage}
            totalItems={commentState.totalItems}
            itemsPerPage={pageSize}
            isMargin={false}
          />
        )}
        <div>
          <h1 className="text-lg font-medium">Câu trả lời của bạn:</h1>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 p-4 rounded-lg w-full text-base"
            placeholder="Nhập câu trả lời của bạn ở đây..."
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="text-white border rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-1 flex items-center"
          >
            <NearMe />
            <span>Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
