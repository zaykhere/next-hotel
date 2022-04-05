import Room from "../models/Room"

export const getAllRooms = async (req,res) => {
    try {
       const rooms = await Room.find();
       if(!rooms) return res.status(404).json({error: "No room found"});
       res.status(200).json({
           success: true,
           count: rooms.length,
           rooms
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
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