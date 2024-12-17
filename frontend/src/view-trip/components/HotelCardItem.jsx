import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };
    await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0]?.photos[3]?.name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        '{NAME}',
        resp.data.places[0]?.photos[3]?.name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        hotel?.hotelName +
        ',' +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md rounded-2xl bg-white overflow-hidden hover:shadow-xl">
        {/* Image */}
        <div className="relative">
          <img
            src={photoUrl ? photoUrl : '/placeholder.jpg'}
            alt={hotel?.hotelName}
            className="h-[200px] w-full object-cover"
          />
          {/* Optional Badge */}
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            ⭐ {hotel?.rating || 'N/A'}
          </div>
        </div>

        {/* Hotel Details */}
        <div className="p-4 flex flex-col gap-2">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {hotel?.hotelName || 'Hotel Name'}
          </h2>
          <h3 className="text-sm text-gray-600 truncate">
            📍 {hotel?.hotelAddress || 'Hotel Address'}
          </h3>
          <h3 className="text-sm text-green-700 font-medium">
            💰 {hotel?.price || 'Price Not Available'}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
