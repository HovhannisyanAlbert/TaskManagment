import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import taskManagmentSlice from "../components/TaskManagment/store/slice/taskManagmentSlice";

export const store = configureStore({
  reducer: {
    [taskManagmentSlice.name]: taskManagmentSlice.reducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const usedispatch: () => AppDispatch = useDispatch;
