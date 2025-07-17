import React, { lazy, Suspense, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useInfiniteProducts from '../utlis/useInfiniteProducts';
const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {

    
    const { products, hasMore, fetchproducts, loading } = useInfiniteProducts();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Get unique categories for filter dropdown
    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    // Filter products by search term and category
    const filteredProducts = products.filter(product =>
        (category === "All" || product.category === category) &&
        product.title &&
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
       
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            
            <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-12 tracking-tight drop-shadow-xl">
                ✨ Our Products ✨
            </h1>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2 rounded-xl border border-indigo-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full max-w-xs px-4 py-2 rounded-xl border border-indigo-300 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={fetchproducts}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
                    </div>
                }
                endMessage={
                    <p className="text-center text-xl text-gray-600 mt-12">
                        <b>🎉 Yay! You have seen it all 🎉</b>
                    </p>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full text-center text-xl text-gray-500 py-10">
                            No products found.
                        </div>
                    ) : (
                        filteredProducts.map((product, idx) => (
                            <div
                                key={product.id || idx}
                                className="transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                            >
                                <Suspense
                                    fallback={
                                        <div className="w-80 h-96 flex items-center justify-center bg-white rounded-2xl shadow-lg">
                                            <span className="animate-spin rounded-full h-8 w-8 border-t-4 border-indigo-600"></span>
                                        </div>
                                    }
                                >
                                    <ProductTemplate product={product} />
                                </Suspense>
                            </div>
                        ))
                    )}
                </div>
            </InfiniteScroll>
        </div>
        </>
    );
};

export default Products