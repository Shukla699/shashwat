import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadlazyproduct } from '../store/reducers/productSlice';
import { toast } from 'react-toastify';
import axios from "../api/axiosconfig.js";

const useInfiniteProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products || []);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchproducts = async () => {
        if (loading) return;
        setLoading(true);
        try {
            console.log('Fetching products, current count:', products.length);
            const { data } = await axios.get(`/products?_limit=6&_start=${products.length}`);
            console.log('Fetched products:', data.length);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setHasMore(true);
                dispatch(loadlazyproduct(data));
            }
        } catch (error) {
            console.error("Fetch products error:", error);
            toast.error("Failed to fetch products: " + (error.response?.data?.error || error.message));
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (products.length === 0) {
            console.log('Initial product fetch');
            fetchproducts();
        }
    }, []);

    return { products, hasMore, fetchproducts, loading };
};

export default useInfiniteProducts;