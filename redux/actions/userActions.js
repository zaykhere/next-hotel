import axios from "axios";
import {
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
  } from "../constants/userConstants";

//Register user
  export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch({type: REGISTER_USER_REQUEST});

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }
  
      const { data } = await axios.post(`/api/auth/register`, userData, config);
      dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
  };

  //Clear errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };