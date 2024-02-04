const express = require('express');
const router = express.Router();    
const userController = require('../controllers/userController');
const authenticatedUser = require('../middleware/userMiddleware');

router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserById);
router.get('/login',userController.login);
router.post('/',userController.createUser);
router.get('/verify/send-email-otp/',userController.sentEmailOTP);
router.get('/verify-otp/:otp',userController.verifyOTP);
router.patch('/:id',userController.update);
router.delete('/:id',userController.delete);

module.exports = router;