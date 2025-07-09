import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateproduct } from "../../store/actions/productActions";

const CreateProduct = () => {
    const { register, reset, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const CreateProductHandler = (product) => {
        product.id = nanoid();
        dispatch(asynccreateproduct(product));
        navigate("/");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-100 via-white to-yellow-200">
            <form
                onSubmit={handleSubmit(CreateProductHandler)}
                className="w-full max-w-xl bg-white/90 p-10 rounded-3xl shadow-2xl text-black relative overflow-hidden animate-fade-in"
            >
                {/* Decorative gradient blur */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                <h2 className="text-4xl font-extrabold mb-10 text-center text-yellow-700 drop-shadow-lg animate-fade-in">
                    🛍️ Create Product
                </h2>

                <input
                    {...register("image")}
                    className="w-full mb-6 border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-left"
                    type="url"
                    placeholder="Image URL"
                />
                <input
                    {...register("title")}
                    className="w-full mb-6 border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-right"
                    type="text"
                    placeholder="Title"
                />
                <input
                    {...register("price")}
                    className="w-full mb-6 border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-left"
                    type="number"
                    placeholder="0.00"
                />
                <textarea
                    {...register("description")}
                    className="w-full mb-6 border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-fade-in"
                    placeholder="Enter description here..."
                ></textarea>
                <input
                    {...register("category")}
                    className="w-full mb-6 border-b-2 p-4 text-lg rounded-t-xl outline-none focus:border-yellow-700 transition-all duration-300 placeholder:text-gray-400 bg-white/70 animate-slide-in-right"
                    type="text"
                    placeholder="Category"
                />

                <button className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-xl text-xl font-bold shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition duration-300 hover:scale-105 animate-pop">
                    Create Product
                </button>
            </form>
            {/* Custom Animations */}
            <style>
                {`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(30px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                    animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slide-in-left {
                    0% { opacity: 0; transform: translateX(-40px);}
                    100% { opacity: 1; transform: translateX(0);}
                }
                .animate-slide-in-left {
                    animation: slide-in-left 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes slide-in-right {
                    0% { opacity: 0; transform: translateX(40px);}
                    100% { opacity: 1; transform: translateX(0);}
                }
                .animate-slide-in-right {
                    animation: slide-in-right 1s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes pop {
                    0% { transform: scale(0.8);}
                    80% { transform: scale(1.08);}
                    100% { transform: scale(1);}
                }
                .animate-pop {
                    animation: pop 0.5s cubic-bezier(.4,0,.2,1) both;
                }
                `}
            </style>
        </div>
    );
};

export default CreateProduct;