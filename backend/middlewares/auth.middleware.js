import User from "../models/User.js"
import jwt from 'jsonwebtoken'


const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1] // get token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")

            if (!req.user) {
                return res.status(404).json({message: "User not found"})
            }
            next()
        } else {
            return res.status(401).json({message: "Not authorized, no token"})
        }
    } catch (error) {
        res.status(401).json({message: "Token failed", error: error.message})
    }
}

export default protect