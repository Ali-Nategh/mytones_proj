import express from 'express';
const router = express.Router();

import { getHome } from '../controllers/home.controller'

// GET '/' route (HomePage)
router.get('/', getHome);

export default router;
