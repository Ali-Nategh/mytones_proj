const router = require('express').Router();

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { validateUsername, validateEmail, validatePassword, validateToken, validateOtp } from '../services/validation.service';
import { signUpUser, loginUser, refreshUserToken, logoutUser, validateUserOtp } from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validateResults.middleware';



// POST '/user/signup' adding a member to the Database
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()], validationMiddleware, signUpUser);

// POST '/user/login'
router.post('/login', [validateEmail(), validatePassword()], validationMiddleware, loginUser);

// POST '/user/refreshtoken'
router.post('/refreshtoken', [validateToken()], validationMiddleware, refreshUserToken);

// POST '/user/validateEmail'
router.post('/validateEmail', [validateEmail(), validateOtp()], validationMiddleware, validateUserOtp);

// DELETE '/user/logout'
router.delete('/logout', [validateToken()], validationMiddleware, logoutUser);


export default router;
