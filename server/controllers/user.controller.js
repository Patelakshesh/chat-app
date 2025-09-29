import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utilis.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

//signup controller
export const signup = async (req, res) => {
    const { email, fullName, password, bio } = req.body;
    try {
        if(!fullName || !email || !password || !bio){
            return res.status(400).json({success: false, message: "All fields are required" });
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser  = await User.create({
            fullName, email, password: hashedPassword, bio 
        })
        const token = generateToken(newUser._id);
        res.status(201).json({success: true, userDate: newUser, token, message: "User created successfully", data: {user: newUser, token} });
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({success: false, message: error.message });
    }
}

//login controller
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});
        
        const isPasswordCorrect  = await bcrypt.compare(password, userData.password)

        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: "Invalid credentials" });
        }

        const token = generateToken(userData._id);
        res.status(200).json({success: true, userData, token,  message: "Login successful", data: {user: userData, token} });
        
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({success: false, message: error.message });
    }
}

//check user authentication
export const checkAuth = async (req, res) => {
    res.status(200).json({success: true, user: req.user });
}

//update user profile
export const updateProfile = async (req, res) => {
    try {
        const {profilePic, fullName, bio} = req.body;

        const userId = req.user._id;
        let updateedUser;

        if(!profilePic){
            updateedUser = await User.findByIdAndUpdate(userId, {fullName, bio}, {new: true});
        }else {
            const upload = await cloudinary.uploader.upload(profilePic)
            updateedUser = await User.findByIdAndUpdate(userId, {fullName, bio, profilePic: upload.secure_url}, {new: true});
        }
        res.status(200).json({success: true, user: updateedUser, message: "Profile updated successfully" });
    } catch (error) {
        console.log("Error in update profile controller:", error);
        res.status(500).json({success: false, message: error.message });
    }
}