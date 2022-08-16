import { getAdmin } from "../controllers/admin.controller";

const router = require('express').Router();

// Authentication function
import authenticateToken from '../middlewares/authenticateToken.middleware';


// // GET '/admin/get_members'
router.get('/get_members', authenticateToken, getAdmin);



export default router;
