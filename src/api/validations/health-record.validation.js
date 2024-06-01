const Joi = require('joi');
const {DIAGNOSIS} = require('../../constant/app.constant');

module.exports = {
  updateHealthRecord: {
    body: Joi.object({
      currentHealthStatus: Joi.string().required(),
      diagnosis: Joi.string()
        .valid(...Object.values(DIAGNOSIS))
        .required(),
      treatment: Joi.string().required(),
      medications: Joi.array().items(Joi.string()).required(),
      doctorNotes: Joi.string().required(),
    }),
    params: Joi.object({
      patientId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      healthRecordId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
  },
};
