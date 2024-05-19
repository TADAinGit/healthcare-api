const httpStatus = require('http-status');
const logger = require('../../config/logger');

const APP_HEALTH_CHECK_RESPONSE = {
    ok: "Application is running smoothly.",
    error: "Application health check failed."
}

exports.healthCheck = (req, res) => {
    try {
        logger.info(APP_HEALTH_CHECK_RESPONSE.ok);
        return res.status(httpStatus.OK).json({ message: APP_HEALTH_CHECK_RESPONSE.ok });
    } catch (error) {
        logger.error(APP_HEALTH_CHECK_RESPONSE.error, error);
        return res.status(httpStatus.SERVICE_UNAVAILABLE).json({ message: APP_HEALTH_CHECK_RESPONSE.error });
    }
}
