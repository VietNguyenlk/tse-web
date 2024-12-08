import { set, useForm } from "react-hook-form";
import { MultiSelectOption } from "../../../../components/search/MutilpleSelect";
import { useState } from "react";
import { Close, ControlPoint, NearMe, Send } from "@mui/icons-material";
import { IQuestion } from "../../../../shared/models/question.model";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { createQuestion, searchQuestions } from "./question.reducer";
import { IQuestionUpdateModel } from "../../../../shared/models/requests/question-update-request.model";

const NewQuestion: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQuestion>();
  const authState = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const [toggleAddQuestion, setToggleAddQuestion] = useState(false);

  const getCategoryOptions = (): MultiSelectOption[] => {
    return [
      { value: "1", label: "Covid-19" },
      { value: "2", label: "Vaccine" },
      { value: "3", label: "Sức khỏe" },
    ];
  };

  const getQuestionHashTags = (): MultiSelectOption[] => {
    return [
      { value: "1", label: "#Covid-19" },
      { value: "2", label: "#Vaccine" },
      { value: "3", label: "#Sức khỏe" },
      { value: "4", label: "#Lập trình" },
      { value: "5", label: "#AI" },
    ];
  };

  const submitHandler = (data: IQuestionUpdateModel) => {
    const addRequest: IQuestionUpdateModel = {
      ...data,
      isUpdate: false,
      userId: authState.userLogin as string,
    };
    dispatch(createQuestion(addRequest));
    reset();
    setToggleAddQuestion(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div
          className={`
            flex flex-col gap-3 
            overflow-hidden 
            transition-all 
            duration-300 
            ease-in-out 
            ${toggleAddQuestion ? "max-h-96 opacity-100 " : "max-h-0 opacity-0 "}`}
        >
          <div className="flex flex-col gap-1">
            <label>
              Tiêu đề (tối đa 100 kí tự){" "}
              <span className="text-base text-red-600">
                *{errors.title?.message}
              </span>
            </label>
            <input
              {...register("title", {
                required: { value: true, message: "Tiêu đề không được để trống" },
                minLength: {
                  value: 10,
                  message: "Tiêu đề phải có ít nhất 10 ký tự",
                },
                maxLength: {
                  value: 150,
                  message: "Tiêu đề không được vượt quá 100 ký tự",
                },
              })}
              type="text"
              className="border-gray-200 rounded-lg text-xl font-bold "
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Nội dung{" "}
              <span className="text-base text-red-600">*{errors.body?.message}</span>
            </label>
            <textarea
              {...register("body", {
                required: { value: true, message: "Nội dung không được để trống" },
                minLength: {
                  value: 10,
                  message: "Nội dung phải có ít nhất 10 ký tự",
                },
              })}
              className="border-gray-200 rounded-lg text-base "
              rows={4}
            />
          </div>
          {/* <div className="flex flex-col gap-1">
            <label>Danh mục</label>
            <MultiSelect
              options={getCategoryOptions()}
              placeholder="Không có danh mục"
              maxSizeSelected={3}
              size="lg"
            />
          </div> */}
          {/* <TagInput /> */}
        </div>

        <div className="flex justify-end gap-2">
          {toggleAddQuestion ? (
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setToggleAddQuestion(false);
                  reset();
                }}
                className="bg-red-600 text-base text-white px-2 py-2 flex items-center space-x-2 rounded-xl hover:bg-red-700"
              >
                <Close />
                <span>Huỷ bỏ</span>
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-base text-white px-2 py-2 flex items-center space-x-2 rounded-xl hover:bg-blue-700"
              >
                <NearMe />
                <span>Đăng câu hỏi</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setToggleAddQuestion(true)}
              className="bg-blue-600 text-base text-white px-2 py-2 flex items-center space-x-2 rounded-xl hover:bg-blue-700"
            >
              <ControlPoint />
              <span>Thêm câu hỏi</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewQuestion;
