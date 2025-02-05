import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const convertImagesInFolder = async (folderPath) => {
    try {
        // Read all files in the folder
        const files = fs.readdirSync(folderPath);

        // Loop through each file
        for (const file of files) {
            const inputPath = path.join(folderPath, file);

            // Check if the file is an image (you can expand this based on file types)
            if (/\.(jpg|jpeg|png)$/i.test(file)) {
                const outputPath = path.join(folderPath, path.parse(file).name + '.webp');

                // Convert to WebP
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Converted: ${inputPath} -> ${outputPath}`);
            }
        }
    } catch (err) {
        console.error('Error in batch conversion:', err);
    }
};

// Convert all images in a specific folder
convertImagesInFolder('./src/assets'); // Replace './images' with your folder path
