import { createSlice } from "@reduxjs/toolkit"
import {api} from './api.js'

const initialState={}

const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher(
            api.endpoints.getOneNote.matchFulfilled,
            (state,{payload})=>{
                state[payload.id] = payload
            }
        )
        builder.addMatcher(
            api.endpoints.getNotes.matchFulfilled,
            (state,{payload})=>{
                state.notes = payload
            }
        )
        builder.addMatcher(
            api.endpoints.createNote.matchFulfilled,
            (state,{payload})=>{
                state[payload.id] = payload
            }
        )
        builder.addMatcher(
            api.endpoints.deleteNote.matchFulfilled,
            (state,{payload})=>{
                delete(state[payload.noteId])
            }
        )
        builder.addMatcher(
            api.endpoints.editNote.matchFulfilled,
            (state,{payload})=>{
                state[payload.id] = payload
            }
        )
    }
})

export default noteSlice.reducer;
