import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const addToCart = (productId, quantity) => ({
  type: "cart/addToCart",
  payload: { productId, quantity },
});
export const removeFromCart = (productId, quantity) => ({
  type: "cart/removeFromCart",
  payload: { productId, quantity },
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      if (state[action.payload.productId]) {
        state[action.payload.productId] += action.payload.quantity;
      } else {
        state[action.payload.productId] = action.payload.quantity;
      }
    },
    removeFromCart(state, action) {
      state[action.payload.productId] -= action.payload.quantity;
      if (state[action.payload.productId] <= 0) {
        delete state[action.payload.productId];
      }
    },
  },
});
export default cartSlice.reducer;
