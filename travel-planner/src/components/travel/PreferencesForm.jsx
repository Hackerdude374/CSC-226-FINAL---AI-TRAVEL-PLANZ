// src/components/travel/PreferencesForm.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PreferencesForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    destination: '',
    budget: '',
    tripDuration: '',
    travelStyle: 'relaxed',
    interests: [],
    departureCity: '',
    travelDates: {
      start: '',
      end: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/trips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          userId: user.id,
          preferences
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Trip generated:', data);
      } else {
        throw new Error('Failed to generate trip');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Plan Your Perfect Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Where would you like to go?</label>
          <input
            type="text"
            placeholder="Enter destination"
            value={preferences.destination}
            onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Budget Range (USD)</label>
          <select 
            value={preferences.budget}
            onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select budget range</option>
            <option value="budget">Under $1000</option>
            <option value="moderate">$1000 - $3000</option>
            <option value="luxury">$3000+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Travel Style</label>
          <select
            value={preferences.travelStyle}
            onChange={(e) => setPreferences({...preferences, travelStyle: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="relaxed">Relaxed</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={preferences.travelDates.start}
              onChange={(e) => setPreferences({
                ...preferences,
                travelDates: {...preferences.travelDates, start: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={preferences.travelDates.end}
              onChange={(e) => setPreferences({
                ...preferences,
                travelDates: {...preferences.travelDates, end: e.target.value}
              })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Departure City</label>
          <input
            type="text"
            placeholder="Enter your departure city"
            value={preferences.departureCity}
            onChange={(e) => setPreferences({...preferences, departureCity: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Generating Trip...' : 'Generate Travel Plan'}
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;