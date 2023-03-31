import { loginStart,loginSuccess,loginFailure,signupStart,signupFailure,signupSuccess } from "./userSlice";
import { addPostFailure,addPostSuccess,addPostStart } from "./postSlice";
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
    dispatch(signupStart());
    try {
        const res = await axios.post("http://localhost:5000/auth/register",data.data);
        dispatch(signupSuccess(res.data));
    } catch (error) {
        dispatch(signupFailure());
    }
}

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