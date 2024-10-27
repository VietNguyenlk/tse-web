import { UserEntity } from "./entities/user.entity";

export interface GetUsersPaginatedResponse {
  totalPages: number;
  totalItems: number;
  items: UserEntity[];
}

export interface GetUserPaginatedParams {
  page?: number;
  limit?: number;
  sortDirection?: string;
  sortBy?: string;
}
