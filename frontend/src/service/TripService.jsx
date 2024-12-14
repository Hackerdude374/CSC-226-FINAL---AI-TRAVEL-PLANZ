import axios from 'axios';

const API_URL = 'http://localhost:5152/api';

export const TripService = {
    createTrip: async (tripData) => {
        const response = await axios.post(`${API_URL}/trips`, tripData);
        return response.data;
    },

    getTripById: async (tripId) => {
        const response = await axios.get(`${API_URL}/trips/${tripId}`);
        return response.data;
    },

    getUserTrips: async (userEmail) => {
        const response = await axios.get(`${API_URL}/trips/user/${userEmail}`);
        return response.data;
    }
};