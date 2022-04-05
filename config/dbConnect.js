import mongoose from "mongoose";

const dbConnect = () => {
    if(mongoose.connection.readyState > 1) {
        return;
    }

    mongoose.connect(process.env.DB_URL)
    .then((conn)=> console.log("Connected to database"))
    .catch((err)=> console.log(err));
}

export default dbConnect;