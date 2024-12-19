import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
 
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ success: false, msg: "Token missing" });
        }
 
        const decoded = jwt.verify(token, process.env.secretKey);
        const user = await User.findById(decoded.user_id.user._id);
 
        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found" });
        }
 
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, msg: "Unauthorized" });
    }
};
 
export {authenticateUser};