import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    project_name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    link: {
        type:String,
        required:true
    }
});


export default projectSchema