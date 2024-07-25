import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import sessionSliceReducer from "./features/sessionSlice";
import { api } from "./features/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    session: sessionSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(api.middleware);

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    }

    return middleware;
  }
})

setupListeners(store.dispatch);

export default store;
