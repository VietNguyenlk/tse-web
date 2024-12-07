import { IQnATag } from "../qna-tag.model";

export interface IQuestionUpdateModel {
  isUpdate?: boolean;
  id?: number;
  title?: string;
  body?: string;
  userId?: string;
  categoryIds?: number[];
  tagIds?: number[];
}
