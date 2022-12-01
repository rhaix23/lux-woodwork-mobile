import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";
import userSlice from "./features/users/userSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
  },
});
