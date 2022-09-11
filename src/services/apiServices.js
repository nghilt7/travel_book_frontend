import axios from "../utils/axiosCustomize";

// AUTH

const postLogin = async (email, password) => {
  return await axios.post(`api/v1/login`, { email, password });
};

const postRegister = async (email, username, password) => {
  return await axios.post(`api/v1/register`, { email, username, password });
};

export { postLogin, postRegister };
