const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfSchema = new Schema({
    pdfCaption: {
        required: true,
        type: String,
    },
    pdfFileName: {
        required: true,
        type: String,
    },
    pdfFileId: {
        required: true,
        type: String,
    },
}, {
    timestamps: true,
});

const Pdf = mongoose.model('Pdf', PdfSchema);
module.exports = Pdf;