const express = require('express');
const pdfRouter = express.Router();
const { addPdfToDb, getAllPdfsFromDb, fetchMostRecentPdf, uploadMultipleFiles, deletePdfFromDb, renderPdf } = require("../controllers/pdfControllers");

module.exports = (upload, app) => {
    //POST: Upload a single pdf/file to Pdf collection
    pdfRouter.route('/assets/upload/pdf').post(upload.single('file'), addPdfToDb);
    pdfRouter.route('/assets/get-all-pdfs').get(getAllPdfsFromDb);
    //GET: Fetch most recently added record
    pdfRouter.route('/assets/pdf/recent').get(fetchMostRecentPdf);
    //POST: Upload multiple files upto 20
    pdfRouter.route('/assets/multiple/pdf/upload').post(upload.array('files', 20), uploadMultipleFiles);
    pdfRouter.route('/assets/pdf/delete/:id').post(deletePdfFromDb);
    pdfRouter.route('/assets/pdf/content/:filename').get(renderPdf);
    return pdfRouter;
};