import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <h2 className="font-bold text-2xl text-gray-800 border-b-2 border-orange-400 pb-2 mb-5">
        Places to Visit
      </h2>

      {/* Itinerary */}
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mt-8">
            {/* Day Header */}
            <h2 className="font-semibold text-xl text-gray-700 mb-4">
              {item.day}
            </h2>

            {/* Plan Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {item.plan?.map((place, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Time */}
                  <h2 className="font-medium text-sm text-orange-600 mb-2">
                    {place.time}
                  </h2>
                  
                  {/* Place Details */}
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
