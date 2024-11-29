// gridfs.js
const mongoose = require("mongoose");
const config = require('../config');
let gfs;

const initGridFS = () => {
    const url = config.mongoURI;
    const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

    connect.once("open", () => {
        gfs = new mongoose.mongo.GridFSBucket(connect.db, {
            bucketName: "uploads"
        });
    });

    return connect;
};

const getGridFS = () => {
    if (!gfs) {
        throw new Error("GridFS is not initialized yet");
    }
    return gfs;
};

module.exports = { initGridFS, getGridFS };
