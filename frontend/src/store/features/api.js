import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // console.log("HEADERS", headers)
      // Add CSRF token handling
      const csrfToken = Cookies.get("XSRF-TOKEN");
      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }
      return headers;
    },
  }),
  tagTypes: ["CurrentUser", "Document", "Folder"],
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
      providesTags: ["CurrentUser"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "session/",
        method: "DELETE",
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    //Folders
    getFolders: builder.mutation({
      query: () => ({
        url: "folders/",
        method: "GET"
      }),
      providesTags: ["Folder"]
    }),
    getOneFolder: builder.mutation({
      query: (folderId) => ({
        url: `folders/${folderId}`
      }),
      providesTags: ["Folder"]
    }),
    //Documents
    createDoc: builder.mutation({
      query: (formData) => ({
        //hard coded url for testing purposes
        url: "documents?folderId=1/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDoc: builder.mutation({
      query: ({ user }) => ({
        url: "documents/:docId/",
        method: "DELETE",
      }),
      invalidatesTags: ["Document"]
    }),
    getFolders: builder.query({
      query: (user) => 'folders/',
      providesTags: ["Folder"]
    }),
    createFolder: builder.mutation({
      query: ({ user, name, category }) => ({
        url: "folders/",
        method: "POST",
        body: { name, category }
      }),
      invalidatesTags: ["Folder"]
    }),
  }),
});

export default api;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useRestoreUserQuery,
  useLogoutMutation,
  useCreateDocMutation,
  useDeleteDocMutation,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useGetFoldersMutation,
  useGetOneFolderMutation
} = api;
