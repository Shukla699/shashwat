import axios from "../../api/axiosconfig.js";
import { loadproduct } from "../reducers/productSlice";
import { toast } from "react-toastify";

export const asyncloadproducts = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/products");
        dispatch(loadproduct(data));
    } catch (error) {
        console.error("Load products error:", error);
        toast.error("Failed to load products.");
    }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);
        dispatch(asyncloadproducts());
        toast.success("Product created successfully!");
    } catch (error) {
        console.error("Create product error:", error);
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
            console.error("Update product error:", error);
            toast.error("Failed to update product.");
        }
    };

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/products/" + id);
        dispatch(asyncloadproducts());
        toast.success("Product deleted successfully!");
    } catch (error) {
        console.error("Delete product error:", error);
        toast.error("Failed to delete product.");
    }
};