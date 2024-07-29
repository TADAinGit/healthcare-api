const httpStatus = require('http-status');
const SensorData = require('../models/sensorData.model');

/**
 * Get SensorData list
 * @public
 */
exports.getDataSensor = async (req, res, next) => {
  try {
    const { page = 1, perPage = 30, from, to, deviceId } = req.query;

    // Xây dựng điều kiện lọc
    const filters = {};

    if (deviceId) {
      filters.device = deviceId;
    }

    if (from && to) {
      filters.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to)
      };
    } else if (from) {
      filters.createdAt = {
        $gte: new Date(from)
      };
    } else if (to) {
      filters.createdAt = {
        $lte: new Date(to)
      };
    }

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
 * Get average SensorData by date range
 * @public
 */
exports.getAverageSensorData = async (req, res, next) => {
  try {
    const { from, to, deviceId } = req.query;

    if (!from || !to) {
      return res.status(400).send('Both "from" and "to" query parameters are required.');
    }

    // Xây dựng điều kiện lọc
    const match = {
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    };

    if (deviceId) {
      match.device = deviceId;
    }

    // Aggregation pipeline
    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          averageValue: { $avg: "$value" }
        }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day"
            }
          },
          averageValue: 1
        }
      },
      { $sort: { date: 1 } }
    ];

    const data = await SensorData.aggregate(pipeline).exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Get min and max SensorData by date range
 * @public
 */
exports.getMinMaxSensorData = async (req, res, next) => {
  try {
    const { from, to, deviceId } = req.query;

    if (!from || !to) {
      return res.status(400).send('Both "from" and "to" query parameters are required.');
    }

    // Xây dựng điều kiện lọc
    const match = {
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    };

    if (deviceId) {
      match.device = deviceId;
    }

    // Aggregation pipeline
    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          minValue: { $min: "$value" },
          maxValue: { $max: "$value" }
        }
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day"
            }
          },
          minValue: 1,
          maxValue: 1
        }
      },
      { $sort: { date: 1 } }
    ];

    const data = await SensorData.aggregate(pipeline).exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
};