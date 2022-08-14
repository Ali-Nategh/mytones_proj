const router = require('express').Router();

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { validateUsername, validateEmail, validatePassword, validateToken } from '../services/user.service';
import { signUpUser, loginUser, refreshUserToken, logoutUser } from '../controllers/user.controller';



// POST '/user/signup' adding a member to the Database
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()] ,signUpUser);

// // POST '/user/login'
// router.post('/login', [validateEmail(), validatePassword()], loginUser);

// // POST '/user/refreshtoken'
// router.post('/refreshtoken', [validateToken()], refreshUserToken);

// // DELETE '/user/logout'
// router.delete('/logout', [validateToken()], logoutUser);

export default router;
