const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    videoCaption: {
        required: true,
        type: String,
    },
    videoFileName: {
        required: true,
        type: String,
    },
    videoFileId: {
        required: true,
        type: String,
    }
}, {
    timestamps: true,
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;