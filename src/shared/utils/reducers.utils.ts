import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
  SerializedError,
  SliceCaseReducers,
  UnknownAction,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

/**
 * Check if the async action type is rejected
 */
export function isRejectedAction(action: UnknownAction) {
  return action.type.endsWith("/rejected");
}

/**
 * Check if the async action type is pending
 */
export function isPendingAction(action: UnknownAction) {
  return action.type.endsWith("/pending");
}

/**
 * Check if the async action type is completed
 */
export function isFulfilledAction(action: UnknownAction) {
  return action.type.endsWith("/fulfilled");
}

const commonErrorProperties: Array<keyof SerializedError> = [
  "name",
  "message",
  "stack",
  "code",
];

export const serializeAxiosError = (value: any): AxiosError | SerializedError => {
  if (typeof value === "object" && value !== null) {
    if (isAxiosError(value)) {
      return value;
    }

    const simpleError: SerializedError = {};
    for (const property of commonErrorProperties) {
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }

    return simpleError;
  }
  return { message: String(value) };
};

export interface EntityState<T> {
  entities: ReadonlyArray<T>;
  entity: T;
  loading: boolean;
  updating: boolean;
  updateSuccess: boolean;
  errorMessage: string | null;
  totalItems: number;
  totalPages: number;
}

export const createEntitySlice = <
  T,
  Reducers extends SliceCaseReducers<EntityState<T>>,
>({
  name = "",
  initialState,
  reducers,
  extraReducers,
  skipRejectionHandling,
}: {
  name: string;
  initialState: EntityState<T>;
  reducers?: ValidateSliceCaseReducers<EntityState<T>, Reducers>;
  extraReducers?: (builder: ActionReducerMapBuilder<EntityState<T>>) => void;
  skipRejectionHandling?: boolean;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      /**
       * Reset the entity state to initial state
       */
      reset: () => {
        return initialState;
      },
      ...reducers,
    },
    extraReducers: (builder) => {
      if (extraReducers) {
        extraReducers(builder);
      }
      /*
       * Common rejection logic is handled here.
       * If you want to add your own rejection logic, pass `skipRejectionHandling: true`
       * while calling `createEntitySlice`
       * */
      if (!skipRejectionHandling) {
        builder.addMatcher(isRejectedAction, (state, action) => {
          state.loading = false;
          state.updating = false;
          state.updateSuccess = false;
          state.errorMessage = null;
        });
      }
    },
  });
};