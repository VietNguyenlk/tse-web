import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { activitySlice } from "./features/activity/activitySlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    activity: activitySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
