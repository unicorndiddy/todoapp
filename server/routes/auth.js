const express = require('express');
// const { registerUser } = require('../controllers/auth');
const authRouter = express.Router();
const authController = require('../controllers/auth');

authRouter.post('/register', authController.registerUser)

authRouter.post('/login', authController.loginUser)

module.exports = authRouter;