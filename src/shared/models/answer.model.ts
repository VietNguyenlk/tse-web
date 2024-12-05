import { IBaseModel } from "./base.model";
import { IQuestion } from "./question.model";
import { IUser } from "./user.model";

export interface IAnswer extends IBaseModel {
  id?: number;
  body?: string;
  user?: Partial<IUser>;
  question?: Partial<IQuestion>;
}

export const defaultValue: Readonly<IAnswer> = {};
