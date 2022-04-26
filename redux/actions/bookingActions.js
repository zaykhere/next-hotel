import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
} from "../constants/bookingConstants";
import axios from "axios";

//Check booked dates
export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST });
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

      const { data } = await axios.get(link);
      dispatch({ type: CHECK_BOOKING_SUCCESS, payload: data.isAvailable });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getBookedDates =
(roomId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/bookings/check_booked_dates?roomId=${roomId}`);
    dispatch({ type: BOOKED_DATES_SUCCESS, payload: data.bookedDates });
  } catch (error) {
    console.log(error);
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
