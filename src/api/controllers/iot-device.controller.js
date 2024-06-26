const httpStatus = require('http-status');
const IoTDevice = require('../models/iot-device.model');

/**
 * Load IoTDevice and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const iotDevice = await IoTDevice.findById(id);
    if (!iotDevice) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Device not found' });
    }
    req.locals = { iotDevice };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get IoTDevice
 * @public
 */
exports.get = (req, res) => res.json(req.locals.iotDevice);

/**
 * Create new IoTDevice
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const iotDevice = new IoTDevice(req.body);
    const savedIoTDevice = await iotDevice.save();
    res.status(httpStatus.CREATED);
    res.json(savedIoTDevice);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing IoTDevice
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { iotDevice } = req.locals;
    const newIoTDevice = new IoTDevice(req.body);
    const newIoTDeviceObject = newIoTDevice.toObject();
    delete newIoTDeviceObject._id;

    await iotDevice.updateOne(newIoTDeviceObject, { override: true, upsert: true });
    const savedIoTDevice = await IoTDevice.findById(iotDevice._id);

    res.json(savedIoTDevice);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing IoTDevice
 * @public
 */
exports.update = (req, res, next) => {
  const updatedIoTDevice = req.body;
  const iotDevice = Object.assign(req.locals.iotDevice, updatedIoTDevice);

  iotDevice.save()
    .then((savedIoTDevice) => res.json(savedIoTDevice))
    .catch((e) => next(e));
};

/**
 * Get IoTDevice list
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
    const devices = await IoTDevice.paginate(filters, options);
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete IoTDevice
 * @public
 */
exports.remove = (req, res, next) => {
  const { iotDevice } = req.locals;

  iotDevice.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
