import axios from "../../api/axiosconfig.js";
import { loaduser, removeuser } from "../reducers/userSlice";
import { toast } from "react-toastify";

export const asynccurrentuser = () => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) dispatch(loaduser(user));
        else console.log("User not logged in!");
    } catch (error) {
        console.log(error);
    }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user");
        dispatch(removeuser())
        console.log("User Logged Out!");
    } catch (error) {
        console.log(error);
    }
};

export const asyncloginuser = (user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(
            `/users?email=${user.email}&password=${user.password}`
        );
        if (data.length > 0) {
            localStorage.setItem("user", JSON.stringify(data[0]));
            dispatch(asynccurrentuser());
            toast.success("Login successful!");
        } else {
            toast.error("Invalid email or password!");
        }
    } catch (error) {
        console.log(error);
        toast.error("Login failed. Please try again.");
    }
};

export const asyncregisteruser = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/users", user);
        toast.success("Registration successful! Please login.");
    } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.");
    }
};

export const asyncupdateuser =
    (id, user) => async (dispatch, getState) => {
        try {
             const {data} = await axios.patch("/users/" + id, user);
             localStorage.setItem("user", JSON.stringify(data));
        dispatch(asynccurrentuser())
           
        } catch (error) {
            console.log(error);
        }
    };
     export const asyncdeleteuser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/users/" + id);
        dispatch(asynclogoutuser())
    } catch (error) {
        console.log(error);
    }
};