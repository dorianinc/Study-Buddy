import { createSlice } from '@reduxjs/toolkit'
import { api } from './api.js'

const initialState = {
  user: null,
  token: null 
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      api.endpoints.restoreUser.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  }
})

export const { logout } = sessionSlice.actions;

export default sessionSlice.reducer

export const selectCurrentUser = (state) => state.session.user