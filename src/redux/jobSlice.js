import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],  
        singleJob:null
    },
    reducers:{
        //actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        }
    }
})

export const {setAllJobs,setSingleJob} = jobSlice.actions;
export default jobSlice.reducer;