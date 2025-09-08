import { Router } from "express";
import protect from "../middlewares/auth.middleware.js";
import { getEmployerAnalytics } from "../controllers/analytics.controller.js";

const analyticsRoute = Router()

// Protected Route
analyticsRoute.get("/overview", protect, getEmployerAnalytics)


export default analyticsRoute