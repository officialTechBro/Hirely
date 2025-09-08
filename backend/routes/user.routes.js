import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { deleteResume, getPublicProfile, updateProfile } from "../controllers/user.controller.js";

const userRoutes = Router()

// Protected Route
userRoutes.put("/profile", protect, updateProfile)
userRoutes.delete("/resume", protect, deleteResume)

// Public Route
userRoutes.get("/:id", getPublicProfile)


export default userRoutes