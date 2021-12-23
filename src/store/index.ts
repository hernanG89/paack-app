import { configureStore } from "@reduxjs/toolkit";
import deliveriesService from "./services/deliveries";
import driverReducer from "./slices/driver";

const store = configureStore({
  reducer: {
    driver: driverReducer,
    [deliveriesService.reducerPath]: deliveriesService.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(deliveriesService.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
