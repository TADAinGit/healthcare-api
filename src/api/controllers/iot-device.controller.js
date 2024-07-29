const httpStatus = require('http-status');
const IoTDevice = require('../models/iot-device.model');
const User = require('../models/user.model');

/**
 * Create new IoTDevice
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const iotDevice = new IoTDevice(req.body);
    const savedDevice = await iotDevice.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing IoTDevice
 * @public
 */
exports.update = async (req, res, next) => {
  const { deviceId } = req.params;
  try {
    const device = await IoTDevice.findById(deviceId);
    if (!device) {
      return res.status(404).send('Device not found');
    }

    Object.assign(device, req.body);
    const updatedDevice = await device.save();
    res.status(200).json(updatedDevice);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete IoTDevice
 * @public
 */
exports.remove = async (req, res, next) => {
  const { deviceId } = req.params;
  try {
    const device = await IoTDevice.findById(deviceId);
    if (!device) {
      return res.status(404).send('Device not found');
    }

    await device.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Get IoTDevice by ID
 * @public
 */
exports.get = async (req, res, next) => {
  const { deviceId } = req.params;
  try {
    const device = await IoTDevice.findById(deviceId);
    if (!device) {
      return res.status(404).send('Device not found');
    }

    res.status(200).json(device);
  } catch (error) {
    next(error);
  }
};

/**
 * List IoTDevices
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30, ...filters } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { createdAt: -1 },
    };
    const data = await IoTDevice.paginate(filters, options);
    res.json(data);
  } catch (error) {
    next(error);
  }
};


/**
 * Assign user to IoTDevice
 * @public
 */
exports.assignUserToDevice = async (req, res, next) => {
  const { deviceId, userId } = req.body;

  try {
    const device = await IoTDevice.findById(deviceId);
    if (!device) {
      return res.status(404).send('Device not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    device.user = userId;
    await device.save();

    res.status(200).send(`User ${userId} assigned to device ${deviceId}`);
  } catch (err) {
    console.error('Error assigning user to device:', err);
    next(err);
  }
};

/**
 * Remove user from IoTDevice
 * @public
 */
exports.removeUserFromDevice = async (req, res, next) => {
  const { deviceId } = req.body;

  try {
    const device = await IoTDevice.findById(deviceId);
    if (!device) {
      return res.status(404).send('Device not found');
    }

    device.user = null;
    await device.save();

    res.status(200).send(`User removed from device ${deviceId}`);
  } catch (err) {
    console.error('Error removing user from device:', err);
    next(err);
  }
};
