import axios from "axios";
import jwt_decode from "jwt-decode";
import setJWTToken from "../securityUltis/setJWTToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", LoginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decode = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decode,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
