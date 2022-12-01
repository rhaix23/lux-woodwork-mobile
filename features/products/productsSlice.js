import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsThunk } from "./productsThunk";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkAPI) => {
    return fetchAllProductsThunk(
      `/products?page${thunkAPI.getState().products.page}`,
      thunkAPI
    );
  }
);

const initialState = {
  products: [],
  loading: false,
  searchFilter: "",
  categoryFilter: "all",
  freeShippingFilter: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchFilter(state, action) {
      state.searchFilter = action.payload;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
    setFreeShippingFilter(state) {
      state.freeShippingFilter = !state.freeShippingFilter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setSearchFilter, setCategoryFilter, setFreeShippingFilter } =
  productsSlice.actions;

export default productsSlice.reducer;
