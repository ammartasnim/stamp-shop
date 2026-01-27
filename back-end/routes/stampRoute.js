const express = require('express');
const router = express.Router();

const stampController = require('../controllers/stampController');
const role = require('../middleware/role');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.delete('/delete/:id',auth,role('admin'), stampController.deleteStamp);
router.post('/',auth,role('admin'), upload.single('image'), stampController.createStamp);
router.patch('/:id',auth,role('admin'), stampController.archiveStamp);
router.patch('/unarchive/:id',auth,role('admin'), stampController.unarchiveStamp);
router.get('/category', stampController.getStampsByCategory);
router.get('/:id', stampController.getStampById);
router.get('/', stampController.getAllStamps);

module.exports = router;