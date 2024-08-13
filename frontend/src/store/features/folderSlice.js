import { createSlice } from "@reduxjs/toolkit";
import { api } from './api.js'

const initialState = {
  folders: {},
  folder: {}
}

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getFolders.matchFulfilled,
      (state, { payload }) => {
        state.folders = payload
      }
    );
    builder.addMatcher(
      api.endpoints.getOneFolder.matchFulfilled,
      (state, { payload }) => {
        state.folder[payload.id] = payload;
      }
    )
  }
})

export default folderSlice.reducer;

export const selectFolder = (state) => state.folder
