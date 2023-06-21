import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    admin:false,
    details:{
        id:'',
        name:'',
        email:'',
        mobile:'',
    },
    permission:{
        products:false,
        orders:false,
        admin:false,
        feedbacks:false
    }
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin:(state,action)=>{
            state.admin= action.payload
        },
        setPermission:(state,action)=>{
            state.permission = action.payload
        },
        setDetails:(state,action)=>{
            state.details = action.payload
        }
    }
})

export const { setAdmin,setPermission,setDetails } = adminSlice.actions

export default adminSlice.reducer