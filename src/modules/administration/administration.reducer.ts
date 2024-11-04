import { createSlice } from "@reduxjs/toolkit";

const initState = {
  loading: false,
  errorMessage: null,
  totalItems: 0,
};

export type AdministrationState = Readonly<typeof initState>;

// Actions

export const AdministrationSlice = createSlice({
  name: "administrator",
  initialState: initState as AdministrationState,
  reducers: {},
  extraReducers(builder) {},
});

export default AdministrationSlice.reducer;
