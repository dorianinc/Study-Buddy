import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    }

    return middleware;
  }
})

export default store;
