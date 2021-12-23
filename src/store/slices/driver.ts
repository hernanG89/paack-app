import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delivery } from "../types";

type SliceState = { activeDelivery: Delivery | null };
export const initialState: SliceState = { activeDelivery: null };

const driver = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setActiveDelivery: (state, action: PayloadAction<Delivery | null>) => {
      state.activeDelivery = action.payload;
    },
    removeActiveDelivery: (state) => {
      state.activeDelivery = null;
    },
  },
});

export const { setActiveDelivery, removeActiveDelivery } = driver.actions;
export default driver.reducer;
