import {createSlice} from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:"",
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        // signup
        signupStart:(state)=>{
            state.isFetching=true;
        },
        signupSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        signupFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
    }
}) 

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
} =userSlice.actions;

export default userSlice.reducer;