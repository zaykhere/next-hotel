import Room from "../models/Room";
import User from "../models/User";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";

//Get All Rooms => /api/rooms (GET REQUEST)
export const getAllRooms = catchAsyncError(async (req, res) => {

    const resPerPage = 4;

    const roomsCount = await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination(resPerPage)
    rooms = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
    })

})
//GET ROOM BY ID => /api/rooms/:id (GET REQUEST)

export const getRoom = catchAsyncError(async (req,res,next) => {
        const room = await Room.findById(req.query.id);
        if(!room) return next(new ErrorHandler('Room not found', 404));

        res.status(200).json({success: true, room: room});
    
})

//Update ROOM BY ID => /api/rooms/:id (PUT REQUEST)

export const updateRoom = catchAsyncError(async (req,res,next) => {
        let room = await Room.findById(req.query.id);
        if(!room) return next(new ErrorHandler('Room not found', 404));

        room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({success: true, room: room});
})

//Delete ROOM BY ID => /api/rooms/:id (DELETE REQUEST)

export const deleteRoom = catchAsyncError(async (req,res,next) => {
        const room = await Room.findById(req.query.id);
        if(!room) return next(new ErrorHandler('Room not found', 404));

        await room.remove();

        res.status(200).json({success: true, message: "Room has been deleted"});
})

// Create New room => /api/rooms (POST REQUEST)

export const newRoom = catchAsyncError(async (req,res) => {
        const room = await Room.create(req.body);
        res.status(200).json({
        success: true,
        room
    })
})

// Create Room Review => /api/reviews (PUT REQUEST)

export const createRoomReview = catchAsyncError(async (req,res,next) => {
    const {rating, comment, roomId} = req.body;

    const user = await User.findById(req.user);
    if(!user) return next(new ErrorHandler("User not found", 404));

    const review = {
        user: req.user,
        name: user.name,
        rating: Number(rating),
        comment
    };

    const room = await Room.findById(roomId);

    if(!room) return next(new ErrorHandler("Room not found", 404));

    const isReviewed = room.reviews.find(r=> {
        r.user.toString() === req.user.toString()
    })

    if(isReviewed) {
        room.reviews.forEach(review=> {
            if(review.user.toString() === req.user.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }

    else {
        room.reviews.push(review);
        room.numOfReviews = room.reviews.length;
    }

    room.ratings = room.reviews.reduce((acc,item)=> item.rating + acc , 0 ) / room.reviews.length;

    await room.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})