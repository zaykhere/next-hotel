const mongoose = require("mongoose");
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: [true, 'Please enter your name'],
        maxlength: ['50', "Name must not be more than 50 characters"]
    },
    email: {
        type: String,
        reqired: [true, 'Please enter your name'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a correct email address']
    },
    password: {
        type: String,
        reqired: [true, 'Please enter your password'],
        minlength: ['6', "Password must at least have 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})

//Encrypt password before registering User

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.models.User || mongoose.model('User', userSchema);