const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const healthRoutes = require('./health-check.route');
const adminRoutes = require('./admin.route');
const iotDeviceRoutes = require('./iot-device.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/health', healthRoutes)
router.use('/admin', adminRoutes);
router.use('/iot-devices', iotDeviceRoutes)

module.exports = router;
