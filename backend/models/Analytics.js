import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    employer: {types: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    totalJobPosted: {type: Number, default: 0},
    totalApplicantReceived: {type: Number, default: 0},
    totalHired: {type: Number, default: 0},
}, {
    timestamps: true
})

const Analytics = mongoose.model("Analytics", analyticsSchema)
export default Analytics