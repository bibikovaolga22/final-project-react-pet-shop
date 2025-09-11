import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/slices/categorySlice";
import productReducer from "./slices/productSlice";
import categoryProductsReducer from "./slices/categoryProductsSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    categoryProducts: categoryProductsReducer,
    cart: cartReducer,
  },
});
