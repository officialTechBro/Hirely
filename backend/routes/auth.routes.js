import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";


const authRoutes = Router()

authRoutes.post("/register", register),
authRoutes.post("/login", login),
authRoutes.get("/me", protect, getMe)

authRoutes.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: "No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    res.status(200).json({imageUrl})
} )

export default authRoutes