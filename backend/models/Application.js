import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true},
    applicant: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    resume: {type: String},
    status: {type: String, enum: ["Applied", "In Review", "Rejected", "Accepted"], default: "Applied"},
}, {
    timestamps: true
})

applicationSchema.index({ job: 1, applicant: 1 }, { unique: true })
applicationSchema.index({ applicant: 1, createdAt: -1 })
applicationSchema.index({ job: 1, status: 1 })

const Application = mongoose.model("Application", applicationSchema)
export default Application