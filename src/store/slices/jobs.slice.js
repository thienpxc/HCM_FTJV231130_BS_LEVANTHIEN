import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const jobAll = createAsyncThunk(
    "category/jobAll",
    async () =>{
        let res = await axios.get("http://localhost:3000/jobs")
        return res.data
    },
)
const categorySlice = createSlice({
    name: "category",
    initialState:{
        data:[]
    },
    reducers: {
        setData: (state,action)=>{
            state.data = action.payload;
        }
    },
    extraReducers: (builder)=>{
    builder
        .addCase(jobAll.fulfilled,(state,action)=>{
            state.data= action.payload;
        })
        
    }
})

export const categoryReducer = categorySlice.reducer;
export const categoryAction = {
    ...categorySlice.actions,
    jobAll,
    
}