const httpStatus = require('http-status');
const User = require('../models/user.model');
const IoTDevice = require('../models/iot-device.model');

/**
 * Load User and append to req.
 * @public
 */
exports.loadUser = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.getUser = (req, res) => res.json(req.locals.user);

/**
 * Create new user
 * @public
 */
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing user
 * @public
 */
exports.updateUser = (req, res, next) => {
  const updatedUser = req.body;
  const user = Object.assign(req.locals.user, updatedUser);

  user.save()
    .then((savedUser) => res.json(savedUser))
    .catch((e) => next(e));
};

/**
 * Delete user
 * @public
 */
exports.removeUser = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};

/**
 * List users
 * @public
 */
exports.listUsers = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30, ...filters } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10),
      sort: { createdAt: -1 },
    };
    const users = await User.paginate(filters, options);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Load IoTDevice and append to req.
 * @public
 */
exports.loadDevice = async (req, res, next, id) => {
  try {
    const device = await IoTDevice.findById(id);
    if (!device) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Device not found' });
    }
    req.locals = { device };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get device
 * @public
 */
exports.getDevice = (req, res) => res.json(req.locals.device);

/**
 * Create new device
 * @public
 */
exports.createDevice = async (req, res, next) => {
  try {
    const device = new IoTDevice(req.body);
    const savedDevice = await device.save();
    res.status(httpStatus.CREATED);
    res.json(savedDevice);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing device
 * @public
 */
exports.updateDevice = (req, res, next) => {
  const updatedDevice = req.body;
  const device = Object.assign(req.locals.device, updatedDevice);

  device.save()
    .then((savedDevice) => res.json(savedDevice))
    .catch((e) => next(e));
};

/**
 * Delete device
 * @public
 */
exports.removeDevice = (req, res, next) => {
  const { device } = req.locals;

  device.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};

/**
 * List devices
 * @public
 */
exports.listDevices = async (req, res, next) => {
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
