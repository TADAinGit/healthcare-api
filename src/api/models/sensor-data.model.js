const mongoose = require('mongoose');
const { SENSOR } = require('../../constant/app.constant');
const Schema = mongoose.Schema;

const sensorDataSchema = new Schema({
  sensorType: {
    type: String,
    enum: SENSOR,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'IoTDevice',
    required: true
  }
}, {
  timestamps: true,
});

/**
 * Statics
 */
sensorDataSchema.statics = {

  /**
   * Get sensor data by ID
   *
   * @param {ObjectId} id - The objectId of sensor data.
   * @returns {Promise<SensorData, Error>}
   */
  async get(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return this.findById(id).exec();
    }
    throw new Error('Invalid ID');
  },

  /**
   * List sensor data in descending order of 'createdAt' timestamp.
   *
   * @param {number} page - Number of pages to be skipped.
   * @param {number} perPage - Limit number of sensor data to be returned.
   * @param {string} sensorType - Type of sensor data.
   * @returns {Promise<SensorData[]>}
   */
  list({
    page = 1, perPage = 30, sensorType,
  }) {
    const options = { sensorType };

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef SensorData
 */
module.exports = mongoose.model('SensorData', sensorDataSchema);
