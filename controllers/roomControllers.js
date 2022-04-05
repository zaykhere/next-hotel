import Room from "../models/Room"

//Get All Rooms => /api/rooms (GET REQUEST)
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

//GET ROOM BY ID => /api/rooms/:id (GET REQUEST)

export const getRoom = async (req,res) => {
    try {
        const room = await Room.findById(req.query.id);
        if(!room) return res.status(404).json({error: "No room found"});

        res.status(200).json({success: true, room: room});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

//Update ROOM BY ID => /api/rooms/:id (PUT REQUEST)

export const updateRoom = async (req,res) => {
    try {
        let room = await Room.findById(req.query.id);
        if(!room) return res.status(404).json({error: "No room found"});

        room = await Room.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({success: true, room: room});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

//Delete ROOM BY ID => /api/rooms/:id (DELETE REQUEST)

export const deleteRoom = async (req,res) => {
    try {
        const room = await Room.findById(req.query.id);
        if(!room) return res.status(404).json({error: "No room found"});

        await room.remove();

        res.status(200).json({success: true, message: "Room has been deleted"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
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