import { csrfFetch } from "./csrf";

//types
const UPLOAD_DOCUMENT = "documents/upload"

//action creator
const actionUploadDocument = (document) => {
  return {
    type: UPLOAD_DOCUMENT,
    document
  }
}

//thunks
export const thunkUploadDocument = (document) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/documents?folderId=1`, {
      method: "POST",
      headers: {
        'Content-Type': "multipart/form-data"
      },
      body: document
    });

    if (response.ok) {
      const backendRes = await response.json()
      console.log("IN THUNK OK BLOCK: ", backendRes)
      // dispatch(actionUploadDocument(document))
      return backendRes
    }
  } catch (err) {
    const errors = err.json()
    console.error(errors)
    return errors;
  }
}


//reducer
export default function documentsReducer (state = {}, action) {
  switch(action.type) {
    case UPLOAD_DOCUMENT: {
      return {...state, [action.document.id]: action.document}
    }
    default:
      return state;
  }
}
