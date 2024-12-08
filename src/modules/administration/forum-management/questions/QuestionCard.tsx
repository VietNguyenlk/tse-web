import {
  LockOpenOutlined,
  LockOutlined,
  MoreVert,
  PushPin,
  ThumbDownOutlined,
  ThumbUpOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../configs/store";
import { QuestionStatus } from "../../../../shared/models/enums/question.enum";
import { IQuestion } from "../../../../shared/models/question.model";
import { formatCustomRelativeTime } from "../../../../shared/utils/date-utils";

interface QuestionCardProps {
  question?: IQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const authState = useAppSelector((state) => state.authentication);
  const navigate = useNavigate();
  const [toggleShowActionMenu, setToggleShowActionMenu] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setToggleShowActionMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mt-2 hover:shadow-lg relative">
      {authState.roles.includes("admin") && (
        <div className="absolute top-2 right-2 flex gap-2">
          {question.isPin && <PushPin className="mt-0.5" />}
          {question.status === QuestionStatus.LOCKED && (
            <LockOutlined className="mt-0.5" />
          )}

          <button
            ref={buttonRef}
            onClick={() => setToggleShowActionMenu(!toggleShowActionMenu)}
            className=" rounded-lg hover:bg-gray-200 hover:cursor-pointer"
          >
            <MoreVert sx={{ width: 28, height: 28 }} />
          </button>
        </div>
      )}

      {toggleShowActionMenu && (
        <div
          ref={menuRef}
          className={`absolute top-10 right-2 bg-white border rounded-lg shadow-lg z-1 w-48overflow-hidden transition-all 
                              duration-300 
                              ease-in-out
                            ${
                              toggleShowActionMenu
                                ? "opacity-100 scale-100 translate-y-0"
                                : "opacity-0 scale-95 -translate-y-2"
                            }
                          `}
        >
          <ul className="divide-y divide-gray-100">
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-darkblue">
              <PushPin />
              {!question.isPin ? "Ghim" : "Bỏ ghim"}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-darkblue">
              {question.status === QuestionStatus.LOCKED ? (
                <>
                  <LockOpenOutlined />
                  Mở Khoá
                </>
              ) : (
                <>
                  <LockOutlined />
                  Khoá
                </>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-red-600">
              {question.isDeleted ? (
                <>
                  <VisibilityOutlined />
                  Hiện
                </>
              ) : (
                <>
                  <VisibilityOffOutlined />
                  Ẩn
                </>
              )}
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <Link
          to={`${question.id}`}
          className="text-2xl font-semibold hover:text-blue-700 hover:cursor-pointer"
        >
          {question.title}
        </Link>
        {/* <div className="flex items-center space-x-2">
     {question.tags.map(tag => (
       <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
         {tag}
       </span>
     ))}
   </div> */}
      </div>

      <p className="text-base mb-2 pl-4">{question.body}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Bởi{" "}
          {question.user
            ? question.user.firstName + question.user.lastName
            : "Vô danh"}
        </span>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-green-600">
            <ThumbUpOutlined className="mr-1" /> 10
          </button>
          <button className="flex items-center text-red-600">
            <ThumbDownOutlined className="mr-1" /> 20
          </button>
        </div>
      </div>

      {/* Phần trả lời */}

      <div className="bg-gray-100 p-3 mt-2 rounded">
        <p className="font-semibold">
          {question.answer
            ? "Câu trả lời tốt nhất:"
            : "Câu hỏi này đang chờ được giải đáp! Bạn có muốn xem qua không?"}
        </p>
        {question.answer ? (
          <div>
            <p className="pl-4">answer</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">Bởi cac</span>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-green-600">
                  <ThumbUpOutlined className="mr-1 " /> 10
                </button>
                <button className="flex items-center text-red-600">
                  <ThumbDownOutlined className="mr-1 " /> 20
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="text-xs italic text-gray-500 pt-4">
        <span>{formatCustomRelativeTime(question.createdAt)}</span>
      </div>
    </div>
  );
};

export default QuestionCard;
