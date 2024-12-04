// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AI Travel Planner</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plan your perfect trip with the help of AI
        </p>
        <Link
          to="/plan-trip"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start Planning
        </Link>
      </div>
    </div>
  );
}

export default Home;