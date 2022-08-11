import express from 'express';
const router = express.Router();

import { getHome } from '../controllers/HomeController'

// GET '/' route (HomePage)
router.get('/', getHome);

export default router;
