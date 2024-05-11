const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
    }),
  },

  // POST /v1/auth/login
  login: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .max(128)
        .required(),
    }),
  },

  // POST /v1/auth/facebook and POST /v1/auth/google
  oAuth: {
    body: Joi.object({
      access_token: Joi.string().required(),
    }),
  },

  // POST /v1/auth/refresh
  refresh: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required(),
    }),
  },

  // POST /v1/auth/send-password-reset
  sendPasswordReset: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
    }),
  },

  // POST /v1/auth/password-reset
  passwordReset: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      resetToken: Joi.string().required(),
    }),
  },
};
