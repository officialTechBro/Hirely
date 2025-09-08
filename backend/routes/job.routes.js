import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { createJob, getJobs, getJobById, updateJob, deleteJob, toggleCloseJob, getJobsEmployer } from "../controllers/job.controller.js";

const jobRoutes = Router()

jobRoutes.route("/").post(protect, createJob).get(getJobs)
jobRoutes.route("/get-jobs-employer").get(protect, getJobsEmployer)
jobRoutes.route("/:id").get(getJobById).put(protect, updateJob).delete(protect, deleteJob)
jobRoutes.put("/:id/toggle-close", protect, toggleCloseJob)

export default jobRoutes