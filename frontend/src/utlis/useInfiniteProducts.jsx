import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadlazyproduct } from '../store/reducers/productSlice';
import axios from "../api/axiosconfig.js";
// ...other imports...


const useInfiniteProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products || []);
    const users = useSelector((state) => state.userReducer.users);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchproducts = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                dispatch(loadlazyproduct(data));
            }
        } catch (error) {
            console.log(error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (products.length === 0) fetchproducts();
    }, []);

    return { products, hasMore, fetchproducts, loading };
};

export default useInfiniteProducts;