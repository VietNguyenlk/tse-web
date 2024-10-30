import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserStatus } from "./userSlice";

export const selectAllUsers = (state: RootState) => state.user.users;

export const selectActiveUser = createDraftSafeSelector(selectAllUsers, (users) =>
  users.filter(
    (user) => user.status && user.status === UserStatus.ACTIVE.toString(),
  ),
);
