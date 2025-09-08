import Job from "../models/Job.js"
import SavedJob from "../models/SavedJob.js"


// @desc: Save a job
export const saveJob = async (req, res) => {
    try {
        const {jobId} = req.params
        const exist = await SavedJob.findOne({
            job: req.params.id,
            jobseeker: req.user._id
        })
        if (exist) return res.status(400).json({message: "Job already saved"}) 

        const saved = await SavedJob.create({
            job: jobId,
            jobseeker: req.user._id
        })

        res.status(201).json(saved)

    } catch (error) {
        res.status(500).json({message: "Failed to save job", error: error.message})
    }
}

// @desc: Unsave a job
export const unsavedJob = async (req, res) => {
    try {
        await SavedJob.findOneAndDelete({job: req.params.jobId})
        res.status(200).json({message: "Job removed from saved list"})
    } catch (error) {
        res.status(500).json({message: "Failed to removed saved job", error: error.message})
    }
}

// @desc: Get saved job for current user
export const getMySavedJob = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({jobseeker: req.user._id})
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name companyName companyLogo"
                }
            })
        
            res.status(200).json(savedJobs)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch saved jobs", error: error.message})
    }
}

