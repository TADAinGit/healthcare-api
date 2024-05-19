const express = require('express');
const controller = require('../../controllers/health-check.controller');
// const validate = require('express-validation');

const router = express.Router();

/**
 * @api {post} v1/health Health-check
 * @apiDescription Service health-check
 * @apiVersion 1.0.0
 * @apiName Health-check
 * @apiGroup Health-check
 * @apiPermission public
 *
 * @apiError (Bad Request 503)  ServiceUnavailable  Something when wrong during processing
 */
router.route('/')
  .get( controller.healthCheck);

  module.exports = router;