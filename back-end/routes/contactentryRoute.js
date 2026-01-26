const express = require('express');
const router = express.Router();

const contactentryController = require('../controllers/contactentryController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.delete('/:id', auth, role('admin'), contactentryController.deleteEntry);
router.post('/', contactentryController.submit);
router.get('/', contactentryController.getAllEntries);


module.exports = router;