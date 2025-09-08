import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { getMySavedJob, saveJob, unsavedJob } from "../controllers/savedJob.controller.js";

const savedJobRoutes = Router()

// Protected Route
savedJobRoutes.post("/:jobId", protect, saveJob)
savedJobRoutes.delete("/:jobId", protect, unsavedJob)
savedJobRoutes.get("/my", protect, getMySavedJob)


export default savedJobRoutes