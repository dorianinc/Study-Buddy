import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'CurrentUser',
  ],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ firstName, lastName, username, email, password }) => ({
        url: "users/",
        method: "POST",
        body: { firstName, lastName, email, username, password },
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    login: builder.mutation({
      query: ({ credential, password }) => ({
        url: "session/",
        method: "POST",
        body: { credential, password },
      }),
      invalidatesTags: ["CurrentUser"],
    }),
  })
})

export default api;

export const {
  useLoginMutation,
  useSignupMutation,
} = api;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
