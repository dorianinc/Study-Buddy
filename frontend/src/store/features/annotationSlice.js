import {createSlice} from "@reduxjs/toolkit"
import {api} from './api.js'
const initialState = {
    annotations:{}
}

const annotationSlice = createSlice({
    name:'annotation',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(
            api.endpoints.createAnnotation.matchFulfilled,
            (state,{payload})=>{
                state[payload.id] = payload
            }
        )
        builder.addMatcher(
            api.endpoints.getAllAnnotations.matchFulfilled,
            (state,{payload})=>{
                state.annotations = payload
            }
        )
    }
})

export default annotationSlice.reducer
export const selectAnnotation = (state) => state.annotations
