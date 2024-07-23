import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token;
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
    register: builder.mutation({
      query: ({ firstName, lastName, username, email, password }) => ({
        url: "auth/register",
        method: "POST",
        body: { email, username, password },
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    login: builder.mutation({
      query: ({ credential, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { credential, password },
      }),
      invalidatesTags: ["CurrentUser"],
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
