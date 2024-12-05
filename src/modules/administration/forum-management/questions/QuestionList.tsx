import {
  ChatBubbleLeftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { IQuestion } from "../../../../shared/models/question.model";
import EmptyList from "../../../../components/loading/EmptyList";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import LoadingOverlay from "../../../../components/loading/LoadingOverlay";
import { useEffect, useState } from "react";
import { IQuestionSearchModel } from "../../../../shared/models/search/question-search.model";
import { PaginationRequestParams } from "../../../../configs/api";
import { searchQuestions } from "./question.reducer";
import CustomSelect from "../../../../components/search/CustomSelect";
import { Add, Close, Search } from "@mui/icons-material";
import PaginationBar from "../../../../components/pagination/PaginationBar";

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

          {questionState.questions.map((question) => (
            <div className="bg-white border-t border-l border-r border-gray-100 shadow-sm rounded-lg p-4 mt-2 hover:cursor-pointer hover:shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-semibold">{question.title}</h3>
                {/* <div className="flex items-center space-x-2">
     {question.tags.map(tag => (
       <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
         {tag}
       </span>
     ))}
   </div> */}
              </div>
              <p className="text-base mb-2">&nbsp;{question.body}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Bởi{" "}
                  {question.user
                    ? question.user.firstName + question.user.lastName
                    : "Vô danh"}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-green-600">
                    <HandThumbUpIcon className="mr-1 w-5 h-5" /> 10
                  </button>
                  <button className="flex items-center text-red-600">
                    <HandThumbDownIcon className="mr-1 w-5 h-5" /> 20
                  </button>
                </div>
              </div>

              {/* Phần trả lời */}

              <div className="bg-gray-100 p-3 mt-2 rounded">
                <p>Câu trả lời tốt nhất:</p>
                <p className="">&nbsp; answer</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Bởi cac</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center text-green-600">
                      <HandThumbUpIcon className="mr-1 w-5 h-5" /> 10
                    </button>
                    <button className="flex items-center text-red-600">
                      <HandThumbDownIcon className="mr-1 w-5 h-5" /> 20
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

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
