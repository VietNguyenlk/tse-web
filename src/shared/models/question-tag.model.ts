import { IBaseModel } from "./base.model";
import { IQnATag } from "./qna-tag.model";
import { IQuestion } from "./question.model";

export interface IQuestionTag extends IBaseModel {
  question?: Partial<IQuestion>;
  tag?: Partial<IQnATag>;
}

export const defaultValue: Readonly<IQuestionTag> = {};
