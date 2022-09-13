import axios from "../utils/axiosCustomize";

// AUTH

const postLogin = async (email, password) => {
  return await axios.post(`api/v1/login`, { email, password });
};

const postRegister = async (email, username, password) => {
  return await axios.post(`api/v1/register`, { email, username, password });
};

const postLogout = async () => {
  return await axios.post(`api/v1/logout`);
};
// TRIP

const getAllTrips = async () => {
  return await axios.get(`api/v1/trip/read`);
};

const getTripWithUserId = async (userId) => {
  return await axios(`api/v1/trip/${userId}`);
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

const putUpdateTrip = async (
  id,
  startPlace,
  startDate,
  destination,
  duration
) => {
  return await axios.put(`api/v1/trip/update`, {
    id,
    startPlace,
    startDate,
    destination,
    duration,
  });
};

const deleteTrip = async (tripId) => {
  return await axios.delete(`api/v1/trip/delete`, { data: { id: tripId } });
};

// Cost
const postCreateNewCost = async (
  costType,
  costValue,
  costDescription,
  tripId
) => {
  return await axios.post(`api/v1/cost/create`, {
    costType,
    costValue,
    costDescription,
    tripId,
  });
};

const deleteCost = async (id) => {
  return await axios.delete(`api/v1/cost/delete`, { data: { id } });
};

const putUpdateCost = async (id, costValue, costDescription) => {
  return await axios.put(`api/v1/cost/update`, {
    id,
    costValue,
    costDescription,
  });
};

export {
  postLogin,
  postRegister,
  getAllTrips,
  getTripWithUserId,
  deleteTrip,
  postCreateNewTrip,
  putUpdateTrip,
  postCreateNewCost,
  deleteCost,
  putUpdateCost,
  postLogout,
};
