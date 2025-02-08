// utils/uploadToCloudinary.js
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * Uploads an image buffer to Cloudinary.
 * @param {Buffer} buffer - The image buffer.
 * @param {string} folder - The Cloudinary folder to upload into.
 * @returns {Promise} - Resolves with the Cloudinary upload result.
 */
export const uploadToCloudinary = (buffer, folder = "phone_images") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
