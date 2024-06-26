const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const healthRoutes = require('./health-check.route');
const adminRoute = require('./admin.route');

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
router.use('/admin', adminRoute);

module.exports = router;
