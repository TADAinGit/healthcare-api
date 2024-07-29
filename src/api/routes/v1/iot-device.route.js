const express = require('express');
const { validate } =require('../../middlewares/requestValidate');
const userValidation = require('../../validations/user.validation');
const iotDeviceValidation = require('../../validations/iot-device.validation');
const iotDeviceController = require('../../controllers/iot-device.controller');

const router = express.Router();

// IoT device routes
// router.param('deviceId', iotDeviceController.get);
router
  .route('/')
  .get(iotDeviceController.list)
  .post(/*validate(userValidation.createUser),*/ iotDeviceController.create);

router
  .route('/:deviceId')
  .get(iotDeviceController.get)
  .patch(/*validate(userValidation.updateUser),*/ iotDeviceController.update)
  .delete(iotDeviceController.remove);

router
    .route('/assign')
    .post(iotDeviceController.assignUserToDevice);

router
    .route('/unassign')
    .post(iotDeviceController.removeUserFromDevice);

module.exports = router;
