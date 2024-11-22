import { IAcessGrant } from "./access-grant.model";
import { RoleStatus } from "./enums/role.enum";

export interface IRole {
  roleId?: number;
  roleName?: string;
  status?: keyof typeof RoleStatus | null;
  description?: string | null;
  accessGrants?: IAcessGrant[] | null;
}

export const defaultValue: Readonly<IRole> = {};
