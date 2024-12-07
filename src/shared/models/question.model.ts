import { IAnswer } from "./answer.model";
import { IBaseModel } from "./base.model";
import { IQnACategory } from "./qna-category.model";
import { IQuestionTag } from "./question-tag.model";
import { IUser } from "./user.model";

export interface IQuestion extends IBaseModel {
  id?: number;
  title?: string;
  body?: string;
  user?: Partial<IUser>;
  categories?: Partial<IQnACategory>[];
  answer?: Partial<IAnswer>;
  questionTags?: Partial<IQuestionTag>[];
}

export const defaultValue: Readonly<IQuestion> = {};
