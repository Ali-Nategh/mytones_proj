import { getAdmin } from "../controllers/admin.controller";

const router = require('express').Router();

// Authentication function
import authenticateToken from '../middlewares/authenticateToken.middleware';


/**
 * @swagger
 * /admin/get_members:
 *  get:
 *      tags: [Admin]
 *      summary: Use to request all users
 *      parameters:
 *      - name: Authorization
 *        in: header
 *        description: The refresh Token.
 *        required: true
 *        type: string
 *        example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoiYmlhc2Fna2hvcmRAZ21haWwuY29tIiwiaWF0IjoxNjYwNTkyNTY3fQ.dYa6AaKOwIV3TEdE3QQUQdbDBNJvS3bSCQGK5OZzEL0
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

// GET '/admin/get_members'
router.get('/get_members', authenticateToken, getAdmin);



export default router;
