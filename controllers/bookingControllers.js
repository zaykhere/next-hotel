import Booking from "../models/Booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../models/User";

//Create Booking => /api/bookings (POST REQUEST)
export const newBooking = catchAsyncError(async (req, res,next) => {

    const {room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo} = req.body;

    const booking = await Booking.create({
        room,
        user: req.user,
        checkInDate,
        checkOutDate,
        amountPaid,
        daysOfStay,
        paymentInfo,
        paidAt: Date.now()
    })
  
    res.status(200).json({
      success: true,
      booking
    });
  });