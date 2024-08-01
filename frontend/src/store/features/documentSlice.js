import { createSlice } from "@reduxjs/toolkit";
import { api } from './api.js'

const initialState = {
  documents: {}
}

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.createDoc.matchFulfilled,
      (state, { payload }) => {
        //TODO: make sure to  update this once it's all connected
        state.documents = state.documents
      }
    )
  }
})

export default documentSlice.reducer

export const selectDocuments = (state) => state.documents
