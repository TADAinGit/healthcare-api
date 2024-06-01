const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DIAGNOSIS } = require('../../constant/app.constant');

const HealthRecordSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentHealthStatus: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      enum: Object.values(DIAGNOSIS),
      required: true,
    }, // Sử dụng enum cho chẩn đoán
    treatment: {
      type: String,
      required: true,
    },
    medications: {
      type: [String],
      required: true,
    },
    doctorNotes: {
      type: String,
      required: true,
    },
    previousRecord: {
      type: Schema.Types.ObjectId,
      ref: "HealthRecord",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);
