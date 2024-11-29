const responseObjects = require("../helpers/response-objects");

const apiProtection = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return responseObjects.unauthorized(res, null, "Unauthorized access to this resource is denied", "Unauthorized access to this resource is denied");
    }
    if (token !== process.env.API_TOKEN) {
        return responseObjects.unauthorized(res, null, 'Unauthorized access to this resource is denied', 'Unauthorized access to this resource is denied');
    }
    next();
};

module.exports = apiProtection;