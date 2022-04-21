import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";

//Get All User => /api/auth/register (POST REQUEST)
export const registerUser = catchAsyncError(async (req, res) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'public_id',
            url: 'Url'
        }
    })

    res.status(200).json({
        success: true,
        message: "Account Registered Successfully",
        user
    })

})