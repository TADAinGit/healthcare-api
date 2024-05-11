const Joi = require('joi');
const User = require('../models/user.model');

exports.validate = (schema) => (req, res, next) => {
    const objects = {
        body: req.body,
        query: req.query,
        params: req.params
    };
    
    for (const [key, value] of Object.entries(schema)) {
        if (objects[key]) {
            const { error } = value.validate(objects[key]);
            if (error) {
                return next(error);
            }
        }
    }
    next();
}