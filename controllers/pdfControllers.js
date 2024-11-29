const responseObjects = require("../helpers/response-objects");
const Pdf = require("../models/pdf");
const gfsFun = require("../config/gridfs");

const addPdfToDb = async (req, res) => {
    try {
        if (!req.file) {
            return responseObjects.badRequest(res, null, 'No file found', 'No file found');
        }
        const isCaptionImageIsExist = await Pdf.findOne({ pdfCaption: req.body.caption });
        if (isCaptionImageIsExist) {
            return responseObjects.conflict(res, null, 'Image already exists', "Image already exists");
        }

        const newPdf = new Pdf({
            pdfCaption: req.body.caption,
            pdfFileName: req.file.filename,
            pdfFileId: req.file.id,
        });
        await newPdf.save();
        return responseObjects.created(res, newPdf, 'Pdf added successfully', 'Pdf added successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const getAllPdfsFromDb = async (req, res) => {
    try {
        const pdfs = await Pdf.find({}).lean();
        return responseObjects.success(res, pdfs, 'Pdfs fetched successfully', 'Pdfs fetched successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const deletePdfFromDb = async (req, res) => {
    try {
        const isPdfExist = await Pdf.findOne({ _id: req.params.id });
        if (!isPdfExist) {
            return responseObjects.notFound(res, null, 'Pdf not found', 'Pdf not found');
        }
        const deletedPdf = await Pdf.deleteOne({ _id: req.params.id });
        return responseObjects.success(res, deletedPdf, 'Pdf deleted successfully', 'Pdf deleted successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const fetchMostRecentPdf = async (req, res) => {
    try {
        const pdf = await Pdf.findOne({}, {}, { sort: { '_id': -1 } });
        return responseObjects.success(res, pdf, 'Pdf fetched successfully', 'Pdf fetched successfully');
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
        let pdfs = [];
        files.map(async (file) => {
            const newPdf = new Pdf({
                pdfCaption: req.body.caption,
                pdfFileName: file.filename,
                pdfFileId: file.id,
            });
            pdfs.push(newPdf);
        });
        await Pdf.insertMany(pdfs);
        return responseObjects.created(res, pdfs, 'Pdfs added successfully', 'Pdfs added successfully');
    } catch (error) {
        return responseObjects.error(res, error, 'Internal server error', 'Internal server error');
    }
}

const renderPdf = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const pdf = await Pdf.findOne({ pdfFileName: fileName });
        if (!pdf) {
            return responseObjects.notFound(res, null, 'Pdf not found', 'Pdf not found');
        }
        const gfs = gfsFun.getGridFS();
        const fileFind=await gfs.find({filename:pdf.pdfFileName}).toArray();
        if(!fileFind[0]){
            return responseObjects.notFound(res, null, 'File not found in GridFS', 'File not found in GridFS');
        }
        if (fileFind[0].contentType !== 'application/pdf') {
            return responseObjects.badRequest(res, null, 'File is not a pdf', 'File is not a pdf');
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdf.pdfFileName}`);
        const downloadStream = gfs.openDownloadStreamByName(pdf.pdfFileName);
        downloadStream.pipe(res);
    }
    catch (error) {
        return responseObjects.error(res, error.message, 'Internal server error', 'Internal server error');
    }
}

module.exports = {
    addPdfToDb,
    getAllPdfsFromDb,
    deletePdfFromDb,
    fetchMostRecentPdf,
    uploadMultipleFiles,
    renderPdf,
};