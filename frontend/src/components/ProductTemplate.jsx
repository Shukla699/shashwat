import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asyncupdateuser } from '../store/actions/userActions';

const ProductTemplate = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer.users);

    const addToCartHandler = (product) => {
        if (!users) {
            toast.error("Please login to add items to cart");
            navigate("/login");
            return;
        }
        
        const copyUser = Array.isArray(users.cart)
            ? { ...users, cart: [...users.cart] }
            : { ...users, cart: [] };

        const index = copyUser.cart.findIndex((c) => c?.product?.id === product.id);

        if (index === -1) {
            copyUser.cart.push({ product, quantity: 1 });
        } else {
            copyUser.cart[index] = {
                product,
                quantity: copyUser.cart[index].quantity + 1,
            };
        }

        if (copyUser.id) {
            dispatch(asyncupdateuser(copyUser.id, copyUser));
            toast.success("Product added to cart!");
        }
    };

    return (
        <div className="w-80 bg-white border border-gray-200 shadow-2xl rounded-3xl p-6 mb-10 flex flex-col justify-between transition-transform duration-500 hover:scale-105 hover:shadow-indigo-200 group relative overflow-hidden">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-purple-100">
                <img
                    className="w-full h-56 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    src={product.image || "/placeholder.png"}
                    alt={product.title || "Product image"}
                />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-indigo-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                {product.title}
            </h1>
            <p className="text-gray-500 text-base mt-3 mb-4 min-h-[48px] line-clamp-2">
                {product.description ? product.description.slice(0, 90) + "..." : "No description available..."}
            </p>

            <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-black text-green-600 animate-pulse drop-shadow-lg">
                    ${product.price}
                </p>
                <button
                    onClick={() => users && addToCartHandler(product)}
                    disabled={!users}
                    className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl shadow-lg font-semibold tracking-wide transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${!users ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    🛒 Add to Cart
                </button>
            </div>

            <Link
                className="mt-6 block text-center text-lg text-indigo-700 font-bold hover:underline hover:text-purple-700 transition-colors duration-300"
                to={`/product/${product.id}`}
            >
                🔍 More Info
            </Link>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
        </div>
    );
};

export default ProductTemplate;