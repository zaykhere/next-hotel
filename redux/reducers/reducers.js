import { combineReducers } from "redux";
import { checkBookingReducer, bookedDatesReducer, bookingsReducer } from "./bookingReducers";
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers";
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
    bookings: bookingsReducer
})

export default reducers;