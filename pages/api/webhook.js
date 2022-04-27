import nc from "next-connect";
import dbConnect from "../../config/dbConnect";
import onError from "../../middlewares/errors";
import {webhookCheckout} from "../../controllers/paymentControllers";
import Room from "../../models/Room";
import User from "../../models/User";
import Booking from "../../models/Booking";
import getRawBody from "raw-body";
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);
//import { isAuthenticatedUser } from "../../middlewares/auth";

//const handler = nc({onError});
dbConnect();

export const config = {
    api: {
        bodyParser: false
    }
}

//handler.post(webhookCheckout);

//export default handler;

export default async function webhookHandler(req,res) {
    try {
        if(req.method==='POST') {
        const rawBody = await getRawBody(req);
        console.log(rawBody);
        const signature = req.headers['stripe-signature'];

        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);

        if(event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log(session, "session");
            const room = session.client_reference_id;
            const user = (await User.findOne({email: session.customer_email})).id;

            const amountPaid = session.amount_total / 100 ;
            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

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
    }
    } catch (error) {
        console.log('Error in stripe checkout payment', error);
    }
}