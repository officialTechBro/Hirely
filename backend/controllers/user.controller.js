import User from "../models/User.js";
import fs from 'fs'
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// @desc: Update users profile (name, avatar, company details)
export const updateProfile = async (req, res) => {
    try {
        const {name, avatar, companyName, companyLogo, companyDescription, resume} = req.body 

        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({message: "User not found"})

        user.name = name || user.name
        user.avatar = avatar || user.avatar
        user.resume = resume || user.resume

        // if employee, allow updating company role
        if (user.role === "employer") {
            user.companyName = companyName || user.companyName
            user.companyDescription = companyDescription || user.companyDescription
            user.companyLogo = companyLogo || user.companyLogo
        }

        await user.save()

        res.status(200).json({
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
            companyName: user.companyName,
            companyDescription: user.companyDescription,
            companyLogo: user.companyLogo,
            resume: user.resume || "",
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// @desc: Delete Resume file (Jobseeker only)
export const deleteResume = async (req, res) => {
    try {
        const {resumeUrl} = req.body 

        // Extract filename from the URL
        const fileName = resumeUrl?.split('/')?.pop()

        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({message: "User not found"})

        if (user.role !== "jobseeker") {
            return res.status(403).json({message: "Only jobseeker can delete resume"})
        }

        // Resove the full file path
        const filePath = path.join(__dirname, '../uploads', fileName)

        // Check if file exist in the path and delete
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath) // Delete file
        }

        // try {
        //     await fs.unlink(filePath);
        // } catch (err) {
        //     // Log but don't fail if file doesn't exist
        //     console.warn(`File not found or already deleted: ${filePath}`);
        // }

        // Set user's resume to an empty string
        user.resume = ""
        await user.save()

        res.status(200).json({message: "resume deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


// @desc: get user public profile
export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if (!user) return res.status(404).json({message: "User not found"})
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


