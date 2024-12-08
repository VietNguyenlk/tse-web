import { IBaseModel } from "./base.model";
import { IQuestion } from "./question.model";
import { IUser } from "./user.model";

export interface IComment extends IBaseModel {
  id?: number;
  body?: string;
  isAnswer?: boolean;
  user?: Partial<IUser>;
  question?: Partial<IQuestion>;
  commentVotes?: any[];
}

export const defaultValue: Readonly<IComment> = {};
