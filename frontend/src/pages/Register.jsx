import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { asyncregisteruser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Register = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const RegisterHandler = (user) => {
        user.id = nanoid();
        user.isAdmin = false;
        dispatch(asyncregisteruser(user));
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-yellow-100 to-blue-200 px-4">
            <form
                onSubmit={handleSubmit(RegisterHandler)}
                className="w-full max-w-md bg-white/80 p-10 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-lg"
            >
                <h2 className="text-5xl font-extrabold text-center text-indigo-700 drop-shadow-lg mb-10 tracking-tight">
                    Register
                </h2>

                <div className="mb-7 w-full">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        {...register("username", { required: "Username is required" })}
                        id="username"
                        className="w-full p-3 bg-white/90 text-gray-800 placeholder-gray-400 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        type="text"
                        placeholder="john-doe"
                    />
                    {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
                </div>

                <div className="mb-7 w-full">
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
                        placeholder="john@doe.com"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-7 w-full">
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
                        placeholder="********"
                    />
                    {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Register User
                </button>

                <p className="mt-8 text-center text-gray-700 text-sm">
                    Already have an account?{" "}
                    <Link className="text-indigo-700 font-semibold hover:underline" to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;