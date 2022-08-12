import express from 'express';
const router = express.Router();

import { signUpUser,  } from '../controllers/user.controller';



// POST '/user/signup' adding a member to the Database
router.post('/signup', signUpUser);

// // POST '/user/login'
// router.post('/login', loginUser);

// // POST '/user/refreshtoken'
// router.post('/refreshtoken', refreshUserToken);

// // DELETE '/user/logout'
// router.delete('/logout', logoutUser);

export default router;
