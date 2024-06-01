const express = require('express');
const { validate } =require('../../middlewares/requestValidate');
const userValidation = require('../../validations/user.validation');
const iotDeviceValidation = require('../../validations/iot-device.validation');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

// User routes
router.param('userId', adminController.loadUser);
router
  .route('/users')
  .get(adminController.listUsers)
  .post(validate(userValidation.createUser), adminController.createUser);

router
  .route('/users/:userId')
  .get(adminController.getUser)
  .patch(validate(userValidation.updateUser), adminController.updateUser)
  .delete(adminController.removeUser);

router.param('deviceId', adminController.loadDevice);
router
  .route('/devices')
  .get(adminController.listDevices)
  .post(validate(iotDeviceValidation.createIoTDevice), adminController.createDevice);

router
  .route('/devices/:deviceId')
  .get(adminController.getDevice)
  .patch(validate(iotDeviceValidation.updateIoTDevice), adminController.updateDevice)
  .delete(adminController.removeDevice);

module.exports = router;
