const Joi = require('joi');

module.exports = {
  listIoTDevices: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      device_name: Joi.string(),
      device_type: Joi.string(),
      status: Joi.string().valid('active', 'inactive', 'maintenance'),
    }),
  },
  createIoTDevice: {
    body: Joi.object({
      device_id: Joi.string().required(),
      device_name: Joi.string().required(),
      device_type: Joi.string().required(),
      status: Joi.string().valid('active', 'inactive', 'maintenance').required(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      timestamp: Joi.date().required(),
    }),
  },
  replaceIoTDevice: {
    body: Joi.object({
      device_id: Joi.string().required(),
      device_name: Joi.string().required(),
      device_type: Joi.string().required(),
      status: Joi.string().valid('active', 'inactive', 'maintenance').required(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      timestamp: Joi.date().required(),
    }),
    params: Joi.object({
      deviceId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }),
  },
  updateIoTDevice: {
    body: Joi.object({
      device_name: Joi.string(),
      device_type: Joi.string(),
      status: Joi.string().valid('active', 'inactive', 'maintenance'),
      location: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
      user: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      timestamp: Joi.date(),
    }),
    params: Joi.object({
      deviceId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }),
  },
};
