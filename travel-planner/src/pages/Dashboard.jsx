// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'Traveler'}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trip cards will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Your Saved Trips</h2>
          <p className="text-gray-600">No trips saved yet. Start planning your next adventure!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;