const express = require('express');
const router = express.Router();

const newsletterController = require('../controllers/newsletterController');
const auth = require('../middleware/auth');

router.post('/join', newsletterController.join);
router.get('/me',auth, newsletterController.isSubscribed);

module.exports = router;