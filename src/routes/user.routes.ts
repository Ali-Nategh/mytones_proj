import express from 'express';

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { validateUsername, validateEmail, validatePassword, validateRefreshToken } from '../services/user.service';
import { signUpUser, loginUser, refreshUserToken, logoutUser } from '../controllers/user.controller';

const router = express.Router();


// POST '/user/signup' adding a member to the Database
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()] ,signUpUser);

// // POST '/user/login'
// router.post('/login', [validateEmail(), validatePassword()], loginUser);

// // POST '/user/refreshtoken'
// router.post('/refreshtoken', [validateRefreshToken()], refreshUserToken);

// // DELETE '/user/logout'
// router.delete('/logout', [validateRefreshToken()], logoutUser);

export default router;
