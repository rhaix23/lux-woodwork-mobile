import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProductsThunk, fetchProductThunk } from "./productsThunk";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkAPI) => {
    return fetchAllProductsThunk(
      `/products?page${thunkAPI.getState().products.page}`,
      thunkAPI
    );
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (productId, thunkAPI) => {
    return fetchProductThunk(`/products/${productId}`, thunkAPI);
  }
);

const initialState = {
  products: [],
  product: {},
  loading: false,
  searchFilter: "",
  categoryFilter: "all",
  freeShippingFilter: false,
  sort: "Price: Low to High",
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
    setSort(state, action) {
      state.sort = action.payload;
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
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.loading = false;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setSearchFilter,
  setCategoryFilter,
  setFreeShippingFilter,
  setSort,
} = productsSlice.actions;

export default productsSlice.reducer;
