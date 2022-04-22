import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";
import {v2} from "cloudinary"
import { isAuthenticatedUser } from "../middlewares/auth";

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

//Register User => /api/auth/register (POST REQUEST)
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

//Current User Profile => /api/me 
export const currentUserProfile = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user);

    if(!user) return res.status(404).json({error: "No user found"});

    res.status(200).json({
        success: true,
        user
    })
})

//Update User Profile => /api/me/update
export const updateUserProfile = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user);

    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.body.password) user.password = req.body.password;

    }

    if(req.body.avatar && req.body.avatar !== '') {
        const image_id = user.avatar.public_id;

        //Delete previous user avatar
        await v2.uploader.destroy(image_id);

        const result = await v2.uploader.upload(req.body.avatar, {
            folder: 'next-hotel/avatars',
            width: '150',
            crop: 'scale' 
         });

         user.avatar = {
             public_id : result.public_id,
             url: result.secure_url
         }
    }

    await user.save();

    res.status(200).json({
        success: true,
        user
    })
})