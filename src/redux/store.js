import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/slices/categorySlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});
