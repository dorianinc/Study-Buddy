import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';

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
      // Add CSRF token handling
      const csrfToken = Cookies.get('XSRF-TOKEN');
      if (csrfToken) {
        headers.set('X-XSRF-TOKEN', csrfToken);
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
    restoreUser: builder.query({
      query: () => "session/",
      invalidatesTags: ["CurrentUser"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "session/",
        method: "DELETE",
      })
    })
  })
})

export default api;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useRestoreUserQuery,
  useLogoutMutation,
} = api;

