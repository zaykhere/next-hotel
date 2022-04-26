import {
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_RESET,
  CLEAR_ERRORS,
  BOOKED_DATES_SUCCESS,
  BOOKED_DATES_FAIL,
} from "../constants/bookingConstants";

//Check bookings
export const checkBookingReducer = (state = { available: null }, action) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return {
        loading: true,
      };

    case CHECK_BOOKING_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };

    case CHECK_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CHECK_BOOKING_RESET:
      return {
        loading: false,
        available: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Get all booking dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return {
        loading: false,
        dates: action.payload,
      };

    case BOOKED_DATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
