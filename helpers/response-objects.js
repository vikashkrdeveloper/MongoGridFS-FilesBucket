const responseObjects = {
    success: (res, data, message) => {
        res.status(200).json({
            message: message || 'Success',
            error: {
                status: false,
                message: null,
            },
            result: true,
            status: "SUCCESS",
            statusCode: 200,
            fetchCode: 200,
            data: data || null
        });
    }
    ,
    error: (res, data, message, errorMessages) => {
        res.status(500).json({
            message: message || 'Error',
            error: {
                status: true,
                message: errorMessages || null,
            },
            result: false,
            status: "ERROR",
            statusCode: 500,
            fetchCode: 500,
            data: data || null
        });
    }
    ,
    notFound: (res, data, message, errorMessages) => {
        res.status(404).json({
            message: message || 'Not Found',
            error: {
                status: true,
                message: errorMessages ?? 'Not Found',
            },
            result: false,
            status: "ERROR",
            statusCode: 404,
            fetchCode: 404,
            data: data || null
        });
    }
    ,
    badRequest: (res, data, message, errorMessages) => {
        res.status(400).json({
            message: message || 'Bad Request',
            error: {
                status: true,
                message: errorMessages ?? 'Bad Request',
            },
            result: false,
            status: "ERROR",
            statusCode: 400,
            fetchCode: 400,
            data: data || null
        });
    }
    ,
    unauthorized: (res, data, message, errorMessages) => {
        res.status(401).json({
            message: message || 'Unauthorized',
            error: {
                status: true,
                message: errorMessages ?? 'Unauthorized',
            },
            result: false,
            status: "ERROR",
            statusCode: 401,
            fetchCode: 401,
            data: data || null
        });
    }
    ,
    forbidden: (res, data, message, errorMessages) => {
        res.status(403).json({
            message: message || 'Forbidden',
            error: {
                status: true,
                message: errorMessages ?? 'Forbidden',
            },
            result: false,
            status: "ERROR",
            statusCode: 403,
            fetchCode: 403,
            data: data || null
        });
    }
    ,
    conflict: (res, data, message, errorMessages) => {
        res.status(409).json({
            message: message || 'Conflict',
            error: {
                status: true,
                message: errorMessages ?? 'Conflict',
            },
            result: false,
            status: "ERROR",
            statusCode: 409,
            fetchCode: 409,
            data: data || null
        });
    }
    ,
    validationError: (res, data, message, errorMessages) => {
        res.status(422).json({
            message: message || 'Validation Error',
            error: {
                status: true,
                message: errorMessages ?? 'Validation Error',
            },
            result: false,
            status: "ERROR",
            statusCode: 422,
            fetchCode: 422,
            data: data || null
        });
    }
    ,
    serverError: (res, data, message, errorMessages) => {
        res.status(500).json({
            message: message || 'Server Error',
            error: {
                status: true,
                message: errorMessages ?? 'Server Error',
            },
            result: false,
            status: "ERROR",
            statusCode: 500,
            fetchCode: 500,
            data: data || null
        });
    }
    ,
    serviceUnavailable: (res, data, message, errorMessages) => {
        res.status(503).json({
            message: message || 'Service Unavailable',
            error: {
                status: true,
                message: errorMessages ?? 'Service Unavailable',
            },
            result: false,
            status: "ERROR",
            statusCode: 503,
            fetchCode: 503,
            data: data || null
        });
    },
    created: (res, data, message) => {
        res.status(201).json({
            message: message || 'Created',
            error: {
                status: false,
                message: null,
            },
            result: true,
            status: "SUCCESS",
            statusCode: 201,
            fetchCode: 201,
            data: data || null
        });
    },
    noContent: (res, data, message) => {
        res.status(204).json({
            message: message || 'No Content',
            error: {
                status: false,
                message: null,
            },
            result: true,
            status: "SUCCESS",
            statusCode: 204,
            fetchCode: 204,
            data: data || null
        });
    },
    accepted: (res, data, message) => {
        res.status(202).json({
            message: message || 'Accepted',
            error: {
                status: false,
                message: null,
            },
            result: true,
            status: "SUCCESS",
            statusCode: 202,
            fetchCode: 202,
            data: data || null
        });
    },
}

module.exports = responseObjects;