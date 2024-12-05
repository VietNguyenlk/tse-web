import { IBaseModel } from "./base.model";

export interface IQnACategory extends IBaseModel {
  id?: number;
  name?: string;
  description?: string;
}

export const defaultValue: Readonly<IQnACategory> = {};
