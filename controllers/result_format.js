exports.formatResult = function(res, data, error) {
    if (error) {
        return { error: error.message, statuscode: error.statusCode || 500 };
    }
    if (typeof data === 'object') {
        return { result: data, statuscode: res.statusCode || 200, message: res.statusMessage || 'Success' };
    } else {
        return { result: String(data), statuscode: res.statusCode || 200, message: res.statusMessage || 'Success' };
    }
}