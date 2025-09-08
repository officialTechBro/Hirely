import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { applyToJob, getMyApplications, getApplicationsForJob, getApplicationById, updateStatus } from "../controllers/application.controller.js";

const applicationRoutes = Router()

applicationRoutes.post("/:jobId", protect, applyToJob)
applicationRoutes.get("/my", protect, getMyApplications)
applicationRoutes.get("/job/:jobId", protect, getApplicationsForJob)
applicationRoutes.get("/:id", protect, getApplicationById)
applicationRoutes.put("/:id/status", protect, updateStatus)

export default applicationRoutes