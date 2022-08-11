import express from 'express';
const router = express.Router();

import { signUpUser,  } from '../controllers/UserController';



// POST '/users/signup' adding a member to the Database
router.post('/signup', signUpUser);


export default router;
