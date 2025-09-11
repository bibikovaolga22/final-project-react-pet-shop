import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3333/products";

export const fetchProducts = createAsyncThunk(
  "categories/fetchProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/all`);

    return response.data;
  }
);

const initialState = {
  productsData: {},
  status: "idle",
  error: null,
};

function calculateDiscount(oldPrice, newPrice) {
  if (!oldPrice || oldPrice <= 0) return 0;
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(discount);
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const productsArray = action.payload.map((product) => ({
          ...product,
          discount: calculateDiscount(product.price, product.discont_price),
        }));
        state.productsData = {};
        for (let product of productsArray) {
          state.productsData[product.id] = product;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;
