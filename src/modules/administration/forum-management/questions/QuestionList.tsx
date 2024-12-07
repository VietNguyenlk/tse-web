import {
  Close,
  Delete,
  Edit,
  LockOutlined,
  MoreVert,
  Search,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import EmptyList from "../../../../components/loading/EmptyList";
import LoadingOverlay from "../../../../components/loading/LoadingOverlay";
import PaginationBar from "../../../../components/pagination/PaginationBar";
import CustomSelect from "../../../../components/search/CustomSelect";
import { PaginationRequestParams } from "../../../../configs/api";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { IQuestion } from "../../../../shared/models/question.model";
import { IQuestionSearchModel } from "../../../../shared/models/requests/question-search.model";
import { searchQuestions } from "./question.reducer";
import QuestionCard from "./QuestionCard";

interface QuestionListProps {
  questions?: ReadonlyArray<IQuestion>;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuestionModel, setSearchQuestionModel] =
    useState<IQuestionSearchModel>({
      searchText: "",
    });
  const questionState = useAppSelector((state) => state.question);
  const paginationParams: PaginationRequestParams = {
    page: currentPage,
    size: pageSize,
  };

  useEffect(() => {
    dispatch(
      searchQuestions({
        pagingParams: paginationParams,
        searchModel: searchQuestionModel,
      }),
    );
  }, [searchQuestionModel, pageSize, currentPage]);

  return (
    <div className="relative">
      {questionState.loading && (
        <LoadingOverlay isLoading={questionState.loading} minTimeout={100} />
      )}
      {questionState.questions?.length > 0 ? (
        <>
          <div className="flex justify-between items-center my-2">
            <div className="bg-white rounded-lg">
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <span>Sắp xếp theo:&nbsp;</span>
                  <CustomSelect placeholder="Mặc định" />
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative min-w-[300px]">
                <div
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  pl-2 ${
                    searchText.length > 0 ? "border-l-2" : ""
                  }`}
                >
                  <button
                    className="flex items-center "
                    onClick={() => console.log("searching")}
                  >
                    <Search />
                  </button>
                </div>
                {searchText.length > 0 && (
                  <button
                    className="absolute rounded-full hover:bg-gray-100 top-1/2 transform -translate-y-1/2 right-14 flex items-center text-gray-400"
                    onClick={() => {
                      setSearchText("");
                      setSearchQuestionModel({
                        ...searchQuestionModel,
                        searchText: "",
                      });
                    }}
                  >
                    <Close />
                  </button>
                )}
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuestionModel({
                        ...searchQuestionModel,
                        searchText: searchText,
                      });
                    }
                  }}
                  placeholder="Tìm kiếm..."
                  className="w-full pr-[88px] py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {questionState.questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>

          {questionState.questions.length > 0 && (
            <PaginationBar
              totalPages={questionState.totalPages}
              currentPage={currentPage}
              onPageSizeChange={setPageSize}
              onPageChange={setCurrentPage}
              totalItems={questionState.totalItems}
              itemsPerPage={pageSize}
            />
          )}
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default QuestionList;
