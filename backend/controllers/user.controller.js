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
        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({message: "User not found"})

        if (user.role !== "jobseeker") {
            return res.status(403).json({message: "Only jobseeker can delete resume"})
        }

        if (user.resume) {
            // Use the path stored on the user document — never trust user-supplied URLs
            const uploadsDir = path.resolve(__dirname, '../uploads')
            const fileName = path.basename(user.resume)
            const filePath = path.resolve(uploadsDir, fileName)

            // Guard: ensure resolved path stays inside uploads/
            if (filePath.startsWith(uploadsDir) && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }

        user.resume = ""
        await user.save()

        res.status(200).json({message: "Resume deleted successfully"})
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


