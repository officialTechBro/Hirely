import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
    jobseeker: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    job: {type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true},
},{
    timestamps: true
})

savedJobSchema.index({ jobseeker: 1, job: 1 }, { unique: true })
savedJobSchema.index({ jobseeker: 1, createdAt: -1 })

const SavedJob = mongoose.model("SavedJob", savedJobSchema)
export default SavedJob