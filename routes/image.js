const express = require('express');
const imageRouter = express.Router();
const { addImageInDB, getAllImagesFromDB, deleteImageInDB, fetchMostRecentImage, uploadMultipleFiles, renderSingleImageOnBrowser, deletePerticularFileById } = require('../controllers/imageControllers');
module.exports = (upload, app) => {
    //POST: Upload a single image/file to Image collection
    imageRouter.route('/assets/images/upload').post(upload.single('file'), addImageInDB);
    imageRouter.route('/assets/get-all-images').get(getAllImagesFromDB);

    //GET: Delete an image from the collection
    imageRouter.route('/assets/images/delete/:id').post(deleteImageInDB);

    //GET: Fetch most recently added record
    imageRouter.route('/assets/images/recent').get(fetchMostRecentImage);

    //POST: Upload multiple files upto 20
    imageRouter.route('/assets/multiple/images/upload').post(upload.array('files', 20), uploadMultipleFiles);

    //GET: Fetches all the files in the uploads collection
    // imageRouter.route('/files')
    //     .get((req, res, next) => {
    //         gfs.find().toArray((err, files) => {
    //             if (!files || files.length === 0) {
    //                 return res.status(200).json({
    //                     success: false,
    //                     message: 'No files available'
    //                 });
    //             }

    //             files.map(file => {
    //                 if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
    //                     file.isImage = true;
    //                 } else {
    //                     file.isImage = false;
    //                 }
    //             });

    //             res.status(200).json({
    //                 success: true,
    //                 files,
    //             });
    //         });
    //     });

    //GET: Fetches a particular file by filename
    // imageRouter.route('/file/:filename')
    //     .get((req, res, next) => {
    //         gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    //             if (!files[0] || files.length === 0) {
    //                 return res.status(200).json({
    //                     success: false,
    //                     message: 'No files available',
    //                 });
    //             }

    //             res.status(200).json({
    //                 success: true,
    //                 file: files[0],
    //             });
    //         });
    //     });

    //GET: Fetches a particular image and render on browser
    imageRouter.route('/assets/images/content/:filename').get(renderSingleImageOnBrowser);

    //DELETE: Delete a particular file by an ID
    imageRouter.route('/assets/images/file/del/:id').post(deletePerticularFileById);

    return imageRouter;
};