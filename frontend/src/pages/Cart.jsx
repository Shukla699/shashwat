import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Cart = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const users = useSelector((state) => state.userReducer.users);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cardNumber: "",
            expiry: "",
            cvv: "",
        },
    });

    if (!users || !Array.isArray(users.cart)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-yellow-100 via-white to-orange-100">
                <span className="text-6xl mb-4 animate-bounce">🛒</span>
                <p className="text-center text-gray-700 text-2xl font-bold">Your cart is empty.</p>
            </div>
        );
    }

    const IncreaseQuantityHandler = (index) => {
        const copyuser = { ...users, cart: [...users.cart] };
        copyuser.cart[index] = {
            ...copyuser.cart[index],
            quantity: copyuser.cart[index].quantity + 1,
        };
        dispatch(asyncupdateuser(copyuser.id, copyuser));
    };

    const DecreaseQuantityHandler = (index) => {
        const copyuser = { ...users, cart: [...users.cart] };
        if (copyuser.cart[index].quantity > 1) {
            copyuser.cart[index] = {
                ...copyuser.cart[index],
                quantity: copyuser.cart[index].quantity - 1,
            };
        } else {
            copyuser.cart.splice(index, 1);
        }
        dispatch(asyncupdateuser(copyuser.id, copyuser));
    };

    const total = users.cart.reduce(
        (sum, c) => sum + Number(c.product.price) * c.quantity,
        0
    );

    const handlePayment = (data) => {
        setTimeout(() => {
            setPaymentSuccess(true);
            setShowPayment(false);
            reset();
            dispatch(asyncupdateuser(users.id, { ...users, cart: [] }));
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100 py-12 px-2">
            <h1 className="text-5xl font-extrabold text-center text-orange-700 mb-14 tracking-tight drop-shadow-lg">
                🛍️ Your Shopping Cart
            </h1>
            <ul className="max-w-3xl mx-auto space-y-10">
                {users.cart.map((c, index) => (
                    <li
                        className="flex items-center justify-between flex-wrap gap-8 bg-white/90 shadow-2xl rounded-3xl p-8 border border-orange-200 relative group transition-all duration-500 hover:scale-[1.02]"
                        key={c.product.id}
                    >
                        <div className="absolute -top-8 -left-8 w-28 h-28 bg-gradient-to-br from-orange-300 to-yellow-300 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                        <img
                            className="w-32 h-32 object-cover rounded-2xl border-2 border-orange-200 shadow-md"
                            src={c.product.image}
                            alt={c.product.title}
                        />
                        <span className="flex-1 font-bold text-gray-800 text-xl text-center px-4 line-clamp-2">
                            {c.product.title}
                        </span>
                        <span className="text-orange-700 font-extrabold text-2xl bg-orange-100 px-6 py-2 rounded-full shadow">
                            ${c.product.price}
                        </span>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => DecreaseQuantityHandler(index)}
                                className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full hover:from-red-600 hover:to-orange-600 text-2xl font-bold shadow transition-all duration-200"
                            >
                                -
                            </button>
                            <span className="px-6 py-2 bg-orange-50 rounded-full text-orange-700 font-bold text-xl shadow-inner">
                                {c.quantity}
                            </span>
                            <button
                                onClick={() => IncreaseQuantityHandler(index)}
                                className="px-5 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full hover:from-green-600 hover:to-yellow-600 text-2xl font-bold shadow transition-all duration-200"
                            >
                                +
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="max-w-3xl mx-auto mt-16 bg-white/90 rounded-3xl shadow-2xl p-10 border border-orange-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div className="text-3xl font-bold text-orange-700">
                        Total: <span className="text-4xl">${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => setShowPayment(true)}
                        className="mt-4 md:mt-0 px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-2xl text-2xl font-bold shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200"
                        disabled={users.cart.length === 0}
                    >
                        Proceed to Payment
                    </button>
                </div>
                {paymentSuccess && (
                    <div className="mt-8 text-center text-green-600 text-2xl font-bold animate-bounce">
                        Payment Successful! 🎉
                    </div>
                )}
            </div>
            {showPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <form
                        onSubmit={handleSubmit(handlePayment)}
                        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border-2 border-orange-200"
                    >
                        <h2 className="text-3xl font-extrabold text-center text-orange-700 mb-8">
                            Payment Details
                        </h2>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                            <input
                                {...register("cardNumber", {
                                    required: "Card number is always required",
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: "Card number must be 16 digits"
                                    }
                                })}
                                maxLength={16}
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                            {errors.cardNumber && (
                                <p className="text-red-600 text-xs mt-1">{errors.cardNumber.message}</p>
                            )}
                        </div>
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Expiry</label>
                                <input
                                    {...register("expiry", {
                                        required: "Expiry is required",
                                        pattern: {
                                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                            message: "Format MM/YY"
                                        }
                                    })}
                                    maxLength={5}
                                    placeholder="MM/YY"
                                    className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                />
                                {errors.expiry && (
                                    <p className="text-red-600 text-xs mt-1">{errors.expiry.message}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                                <input
                                    {...register("cvv", {
                                        required: "CVV is required",
                                        pattern: {
                                            value: /^\d{3,4}$/,
                                            message: "CVV must be 3 or 4 digits"
                                        }
                                    })}
                                    maxLength={4}
                                    placeholder="123"
                                    className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                />
                                {errors.cvv && (
                                    <p className="text-red-600 text-xs mt-1">{errors.cvv.message}</p>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl text-lg font-bold shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200"
                        >
                            Pay ${total.toFixed(2)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPayment(false)}
                            className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
export default Cart