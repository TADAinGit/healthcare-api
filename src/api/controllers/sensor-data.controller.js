const httpStatus = require('http-status');
const SensorData = require('../models/sensorData.model');

/**
 * Load SensorData and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const sensorData = await SensorData.findById(id);
    if (!sensorData) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Sensor data not found' });
    }
    req.locals = { sensorData };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get SensorData
 * @public
 */
exports.get = (req, res) => res.json(req.locals.sensorData);

/**
 * Create new SensorData
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const sensorData = new SensorData(req.body);
    const savedSensorData = await sensorData.save();
    res.status(httpStatus.CREATED);
    res.json(savedSensorData);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing SensorData
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { sensorData } = req.locals;
    const newSensorData = new SensorData(req.body);
    const newSensorDataObject = newSensorData.toObject();
    delete newSensorDataObject._id;

    await sensorData.updateOne(newSensorDataObject, { override: true, upsert: true });
    const savedSensorData = await SensorData.findById(sensorData._id);

    res.json(savedSensorData);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing SensorData
 * @public
 */
exports.update = (req, res, next) => {
  const updatedSensorData = req.body;
  const sensorData = Object.assign(req.locals.sensorData, updatedSensorData);

  sensorData.save()
    .then((savedSensorData) => res.json(savedSensorData))
    .catch((e) => next(e));
};

/**
 * Get SensorData list
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
    const data = await SensorData.paginate(filters, options);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete SensorData
 * @public
 */
exports.remove = (req, res, next) => {
  const { sensorData } = req.locals;

  sensorData.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
