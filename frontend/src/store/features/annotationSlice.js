import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    annotations:{}
}

const annotationSlice = createSlice({
    name:'annotation',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addMatcher(
            api.endpoints.createAnnotation.matchFullfilled,
            (state,{payload})=>{
                state.annotations = payload
            }
        )
    }
})

export default annotationSlice.reducer
