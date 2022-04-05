import Room from "../models/Room";
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