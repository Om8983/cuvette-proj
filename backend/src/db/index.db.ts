import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : false,
        default : null
    },
    google_id: {
        type : String,
        required : false,
        default : null 
    }
})

export const User = mongoose.model('user', userSchema);

