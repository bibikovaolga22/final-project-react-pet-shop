import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3333/categories";

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategoryProducts",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default categoryProductsSlice.reducer;
