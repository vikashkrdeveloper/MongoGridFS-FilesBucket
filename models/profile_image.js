const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    userId: {
        required: true,
        type: String,
    },
    userName: {
        required: true,
        type: String,
    },
    userRole: {
        required: true,
        type: String,
    },
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    }
}, {
    timestamps: true,
});

const Image = mongoose.model('User_Profile', ImageSchema);

module.exports = Image;