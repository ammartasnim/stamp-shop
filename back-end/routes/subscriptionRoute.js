const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/',auth, subscriptionController.subscribe);
router.post('/:id',auth, subscriptionController.unsubscribe);
router.delete('/:id',auth,role('admin'),subscriptionController.delete);
router.get('/me',auth, subscriptionController.getUserSubscription);
router.get('/',auth,role('admin'), subscriptionController.getAllSubscriptions);

module.exports = router;