import {
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGOUT_SUCCESS,
  POST_USER_UPDATE_SUCCESS,
} from "./user.types";

const INITIAL_STATE = {
  account: {
    access_token: "",
    username: "",
    email: "",
    userId: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.access_token,
          username: action?.payload?.username,
          email: action?.payload?.email,
          userId: action?.payload?.userId,
        },
        isAuthenticated: true,
      };

    case POST_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          username: "",
          email: "",
          userId: "",
        },
        isAuthenticated: false,
      };

    case POST_USER_UPDATE_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.access_token,
          username: action?.payload?.username,
          email: action?.payload?.email,
          userId: action?.payload?.userId,
        },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;
