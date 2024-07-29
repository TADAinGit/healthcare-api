const mqtt = require("mqtt");
const logger = require("../config/logger");
const sensorData = require("../api/models/sensor-data.model");
const emailProvider = require('../api/services/emails/emailProvider');

const protocol = "tls";
const connectUrl = `${protocol}://${process.env.MQTT_URL}:${process.env.MQTT_PORT}`

const mqttClient = mqtt.connect(
  connectUrl,
  {
    username: process.env.MQTT_SERVER_ACCOUNT,
    password: process.env.MQTT_SERVER_PASSWORD,
  }
);

const sendTestDataToMQTT = () => {
    const testData = {
      sensorType: 'heart-rate',
      value: 75,
      device: '60d0fe4f5311236168a109ca', 
      user: '60d0fe4f5311236168a109cb' 
    };
  
    mqttClient.publish('health/sensor/data', JSON.stringify(testData), (err) => {
      if (err) {
        console.error('Error publishing test data to MQTT:', err);
      } else {
        console.log('Test data sent to MQTT:', testData);
      }
    });
  };

let dataBuffer = [];
const BATCH_SIZE = 100;

mqttClient.on('connect', () => {
  logger.info('MQTT client connected to HiveMQ');
  mqttClient.subscribe('health/sensor/data');

//   sendTestDataToMQTT();
});

mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log(`Received data from device ${data.device}: ${JSON.stringify(data)}`);

  if ((data.sensorType === 'heart-rate' && (data.value > 100 || data.value < 60)) ||
      (data.sensorType === 'temperature' && (data.value > 38 || data.value < 35))) {
    console.log(`Alert! Abnormal data detected from device ${data.device}: ${JSON.stringify(data)}`);
    // Sau này bạn có thể thêm chức năng gửi mail ở đây
  }

  dataBuffer.push({
    sensorType: data.sensorType,
    value: data.value,
    device: data.device,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  if (dataBuffer.length >= BATCH_SIZE) {
    saveDataToMongoDB();
  }
});

const saveDataToMongoDB = async () => {
  try {
    await sensorData.insertMany(dataBuffer);
    logger.data('Batch data saved to MongoDB');
    dataBuffer = []; 
  } catch (err) {
    console.error('Error saving batch data to MongoDB:', err);
  }
};

setInterval(() => {
  if (dataBuffer.length > 0) {
    saveDataToMongoDB();
  }
}, 60000);

module.exports = mqttClient;