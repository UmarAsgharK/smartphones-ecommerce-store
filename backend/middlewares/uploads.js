// middlewares/upload.js
import multer from "multer";

// Use memory storage instead of diskStorage
const storage = multer.memoryStorage();

// Optional file filter for image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Create the upload middleware with a 5MB file size limit
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
