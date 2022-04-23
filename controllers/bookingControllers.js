import Booking from "../models/Booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import User from "../models/User";
import { getDatesBetweenDates } from "../utils/dateUtility";

//Create Booking => /api/bookings (POST REQUEST)
export const newBooking = catchAsyncError(async (req, res, next) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

//Check Booking Availability => /api/bookings/check (GET REQUEST)
export const checkBookingAvailability = catchAsyncError(async (req, res, next) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  //Check if any booking is available
  let isAvailable;
  if(bookings && bookings.length === 0) {
    isAvailable = true;
  }
  else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable
  });
});

//Checked booked dates of room
export const checkBookedDatesOfRoom = catchAsyncError(async(req,res)=> {
  const {roomId} = req.query;

  const bookings = await Booking.find({room: roomId});

  let bookedDates = [];
  let dates;

  bookings.forEach(booking => {
    dates = getDatesBetweenDates(booking.checkInDate, booking.checkOutDate);

    bookedDates = bookedDates.concat(dates);
  })

  console.log(bookedDates);

  res.status(200).json({
    success: true,
    bookedDates
  })
})