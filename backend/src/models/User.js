import mongoose from "mongoose";
import contentSchema from "./Portfolio_Content.js"

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type:String, 
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
});

const User = mongoose.model("User", userSchema, "users");

export default User