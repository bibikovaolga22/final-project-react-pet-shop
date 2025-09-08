import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
const BASE_URL = "http://localhost:3333/categories";

export const fetchCategories = createAsyncThunk(
  "users/fetchCategories",
  async () => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;
