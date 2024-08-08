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
  tagTypes: ["CurrentUser", "Document", "Folder", "Note"],
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
    getOneDoc: builder.query({
      query: ({docId}) => ({
        url: `documents/${docId}`
      }),
      providesTags:["Document"]
    }),
    createDoc: builder.mutation({
      query: (formData, id) => ({
        //hard coded url for testing purposes
        url: `documents/`,
        method: "POST",
        body: formData,
      }),
      providesTags: ["Document"],
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
    getNotes: builder.query({
      query: (docId) => `/notes?docId=${docId}`,
      providesTags: ["Note"]
    }),
    getOneNote: builder.query({
      query: (noteId) => `/notes/${noteId}`,
      providesTags:["Note"]
    }),
    createNote: builder.mutation({
      query: ({user,content,docId})=>({
        url:`/notes?docId=${docId}`,
        method:'POST',
        body:{content}
      }),
      invalidatesTags:['Note']
    }),
    deleteNote: builder.mutation({
      query: ({user,noteId})=>({
        url: `/notes/${noteId}`,
        method:'DELETE',
      }),
      invalidatesTags:["Note"]
    }),
    editNote : builder.mutation({
      query: ({user,noteId,content})=>({
        url:`/notes/${noteId}`,
        method:'PUT',
        body:{content}
      })
    })
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
  useGetOneDocQuery,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useGetNotesQuery,
  useGetFoldersMutation,
  useGetOneFolderMutation,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useEditNoteMutation,
  useGetOneNoteQuery
} = api;
