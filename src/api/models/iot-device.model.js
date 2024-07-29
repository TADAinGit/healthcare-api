const mongoose = require('mongoose');
const { SENSOR } = require('../../constant/app.constant');
const Schema = mongoose.Schema;

const IoTDeviceSchema = new Schema(
  {
    device_id: {
      type: String,
      required: true,
      unique: true,
    },
    device_name: {
      type: String,
      required: true,
    },
    device_type: {
      type: String,
      enum: SENSOR,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "maintenance","used"],
    },
    location: {
      latitude: {
        type: Number,
        required: true,
        default: 0,
      },
      longitude: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('IoTDevice', IoTDeviceSchema);
