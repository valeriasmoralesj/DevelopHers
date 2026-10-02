import bcrypt from "bcrypt"
import User from "../models/User.js"

//Register
export async function register (req, res) {
    try {
        const {firstname, lastname, email, password} = req.body;
        //Comfirms data
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({message:"All fields required"});
        }

        //Hash password 
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashPassword
        });

        const savedUser = await newUser.save();

        if(!savedUser) {
            return res.status(400).json({message:"User not created"})
        }

        res.status(201).json({
            firstname:savedUser.firstname,
            lastname:savedUser.lastname,
            email: savedUser.email
        });

    } catch (error) {

        //For duplicate emails 
        if(error.code == 11000) {
            res.status(409).json({message:"This email is already used"});

        } else {

            console.error("Error in register:", error)
            res.status(500).json({message:"Internal Server Error"});
        }
    }
}


//Login
export async function login (req, res) {
    try {
        const { email, password } = req.body

        //null fields
        if(!email || !password) return res.status(400).json({message:"All fields are required"})

        //Find user
        const user = await User.findOne().where("email").equals(email);
        
        const isValid = await bcrypt.compare(password, user?.password || "" );

        //Send error if user does not exist or incorrect password
        if(!user || !isValid) {
            return res.status(400).json({message:"Invalid email or password"});
        }
        
        res.status(200).json({user:user,message:"Login successful"});

    } catch (error) {
        console.error("Error in login:", error)
        res.status(500).json({message:"Internal Server Error"});
    }
}