import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage using diskStorage.
const storage = multer.diskStorage({
    // Destination folder for uploaded files
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    // Create a unique filename for each file
    filename: (req, file, cb) => {
        // Use Date.now() along with original name to ensure uniqueness
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // Get the file extension
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    },
});

// Optional file filter for image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Create the upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB per file
    files: 5,
});

export default upload;
