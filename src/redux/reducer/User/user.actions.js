import {
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGOUT_SUCCESS,
  POST_USER_UPDATE_SUCCESS,
} from "./user.types";

export const doLogin = (data) => {
  return {
    type: POST_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: POST_USER_LOGOUT_SUCCESS,
  };
};

export const doUpdate = (data) => {
  return {
    type: POST_USER_UPDATE_SUCCESS,
    payload: data,
  };
};
