const responseObjects = require("../helpers/response-objects");
const Image = require("../models/image");
const gfsFun = require("../config/gridfs");

const addImageInDB = async (req, res) => {
    try {
        if (!req.file) {
            return responseObjects.badRequest(res, null, 'No file found', 'No file found');
        }
        const isCaptionImageIsExist = await Image.findOne({ caption: req.body.caption });
        if (isCaptionImageIsExist) {
            return responseObjects.conflict(res, null, 'Image already exists', "Image already exists");
        }
        let newImage = new Image({
            caption: req.body.caption,
            filename: req.file.filename,
            fileId: req.file.id,
        });
        const savedImage = await newImage.save();
        return responseObjects.success(res, savedImage, 'Image uploaded successfully', 'Image uploaded successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const getAllImagesFromDB = async (req, res) => {
    try {
        const images = await Image.find({}).lean();
        return responseObjects.success(res, images, 'Images fetched successfully', 'Images fetched successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}
const deleteImageInDB = async (req, res) => {
    try {
        const isImageExist = await Image.findOne({ _id: req.params.id });
        if (!isImageExist) {
            return responseObjects.notFound(res, null, 'Image not found', 'Image not found');
        }
        const deletedImage = await Image.deleteOne({ _id: req.params.id });
        return responseObjects.success(res, deletedImage, 'Image deleted successfully', 'Image deleted successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const fetchMostRecentImage = async (req, res) => {
    try {
        const image = await Image.findOne({}, {}, { sort: { '_id': -1 } });
        return responseObjects.success(res, image, 'Image fetched successfully', 'Image fetched successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}
const uploadMultipleFiles = async (req, res) => {
    try {
        const files = req?.files;
        if (!files) {
            return responseObjects.badRequest(res, null, 'No files found', 'No files found');
        }

        const fileNames = files.map(file => file.filename);
        const fileIds = files.map(file => file.id);
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const newImage = new Image({
                caption: `${req.body.caption} - ${i + 1}`,
                filename: fileNames[i],
                fileId: fileIds[i],
            });
            newImages.push(newImage);
        }
        const savedImages = await Image.insertMany(newImages);
        return responseObjects.success(res, savedImages, 'Images uploaded successfully', 'Images uploaded successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

// const renderSingleImageOnBrowser = async (req, res) => {
//     try {
//         const fileName = req.params.filename;
//         const gfs = gfsFun.getGridFS();
//         if (!fileName) {
//             return responseObjects.badRequest(res, null, 'No file name found', 'No file name found');
//         }
//         const findFile = await Image.findOne({ filename: fileName });
//         if (!findFile) {
//             return responseObjects.notFound(res, null, 'File not found', 'File not found');
//         }
//         if (!gfs) {
//             return responseObjects.serverError(res, {}, "Gridfs image not found", "Gridfs image not found")
//         }
//         console.log('gfs', gfs);

//         gfs.find({ filename: fileName }).toArray((err, files) => {
//             if (!files[0] || files.length === 0) {
//                 return res.status(200).json({
//                     success: false,
//                     message: 'No files available',
//                 });
//             }
//             if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
//                 gfs.openDownloadStreamByName(fileName).pipe(res);
//             } else {
//                 return responseObjects.badRequest(res, null, 'File is not an image', 'File is not an image');
//             }
//         });
//     } catch (error) {
//         return responseObjects.error(res, error.message, 'Internal server error', 'Internal server error');
//     }
// }
const renderSingleImageOnBrowser = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const gfs = gfsFun.getGridFS();

        if (!fileName) {
            return responseObjects.badRequest(res, null, 'No file name found', 'No file name found');
        }

        const findFile = await Image.findOne({ filename: fileName });
        if (!findFile) {
            return responseObjects.notFound(res, null, 'File not found', 'File not found');
        }

        if (!gfs) {
            return responseObjects.serverError(res, {}, "GridFS not found", "GridFS not found");
        }
        const file = await gfs.find({ filename: fileName }).toArray();
        if (!file[0]) {
            return responseObjects.notFound(res, null, 'File not found in GridFS', 'File not found in GridFS');
        }
        if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file[0].contentType)) {
            const downloadStream = gfs.openDownloadStreamByName(fileName);
            res.setHeader('Content-Type', file[0].contentType);
            downloadStream.pipe(res);
        } else {
            return responseObjects.badRequest(res, null, 'File is not a supported image type', 'File is not a supported image type');
        }
    } catch (error) {
        console.error(error);
        return responseObjects.error(res, error.message || 'Internal Server Error', 'Internal server error', 'Internal server error');
    }
}

const deletePerticularFileById = async (req, res) => {
    try {
        const gfs = gfsFun.getGridFS();
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                return responseObjects.error(res, err, 'Internal server error', 'Internal server error');
            }
            return responseObjects.success(res, data, `File with ID ${req.params.id} is deleted`, `File with ID ${req.params.id} is deleted`);
        });
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}
module.exports = {
    addImageInDB,
    getAllImagesFromDB,
    deleteImageInDB,
    fetchMostRecentImage,
    uploadMultipleFiles,
    renderSingleImageOnBrowser,
    deletePerticularFileById
}