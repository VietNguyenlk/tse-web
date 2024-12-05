import {
  combineReducers,
  configureStore,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import activityManagement from "../modules/administration/activity-management/activity-management.reducer";
import userManagement from "../modules/administration/user-management/user-management.reducer";
import role from "../modules/administration/user-management/roles/role.reducer";
import authentication from "../modules/auth/authentication.reducer";
import activateUser from "../modules/account/activate/account-activate.reducer";
import register from "../modules/account/register/register.reducer";
import storage from "redux-persist/lib/storage";
import { PersistConfig, Persistor, persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import activity from "../modules/activity/activity.reducer";
import question from "../modules/administration/forum-management/questions/question.reducer";

const rootReducer = combineReducers({
  userManagement,
  activateUser,
  role,
  activityManagement,
  authentication,
  register,
  activity,
  question,
});

type RootReducer = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducer> = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authentication"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoredActions: [REHYDRATE, PURGE],
      //   ignoredActionPaths: ["payload.headers"],
      // },
    }),
});

const getStore = () => store;
export const persistedStore = persistStore(store);

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  UnknownAction
>;

export interface ExtendedPersistor extends Persistor {
  purge: () => Promise<void>;
}

export default getStore;
