import { combineReducers } from "redux";
import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer } from "./bookingReducers";
import { allRoomsReducer, checkReviewReducer, newReviewReducer, roomDetailsReducer } from "./roomReducers";
import { authReducer, forgotPasswordReducer, loadedUserReducer, userReducer } from "./userReducers";

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer
})

export default reducers;