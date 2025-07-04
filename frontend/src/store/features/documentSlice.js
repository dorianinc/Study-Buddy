import { createSlice } from "@reduxjs/toolkit";
import { api } from './api.js'

const initialState = {
  document: {},
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
        state.documents = payload
      }
    )
    builder.addMatcher(
      api.endpoints.getOneDoc.matchFulfilled,
      (state,{payload})=>{
        state.document[payload.id] = payload
      }
    )
  }
})

export default documentSlice.reducer

export const selectDocuments = (state) => state.documents
