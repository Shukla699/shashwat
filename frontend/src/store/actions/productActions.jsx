import axios from "../../api/axiosconfig.js";
import { loadproduct } from "../reducers/productSlice";
import { toast } from "react-toastify";

export const asyncloadproducts = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/products");
        dispatch(loadproduct(data));
    } catch (error) {
        console.log(error);
    }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);
        dispatch(asyncloadproducts());
        toast.success("Product created successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Failed to create product.");
    }
};

export const asyncupdateproduct =
    (id, product) => async (dispatch, getState) => {
        try {
            await axios.patch("/products/" + id, product);
            dispatch(asyncloadproducts());
            toast.success("Product updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product.");
        }
    };
    export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/products/" + id);
        dispatch(asyncloadproducts());
        toast.success("Product deleted successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete product.");
    }
};

// productActions.jsx
