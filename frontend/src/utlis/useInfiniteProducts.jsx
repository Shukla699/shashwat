import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadlazyproduct } from '../store/reducers/productSlice';
import axios from "../api/axiosconfig.js";
// ...other imports...


const useInfiniteProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products || []);
    const users = useSelector((state) => state.userReducer.users); // <--- Add this
    const [hasMore, setHasMore] = useState(true);

    const fetchproducts = async () => {
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
        }
    };

    useEffect(() => {
        fetchproducts();
        // eslint-disable-next-line
    }, [users]); // <--- Add users as a dependency

    return { products, hasMore, fetchproducts };
};

export default useInfiniteProducts;