const router = require('express').Router();

import { getHome } from '../controllers/home.controller';


/**
 * @swagger
 * /:
 *  get:
 *      tags: [HomePage]
 *      responses:
 *          '200': 
 *              description: Welcome
 *          '400':
 *              description: Bad Request
 *          '500': 
 *              description: Something went wrong
 */


router.get('/', getHome);

export default router;
