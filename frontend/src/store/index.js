import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import sessionSliceReducer from "./features/sessionSlice";
import { api } from "./features/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    session: sessionSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    }
    
    return middleware;
  }
})

export default store;
