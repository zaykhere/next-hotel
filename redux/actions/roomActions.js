import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS
} from "../constants/roomConstants";

// Get all rooms action

export const getRooms = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/rooms`);
    dispatch({ type: ALL_ROOMS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ALL_ROOMS_FAIL, payload: error.response.data.message });
  }
};

export const getRoomDetails = (req, id) => async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
  
      const { data } = await axios.get(`${origin}/api/rooms/${id}`);
      dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data.room });
    } catch (error) {
      console.log(error);
      dispatch({ type: ROOM_DETAILS_FAIL, payload: error.response.data.message });
    }
  };


//CLEAR ERRORS

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

