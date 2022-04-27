import Room from "../models/Room";
import User from "../models/User";
import Booking from "../models/Booking";
import catchAsyncError from "../middlewares/catchAsyncError";

import absoluteUrl from "next-absolute-url";
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);


//Generate stripe checkout session => /api/checkout_session/:roomId (GET REQUEST)
export const stripeCheckoutSession = catchAsyncError(async (req, res) => {
    const room = await Room.findById(req.query.roomId);
    if(!room) return res.status(404).json({error: "No room found with that id"});

    //Get origin URL
    const {origin} = absoluteUrl(req);
    const {checkInDate, checkOutDate, daysOfStay} = req.query;

    const user = await User.findById(req.user);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/${room._id}`,
        customer_email: user.email,
        client_reference_id: req.query.roomId,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        line_items: [
            {
                name: room.name,
                images: [`${room.images[0].url}`],
                amount: req.query.amount * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    })

    res.status(200).json(session);
})