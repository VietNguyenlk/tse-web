import { IQnATag } from "../qna-tag.model";

export interface IQuestionUpdateRequest {
  id?: number;
  title: string;
  body: string;
  userId: string;
  categoryIds?: number[];
  tagIds?: number[];
}
