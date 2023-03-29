import { loginStart,loginSuccess,loginFailure,signupStart,signupFailure,signupSuccess } from "./userSlice";
import axios from "axios";

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

export const signup =async(dispatch,data)=>{
    dispatch(signupStart());
    try {
        const res = await axios.post("http://localhost:5000/auth/register",data.data);
        dispatch(signupSuccess(res.data));
    } catch (error) {
        dispatch(signupFailure());
    }
}