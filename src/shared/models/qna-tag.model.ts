import { IBaseModel } from "./base.model";

export interface IQnATag extends IBaseModel {
  id?: number;
  name?: string;
}

export const defaultValue: Readonly<IQnATag> = {};
