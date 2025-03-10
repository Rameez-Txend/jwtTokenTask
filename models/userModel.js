import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    } 

});


const User = mongoose.model("User", userSchema);
export default User