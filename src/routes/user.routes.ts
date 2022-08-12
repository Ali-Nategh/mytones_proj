import express from 'express';

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { validateUsername, validateEmail, validatePassword } from '../services/user.service';
import { signUpUser, loginUser, refreshUserToken, logoutUser } from '../controllers/user.controller';

const router = express.Router();


// POST '/user/signup' adding a member to the Database
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()] ,signUpUser);

// // POST '/user/login'
// router.post('/login', loginUser);

// // POST '/user/refreshtoken'
// router.post('/refreshtoken', refreshUserToken);

// // DELETE '/user/logout'
// router.delete('/logout', logoutUser);

export default router;
