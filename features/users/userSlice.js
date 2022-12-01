import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./userThunk";

const initialState = {
  user: null,
  token: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, async (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
