import multer from "multer";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

// On Vercel the filesystem is read-only; /tmp is the only writable directory
const UPLOAD_DIR = process.env.VERCEL ? "/tmp" : "uploads"

// Sanitize original filename to prevent path traversal
const safeFilename = (original) => path.basename(original).replace(/[^a-zA-Z0-9._-]/g, "_")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${safeFilename(file.originalname)}`)
    }
})

const filter = (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only .jpeg, .jpg, .png, and .pdf formats are allowed"), false)
    }
}

const upload = multer({
    storage,
    fileFilter: filter,
    limits: { fileSize: MAX_FILE_SIZE },
})

export default upload