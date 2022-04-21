import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";
import {v2} from "cloudinary"

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

//Get All User => /api/auth/register (POST REQUEST)
export const registerUser = catchAsyncError(async (req, res) => {

    const result = await v2.uploader.upload(req.body.avatar, {
       folder: 'next-hotel/avatars',
       width: '150',
       crop: 'scale' 
    })

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully",
        user
    })

})