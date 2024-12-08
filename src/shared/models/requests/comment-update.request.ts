export interface ICommentUpdateRequest {
  questionId?: number;
  body?: string;
  userId?: string;
  isAnswer?: boolean;
  isUpdate?: boolean;
}
