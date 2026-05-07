import Job from "../models/Job.js"
import User from "../models/User.js"
import Application from "../models/Application.js"
import SavedJob from "../models/SavedJob.js"

// @desc: Create a new job (Employer only)
export const createJob = async (req, res) => {
    try {
        if (req.user.role !== "employer") {
            return res.status(403).json({message: "Only Employer can post a job"})
        }

        const job = await Job.create({...req.body, company: req.user._id})
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: get all jobs (paginated)
export const getJobs = async (req, res) => {
    const {
        keyword,
        location,
        category,
        type,
        minSalary,
        maxSalary,
        userId,
        page = 1,
        limit = 20,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1)
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20))
    const skip = (pageNum - 1) * limitNum

    const query = { isClosed: false };
    if (keyword) query.title = { $regex: keyword, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category = category;
    if (type) query.type = type;

    if (minSalary || maxSalary) {
        query.$and = []
        if (minSalary) query.$and.push({ salaryMax: { $gte: Number(minSalary) } })
        if (maxSalary) query.$and.push({ salaryMin: { $lte: Number(maxSalary) } })
        if (query.$and.length === 0) delete query.$and
    }

    try {
        const [jobs, total] = await Promise.all([
            Job.find(query)
                .populate("company", "name companyName companyLogo")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum),
            Job.countDocuments(query),
        ])

        let savedJobsIds = [];
        let appliedJobStatusMap = {};

        if (userId) {
            const [savedJobs, applications] = await Promise.all([
                SavedJob.find({ jobseeker: userId }).select("job"),
                Application.find({ applicant: userId }).select("job status"),
            ])
            savedJobsIds = savedJobs.map((s) => String(s.job))
            applications.forEach((app) => {
                appliedJobStatusMap[String(app.job)] = app.status
            })
        }

        const jobsWithMeta = jobs.map(job => {
            const jobId = String(job._id);
            return {
                ...job.toObject(),
                isSaved: savedJobsIds.includes(jobId),
                appliedStatus: appliedJobStatusMap[jobId] || null,
            };
        });

        res.status(200).json({
            jobs: jobsWithMeta,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// @desc: Get jobs for logged in user (Employer can see posted jobs)
export const getJobsEmployer = async (req, res) => {
    try {
        const userId = req.user._id 
        const {role} = req.user

        if (role !== "employer") {
            return res.status(403).json({message: "Access denied"})
        }

        // Get all jobs posted by employer
        const jobs = await Job.find({company: userId})
            .populate("company", "name companyName companyLogo")
            .lean() // lean() makes jobs plain JS objects so we can add new fields

        // Count applications for all jobs in a single aggregation
        const jobIds = jobs.map(j => j._id)
        const counts = await Application.aggregate([
            { $match: { job: { $in: jobIds } } },
            { $group: { _id: "$job", applicationCount: { $sum: 1 } } },
        ])
        const countMap = Object.fromEntries(counts.map(c => [String(c._id), c.applicationCount]))

        const jobsWithApplicationCounts = jobs.map(job => ({
            ...job,
            applicationCount: countMap[String(job._id)] || 0,
        }))

        res.status(200).json(jobsWithApplicationCounts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Get job by ID
export const getJobById = async (req, res) => {
    try {
        const {userId} = req.query

        const job = await Job.findById(req.params.id).populate(
            "company",
            "name companyName companyLogo"
        )

        if (!job) {
            return res.status(404).json({message: "Job not found"})
        }

        let applicationStatus = null

        if (userId) {
            const application = await Application.findOne({
                job: job._id,
                applicant: userId
            }).select("status")

            if (application) {
                applicationStatus = application.status
            }
        }

        res.status(200).json({
            ...job.toObject(),
            applicationStatus
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



// @desc: Update job (Employer only)
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) return res.status(404).json({message: "Job not found"})

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to update this job"})
        }

        Object.assign(job, req.body)
        const updated = await job.save()
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: "Failed to update job", error: error.message})
    }
}



// @desc: Delete Job (Employer only)
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) return res.status(404).json({message: "Job not found"})

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to delete this job"})
        }

        await job.deleteOne()

        res.status(200).json({message: "Job deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Failed to delete job", error: error.message})
    }
}



// @desc: Toggle Close Status for a job (Employer only)
export const toggleCloseJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id) 
        if (!job) return res.status(404).json({message: "Job not found"})

        if (job.company.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Not authorized to close this job"})
        } 

        job.isClosed = !job.isClosed 
        await job.save()

        res.status(200).json({message: "Job marked as closed"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}




