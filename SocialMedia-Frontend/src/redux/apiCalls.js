import { loginStart,loginSuccess,loginFailure,signupStart,signupFailure,signupSuccess } from "./userSlice";
import { addPostFailure,addPostSuccess,addPostStart,retreivePostStart,retreivePostFailure, retreivePostSuccess } from "./postSlice";

import axios from "axios";

//login
export const login =async(dispatch,data)=>{
    dispatch(loginStart());
    try {
        // console.log(data.data);
        // const ou = {
        //     username:"admin",
        //     password:"admin"
        // }
        const res = await axios.post("http://localhost:5000/auth/login",data.data);
        // console.log(res);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
}
//register
export const signup =async(dispatch,data)=>{
    // console.log(data);
    dispatch(signupStart());
    try {
        const res = await axios.post("http://localhost:5000/auth/register",data.data);
        dispatch(signupSuccess(res.data));
    } catch (error) {
        dispatch(signupFailure());
    }
}

//get token
// const token = JSON.parse(localStorage.getItem("profile")).token;
// console.log(token);

// const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//upload a post(belonging to postShare.jsx Component)
export const uploadImg = async(dispatch,newPost)=>{
    // console.log(newPost);
    dispatch(addPostStart());
    try {
        const res = await axios.post("http://localhost:5000/post",newPost);
        // console.log(res.data); 
        dispatch(addPostSuccess(res.data));
    } catch (error) {
        dispatch(addPostFailure());
    }
}

//fetching user post
export const getTimelinePosts = async(dispatch,id)=>{
    // console.log(id)
    
  
    dispatch(retreivePostStart());
    try {
        const res = await axios.get(`http://localhost:5000/post/${id}/timeline`);
        // console.log(res.data);
        dispatch(retreivePostSuccess(res.data))
    } catch (error) {
        dispatch(retreivePostFailure());
    }
}

//just only call like post, no redux setup required
export const likePosts = async(id,userId)=>{
    // console.log(id,userId);
    const res= await axios.put(`http://localhost:5000/post/${id}/like`,{userId:userId});
    console.log(res);
}