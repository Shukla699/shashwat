import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-100 flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <span className="text-9xl animate-bounce">🔍</span>
                </div>
                <h1 className="text-6xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-gray-700 mb-6">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <div className="space-x-4">
                    <Link 
                        to="/" 
                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        🏠 Go Home
                    </Link>
                    <Link 
                        to="/products" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        🛍️ Shop Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;