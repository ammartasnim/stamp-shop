const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', orderController.createOrder);
router.post('/:id/cancel', auth, orderController.cancelOrder);
router.get('/myorders', auth, orderController.getMyOrders);
router.get('/:id', auth, orderController.getOrderById);
router.get('/', auth, role('admin'), orderController.getAllOrders);
router.put('/:id/status', auth, role('admin'), orderController.updateOrderStatus);


module.exports = router;