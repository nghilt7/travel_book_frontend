import axios from "../utils/axiosCustomize";

// AUTH

const postLogin = async (email, password) => {
  return await axios.post(`api/v1/login`, { email, password });
};

const postRegister = async (email, username, password) => {
  return await axios.post(`api/v1/register`, { email, username, password });
};

// TRIP

const getAllTrips = async () => {
  return await axios.get(`api/v1/trip/read`);
};

const postCreateNewTrip = async (
  tripName,
  startPlace,
  startDate,
  destination,
  duration,
  userId
) => {
  return await axios.post(`api/v1/trip/create`, {
    tripName,
    startPlace,
    startDate,
    destination,
    duration,
    userId,
  });
};

const deleteTrip = async (tripId) => {
  return await axios.delete(`api/v1/trip/delete`, { data: { id: tripId } });
};

export { postLogin, postRegister, getAllTrips, deleteTrip, postCreateNewTrip };
