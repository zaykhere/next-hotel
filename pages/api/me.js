import nc from "next-connect";
import dbConnect from "../../config/dbConnect";
import onError from "../../middlewares/errors";
import { currentUserProfile } from "../../controllers/authControllers";
import { isAuthenticatedUser } from "../../middlewares/auth";

const handler = nc({onError});
dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;