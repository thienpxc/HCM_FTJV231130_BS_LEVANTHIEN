import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const jobAll = createAsyncThunk(
    "category/jobAll",
    async () =>{
        let res = await axios.get("http://localhost:3000/jobs")
        return res.data
    },
)
const jobDelete = createAsyncThunk(
    "category/jobDelete",
    async (id) =>{
        let res = await axios.delete(`http://localhost:3000/jobs/${id}`)
        return res.data
    },
)
const editjob = createAsyncThunk(
    "category/editjob",
    async (job) =>{
        let res = await axios.put(`http://localhost:3000/jobs/${job.id}`,job)
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
        .addCase(jobDelete.fulfilled,(state,action)=>{
            state.data = state.data.filter((item)=>item.id !== action.payload.id)
        })
        .addCase(editjob.fulfilled,(state,action)=>{
            let index = state.data.findIndex((item)=>item.id === action.payload.id)
            state.data[index] = action.payload
        })
    }
})

export const categoryReducer = categorySlice.reducer;
export const categoryAction = {
  ...categorySlice.actions,
  jobAll,
  jobDelete,
  editjob,
};