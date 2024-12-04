// src/pages/TripPlanner.jsx
import React from 'react';
import PreferencesForm from '../components/travel/PreferencesForm';

function TripPlanner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plan Your Trip</h1>
      <PreferencesForm />
    </div>
  );
}

export default TripPlanner;