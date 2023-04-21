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
        // logout
        
        logoutSuccess:(state)=>{
            
            state.currentUser="";
            state.isFetching=false;
            state.error=false;
            localStorage.clear();
        },
       
        //user Update
        userUpdateStart:(state)=>{
            state.isFetching=true;
        },
        userUpdateSuccess:(state,action)=>{
            state.isFetching=false;
            // console.log(action.payload);
            localStorage.setItem("profile",JSON.stringify(action.payload));
            state.currentUser=action.payload;
        },
        userUpdateFailure:(state)=>{
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
    logoutSuccess,
    userUpdateStart,
    userUpdateFailure,
    userUpdateSuccess,
} =userSlice.actions;

export default userSlice.reducer;