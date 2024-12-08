import { Check } from "@mui/icons-material";
import { IComment } from "../../../../shared/models/comment.model";
import { formatCustomRelativeTime } from "../../../../shared/utils/date-utils";

interface CommentCardProps {
  comment?: Partial<IComment>;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment = {} }) => {
  return (
    <div className="p-2 bg-gray-50 rounded-lg border flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">
          {[comment?.user?.firstName, comment?.user?.lastName].join(" ")}
        </span>
        {comment?.isAnswer && (
          <Check className="text-green-700" sx={{ height: 32, width: 32 }} />
        )}
      </div>
      <div className="mt-1 border border-gray-200 rounded-lg bg-white p-2">
        <p>{comment?.body}</p>
      </div>
      <span className="mt-4 text-xs italic text-gray-500">
        {formatCustomRelativeTime(comment?.createdAt)}
      </span>
    </div>
  );
};

export default CommentCard;
