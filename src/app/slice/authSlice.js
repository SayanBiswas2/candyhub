import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:'',
    loggedIn:false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail:(state,action)=>{
            state.email= action.payload
        },
        setLoginStatus:(state,action) =>{
            state.loggedIn = action.payload
        }
    }
})

export const { setEmail, setLoginStatus } = authSlice.actions

export default authSlice.reducer