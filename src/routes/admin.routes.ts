import { adminGetAllUsers } from "../controllers/admin.controller";

const router = require('express').Router();

// Authentication function
import authenticateToken from '../middlewares/authenticateToken.middleware';


/**
 * @swagger
 * /admin/getUsers:
 *  get:
 *      tags: [Admin]
 *      security:
 *          - bearerAuth: []
 *          - ApiKeyAuth: []
 *      summary: Get a list of users (Put The Bearer Token In The Authorization Section At The Top Right Corner)
 *      responses:
 *          '200':
 *              description: The list of users
 *              content: 
 *                  apllication/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/User'
 *          '400':
 *              description: Token not found
 *          '403':
 *              description: Token invalid or expired
 */
router.get('/getUsers', authenticateToken, adminGetAllUsers);



export default router;
