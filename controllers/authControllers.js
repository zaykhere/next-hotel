import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";
import { v2 } from "cloudinary";
import { isAuthenticatedUser } from "../middlewares/auth";
import absoluteUrl from "next-absolute-url";
import mailer from "../utils/mailer";
import crypto from "crypto";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//Register User => /api/auth/register (POST REQUEST)
export const registerUser = catchAsyncError(async (req, res) => {
  const result = await v2.uploader.upload(req.body.avatar, {
    folder: "next-hotel/avatars",
    width: "150",
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account Registered Successfully",
    user,
  });
});

//Current User Profile => /api/me
export const currentUserProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) return res.status(404).json({ error: "No user found" });

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Profile => /api/me/update
export const updateUserProfile = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;
  }

  if (req.body.avatar && req.body.avatar !== "") {
    const image_id = user.avatar.public_id;

    //Delete previous user avatar
    await v2.uploader.destroy(image_id);

    const result = await v2.uploader.upload(req.body.avatar, {
      folder: "next-hotel/avatars",
      width: "150",
      crop: "scale",
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

//Forgot Password => /api/password/forgot
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //Get reset Token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Get origin
  const { origin } = absoluteUrl(req);

  // Create Reset Password Url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows\n\n ${resetUrl} \n\n If you have not requested this, then ignore this message`;

  try {
      await mailer.send(user.email, "Next-Hotel by Zain", message);
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`
      });
  } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
  }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
  

});

//Reset Password => /api/password/reset/:token
export const resetPassword = catchAsyncError(async (req, res, next) => {
  //Hash url token
  const resetPassworkToken = crypto
  .createHash("sha256")
  .update(req.query.token)
  .digest("hex");
  
  const user = await User.findOne(
    { resetPassworkToken, 
    resetPasswordExpire: {$gt: Date.now()} });

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or expired", 400));
  }

  if(req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //Setup the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated Successfully"
  })

});
