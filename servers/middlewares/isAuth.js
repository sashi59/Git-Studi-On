import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";
export const ProtectedRoute = async (req, res, next) => {

    try {
        const token = req.headers.token;

        if (!token) return res.status(403).json({
            message: "Please Login First!!"
        })

        const decodeToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        if (!decodeToken) return res.status(403).json({
            message: "Invalid Token!!"
        })

        const user = await User.findById(decodeToken._id);

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in Protedted Route", error)
        return res.status(500).json({ error: error.message })
    }

}