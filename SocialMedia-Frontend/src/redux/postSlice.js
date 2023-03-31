import { createSlice } from "@reduxjs/toolkit"; 

export const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        addPostStart:(state)=>{
            state.isFetching=true;
            state.error=false;
        },
        addPostSuccess:(state,action)=>{
            state.isFetching=false;
            state.posts.push(action.payload);
        },
        addPostFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
    }
})

export const {addPostFailure,addPostStart,addPostSuccess}=postSlice.actions;
export default postSlice.reducer;