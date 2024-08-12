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
                const newObj = {...state.annotations}
                newObj[payload.id] = payload
                state.annotations = newObj
            }
        )
        builder.addMatcher(
            api.endpoints.getAllAnnotations.matchFulfilled,
            (state,{payload})=>{
                const newObj = {}
                payload.forEach(ele=>newObj[ele.id] = ele)
                state.annotations = newObj
            }
        )
        builder.addMatcher(
            api.endpoints.updateAnnotations.matchFulfilled,
            (state,{payload})=>{
                const newObj = {...state.annotations}
                newObj[payload.id] = payload
                state.annotations = newObj
            }
        )
        builder.addMatcher(
            api.endpoints.deleteAnnotation.matchFulfilled,
            (state,{payload})=>{
                const newObj = {...state.annotations}
                delete newObj[payload.annotationId]
                state.annotations = newObj
            }
        )
    }
})

export default annotationSlice.reducer
export const selectAnnotation = (state) => state.annotations
