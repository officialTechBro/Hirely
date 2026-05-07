import mongoose from "mongoose"; 

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    requirements: {type: String, required: true},
    location: {type: String},
    category: {type: String},
    type: {type: String, enum: ["Remote", "Full-Time", "Part-Time", "Internship", "Contract"], required: true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    salaryMin: {type: Number},
    salaryMax: {type: Number},
    isClosed: {type: Boolean, default: false},
},{
    timestamps: true
})

jobSchema.index({ company: 1 })
jobSchema.index({ isClosed: 1, createdAt: -1 })
jobSchema.index({ category: 1, type: 1 })
jobSchema.index({ title: "text", description: "text" })

const Job = mongoose.model("Job", jobSchema)
export default Job