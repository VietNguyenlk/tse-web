import {
  combineReducers,
  configureStore,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import activity from "../modules/activity/activity.reducer";
import userManagement from "../modules/administration/user-management/user-management.reducer";
import authentication from "../modules/auth/authentication.reducer";
import storage from "redux-persist/lib/storage";
import {
  PersistConfig,
  Persistor,
  persistReducer,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  userManagement,
  activity,
  authentication,
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
      serializableCheck: {
        ignoredActions: [REHYDRATE, PURGE],
      },
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
