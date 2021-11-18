import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./reducers/CounterReducer";
import AuthReducer from "./reducers/AuthReducer";


export default configureStore({
  reducer: {
    CounterReducer,
    AuthReducer,
  },
});
