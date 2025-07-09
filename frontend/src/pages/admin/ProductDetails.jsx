import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    asyncdeleteproduct,
    asyncupdateproduct,
} from "../../store/actions/productActions";

const ProductDetails = () => {
    const { id } = useParams();
    const {
        productReducer: { products },
        userReducer: { users },
    } = useSelector((state) => state);

    const product = products?.find((product) => product.id == id);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            image: product?.image,
            title: product?.title,
            price: product?.price,
            category: product?.category,
            description: product?.description,
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UpdateProductHandler = (updatedProduct) => {
        dispatch(asyncupdateproduct(id, updatedProduct));
    };

    const DeleteHandler = () => {
        dispatch(asyncdeleteproduct(id));
        navigate("/");
    };

    return product ? (
        <div className="space-y-20 px-4 py-14 max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row bg-white/80 backdrop-blur-2xl text-black rounded-3xl shadow-[0_8px_40px_rgba(80,80,200,0.12)] overflow-hidden border border-indigo-100 relative group transition-all duration-700 hover:scale-[1.02]">
               
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                <img
                    className="w-full md:w-1/2 h-96 object-cover rounded-none md:rounded-l-3xl transition-transform duration-700 group-hover:scale-105"
                    src={product.image}
                    alt={product.title}
                />
                <div className="p-10 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-indigo-800 mb-4 tracking-wide drop-shadow-lg">
                        {product.title}
                    </h1>
                    <h2 className="text-2xl text-green-600 font-bold mb-4 bg-green-100 inline-block px-5 py-2 rounded-full shadow animate-pulse">
                        ${product.price}
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                        {product.description}
                    </p>
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold text-sm mb-6 inline-block">
                        Category: {product.category}
                    </span>
                    <button className="self-start bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 mt-6">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>

            
            {users?.isAdmin && (
                <form
                    onSubmit={handleSubmit(UpdateProductHandler)}
                    className="bg-white/80 border border-indigo-200 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-5xl mx-auto flex flex-col gap-6 relative"
                >
                    {/* Decorative gradient blur */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
                    <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-4 drop-shadow-lg">
                        ✏️ Admin Panel: Update Product
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                            {...register("image")}
                            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 hover:ring-2 transition-all bg-white/70 placeholder-gray-500"
                            type="url"
                            placeholder="Image URL"
                        />
                        <input
                            {...register("title")}
                            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 hover:ring-2 transition-all bg-white/70 placeholder-gray-500"
                            type="text"
                            placeholder="Title"
                        />
                        <input
                            {...register("price")}
                            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 hover:ring-2 transition-all bg-white/70 placeholder-gray-500"
                            type="number"
                            placeholder="Price"
                        />
                        <input
                            {...register("category")}
                            className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 hover:ring-2 transition-all bg-white/70 placeholder-gray-500"
                            type="text"
                            placeholder="Category"
                        />
                    </div>

                    <textarea
                        {...register("description")}
                        className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 hover:ring-2 transition-all bg-white/70 placeholder-gray-500"
                        placeholder="Enter product description"
                        rows={4}
                    ></textarea>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg font-bold transition-transform duration-300 hover:scale-110">
                            ✅ Update Product
                        </button>
                        <button
                            type="button"
                            onClick={DeleteHandler}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full shadow-lg font-bold transition-transform duration-300 hover:scale-110"
                        >
                            ❌ Delete Product
                        </button>
                    </div>
                </form>
            )}
        </div>
    ) : (
        <p className="text-center text-gray-500 text-lg mt-20 animate-pulse">
            Loading...
        </p>
    );
};

export default ProductDetails;