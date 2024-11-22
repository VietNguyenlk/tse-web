import { IRole } from "./role.model";
import { IUser } from "./user.model";

export interface IAcessGrant {
  user?: IUser | null;
  role?: IRole | null;
  isGranted?: boolean;
  note?: string | null;
}

export const defaultValue: Readonly<IAcessGrant> = {};
