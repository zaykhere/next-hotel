import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getRoom } from "../../../controllers/roomControllers";

const handler = nc();
dbConnect();

handler.get(getRoom);

export default handler;