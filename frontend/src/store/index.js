import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import sessionSliceReducer from "./features/sessionSlice";
import folderSliceReducer from "./features/folderSlice";
import documentSliceReducer from "./features/documentSlice";
import noteSliceReducer from "./features/noteSlice";
import { api } from "./features/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import annotationSliceReducer from "./features/annotationSlice";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    session: sessionSliceReducer,
    folder: folderSliceReducer,
    document: documentSliceReducer,
    note: noteSliceReducer,
    annotation : annotationSliceReducer
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
