import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { asyncloginuser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const LoginHandler = (user) => {
        dispatch(asyncloginuser(user));
        
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-yellow-100 to-purple-200 px-4">
            <form
                onSubmit={handleSubmit(LoginHandler)}
                className="w-full max-w-md bg-white/80 p-10 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-lg"
            >
                <h2 className="text-5xl font-extrabold text-center text-indigo-700 drop-shadow-lg mb-10 tracking-tight">
                    Login
                </h2>

                <div className="mb-7">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format"
                            }
                        })}
                        id="email"
                        className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        type="email"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-7">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        id="password"
                        className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Login
                </button>

                <p className="mt-8 text-center text-gray-700 text-sm">
                    Don't have an account?{" "}
                    <Link className="text-indigo-700 font-semibold hover:underline" to="/register">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;