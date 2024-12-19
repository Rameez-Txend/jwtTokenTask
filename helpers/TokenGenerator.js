import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
 
dotenv.config();
 
const generateAccessToken = (user_id, role) => {
    if(process.env.secretKey){
        return jwt.sign({user_id, role}, process.env.secretKey, {expiresIn: "1d"});
    }
    return "";
};
 
 
export {
    generateAccessToken
};