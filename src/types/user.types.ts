export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  registerDate: string;
  phoneNumber: string | null;
  userType: string;
  faculty: string;
  className: string | null;
  cumulativeScore: number;
};

export interface GetUsersPaginatedResponse {
  totalPages: number;
  totalItems: number;
  items: User[];
}

export interface GetUserPaginatedParams {
  page?: number;
  limit?: number;
  sortDirection?: string;
  sortBy?: string;
}
