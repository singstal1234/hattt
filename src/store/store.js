// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import caseReducer from "./slices/caseSlice";
import modalReducer from "./slices/modalSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    case: caseReducer,
    modal: modalReducer,
    category: categoryReducer,
  },
});
