import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
