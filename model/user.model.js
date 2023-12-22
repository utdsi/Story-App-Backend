
const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    dob:
    {
        type: String,
        default: " ",
        required: true
    },
    gender:
    {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
        required: true
    },
    created_at:
    {
        type: Date,
        default: Date.now
    },
    profile_status:
    {
        type: Number,
        default: 0,
        required: true
    },
    profile_pic:
    {
        type: String,
        default: " ",
        required: true
    },
})


const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }