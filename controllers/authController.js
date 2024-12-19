import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../helpers/TokenGenerator.js";
 
const registerUser = async (req, res) => {
    try {
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                errors: errors.array()
            });
        }
        const {
            name,
            email,
            password,
        } = req.body;
       
        const isExistUser=await User.findOne({email});
       
        if (isExistUser) {
            return res.status(200).json({
                success:false,
                msg:'Email Already exists!'
            });            
        }
       
        const hashedPassword = await bcrypt.hash(password,10);
       
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
 
const loginUser =async (req,res) => {
    try {
        const {
            email,
            password,
        } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: "Email Or Password is incorrect"
            });
        }
 
        // compare hashed passwords from req.body and from user
        const isPasswordMatch=await bcrypt.compare(password,userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: "Email Or Password is incorrect"
            });
        }
 
        // generate access token for the user
        const accessToken=generateAccessToken({user: userData});
 
        return res.status(200).json({
            success: true,
            msg: "Login Successfully!",
            accessToken:accessToken,
            tokenType:'Bearer',
            data:userData
        });
 
 
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
   
};
 
const greetUser = async (req, res) => {
    try {
        const { role } = req.user;
 
        if (role === 1) {
            res.status(200).send("Hello Admin");
        } else if (role === 0) {
            res.status(200).send("Hello User");
        } else {
            res.status(403).send("Unauthorized");
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
};
 
export {
    registerUser,
    loginUser,
    greetUser
};