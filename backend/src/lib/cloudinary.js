import dotenv from "dotenv"
dotenv.config()
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

/*
const uploadToCloudinary = async (path, folder = "portfolio-images" ) => {
    try {
        const data = await cloudinary.uploader.upload(path, {folder: folder})
        return {secure_url: data.secure_url, public_id: data.public_id}
    } catch (error) {
        console.log("cloudinary error:", error)
    }
}
*/
export default cloudinary