const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/signup',userController.signup);
router.post('/login',userController.login);
router.get('/',auth, role('admin'), userController.getAllUsers);
router.delete('/:id', auth, role('admin'), userController.deleteUser);
router.get('/me',auth, userController.getMe);
router.patch('/changepassword',auth, userController.changePassword);


module.exports = router;