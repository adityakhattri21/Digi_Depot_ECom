const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { processPayment, sendApiKey } = require('../controllers/paymentController');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser,processPayment);
router.route('/sendApiKey').get(sendApiKey);

module.exports = router;