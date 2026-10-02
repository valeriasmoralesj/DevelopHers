import mongoose from "mongoose";


const portfolioSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    portfolio_name: {
        type:String,
        required:true
    },
    template_type: {
        type:String,
        required:true
    },
    visibility: {
        type:Boolean,
        default:true
    }, 
    image: {
        public_id: {
            type:String,
        }, 
        secure_url: {
            type:String
        }
    }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio