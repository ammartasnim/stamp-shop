const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addItem);
router.post('/update', auth, cartController.updateQuantity);
router.post('/remove', auth, cartController.removeItem);
router.post('/clear', auth, cartController.clearCart);

module.exports = router;