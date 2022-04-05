import Room from "../models/Room"

export const getAllRooms = (req,res) => {
    res.status(200).json({
        success: true,
        message: "all rooms"
    })
}

// Create New room => /api/rooms (POST REQUEST)

export const newRoom = async (req,res) => {
    try {
        const room = await Room.create(req.body);
        res.status(200).json({
        success: true,
        room
    })
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
    
}