import { useForm } from "react-hook-form";
import { MultiSelectOption } from "../../../../components/search/MutilpleSelect";
import { useState } from "react";
import { Close, ControlPoint, Send } from "@mui/icons-material";
import { IQuestion } from "../../../../shared/models/question.model";

const NewQuestion: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IQuestion>();
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

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {toggleAddQuestion && (
          <div className="flex flex-col gap-3">
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
                <span className="text-base text-red-600">
                  *{errors.body?.message}
                </span>
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
        )}
        <div className="flex justify-start gap-2 pb-4">
          {toggleAddQuestion ? (
            <div className="flex justify-start gap-2 pt-4">
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
                <Send className="-rotate-45 transform -translate-y-1" />
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
