import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkBookingAvailability } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";

const handler = nc({onError});
dbConnect();

handler.get(checkBookingAvailability)

export default handler;