const Joi = require('joi');
const {ROLES} = require('../../constant/app.constant');

module.exports = {
  listUsers: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(...ROLES),
    }),
  },
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
      birth: Joi.date(),
      role: Joi.string().valid(...ROLES),
    }),
  },
  replaceUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(...ROLES),
    }),
    params: Joi.object({
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }),
  },
  updateUser: {
    body: Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
      role: Joi.string().valid(...ROLES),
    }),
    params: Joi.object({
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    }),
  },
};

