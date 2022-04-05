import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true,
        maxlength: [100, 'Room name cannot exceed more than 100 characters']
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please enter the price"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter room description'],
    },
    address: {
        type: String,
        required: [true, 'Please enter room address']
    },
    guestCapacity: {
        type: Number,
        required: [true, 'Please enter room guest capacity']
    },
    numOfBeds: {
        type: Number,
        required: [true, 'Please enter number of beds']
    },
    internet: {
        type: Boolean,
        default: false  
    },
    airCondition: {
        type: Boolean,
        default: true
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    roomCleaning: {
        type: Boolean,
        default: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter category'],
        enum: {
            values: [
                'King', 'Single', 'Twins'
            ],
            message: "Please enter only among king, single or twins"
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    }
}, {
    timestamps: true
})

export default mongoose.models.Room || mongoose.model('Room', roomSchema);