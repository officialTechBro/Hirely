import Application from "../models/Application.js"
import Job from "../models/Job.js"


// @desc: Apply to Job
export const applyToJob = async (req, res) => {
    try {
        if (req.user.role !== "jobseeker") {
            return res.status(403).json({message: "Only a job seekers can apply"})
        }

        const exisitingApplication = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user._id
        })

        if (exisitingApplication) return res.status(400).json({message: "Already applied to this job"})

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user._id,
            resume: req.user.resume, // assuming resume is stored in user profile
        })

        res.status(201).json(application)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Get logged-in user's application
export const getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({applicant: req.user._id})
            .populate("job", "title company location type")
            .sort({createdAt: -1})

        res.json(apps)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Get all applicatnts for a job (Employer only)
export const getApplicationsForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId)

        if (!job || job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to view applicant"})
        }

        const applications = await Application.find({job: req.params.jobId})
            .populate("job", "title location category type")
            .populate("applicant", "name email avatar resume")

        res.status(200).json(applications)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Get application by ID (Jobseeker or Employer only)
export const getApplicationById = async (req, res) => {
    try {
        const app = await Application.findById(req.params.id)
            .populate("job", "title")
            .populate("applicant", "name email avatar resume")
        
        if (!app) return res.status(404).json({message: "Application not found", id: req.params.id})

        const isOwner = 
            app.applicant._id.toString() === req.user._id.toString() || 
            app.job.company.toString() === req.user._id.toString()
        
        if (!isOwner) {
            return res.status(403).json({message: "Not authorized to view this application"})
        }
            
        res.status(200).json(app)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Update application status (Employer only)
export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body 
        const app = await Application.findById(req.params.id).populate("job")

        if (!app || app.job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this application"})
        }

        app.status = status
        await app.save()

        res.status(200).json({message: "Application status updated", status})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

