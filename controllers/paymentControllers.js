import Room from "../models/Room";
import User from "../models/User";
import Booking from "../models/Booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import getRawBody from "raw-body";
import absoluteUrl from "next-absolute-url";
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);


//Generate stripe checkout session => /api/checkout_session/:roomId (GET REQUEST)
export const stripeCheckoutSession = catchAsyncError(async (req, res) => {
    const room = await Room.findById(req.query.roomId);
    if(!room) return res.status(404).json({error: "No room found with that id"});

    //Get origin URL
    const {origin} = absoluteUrl(req);
    const {checkInDate, checkOutDate, daysOfStay} = req.query;

    console.log(checkOutDate);

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

//Create new booking after payment => /api/webhook (POST REQUEST)
export const webhookCheckout = catchAsyncError(async (req, res) => {
    try {
        const rawBody = await getRawBody(req);
        console.log(rawBody);
        const signature = req.headers['stripe-signature'];

        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);

        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const room = session.client_reference_id;
            const user = (await User.findOne({email: session.customer_email})).id;

            const amountPaid = session.amount_total / 100 ;
            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

            console.log(session.metadata);

            const checkInDate = session.metadata.checkInDate;
            const checkOutDate = session.metadata.checkOutDate;
            const daysOfStay = session.metadata.daysOfStay;

            await Booking.create({
                room,
                user,
                checkInDate,
                checkOutDate,
                amountPaid,
                daysOfStay,
                paymentInfo,
                paidAt: Date.now(),
              });
            
            res.status(200).json({
                success: true
            })
        }
    } catch (error) {
        console.log('Error in stripe checkout payment', error);
    }
})