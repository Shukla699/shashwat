import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-indigo-700 mb-8 drop-shadow-lg">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products at great prices
        </p>
        <Link 
          to="/products" 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;