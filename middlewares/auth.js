import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import {getSession} from "next-auth/react";

export const isAuthenticatedUser = catchAsyncError(async(req,res,next)=> {
    const session = await getSession({req});

    if(!session) {
        return next(new ErrorHandler("You need to be logged in to access this resource", 401));
    }

    req.user = session.id;
    next();
})

