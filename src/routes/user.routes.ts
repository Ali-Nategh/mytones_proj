const router = require('express').Router();

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { signUpUser, loginUser, refreshUserToken, logoutUser, validateUserOtp, resendUserOtp } from '../controllers/user.controller';
import { validateUsername, validateEmail, validatePassword, validateToken, validateOtp } from '../services/validation.service';
import validationMiddleware from '../middlewares/validateResults.middleware';

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: User name
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password
 *          example:
 *              username: JohnDoe
 *              email: JohnDoe@examle.com
 *              password: Password
 *      Token:
 *          type: string
 *          required: true
 *          example:
 *              token: afjlkd2jflsi4fghs7jg.sdfisjgp4sodk7lskfhpwej.sdpjfi7sjp4gosdgpsm
 */

/**
 * @swagger
 * tags:
 *  - name: HomePage
 *    description:
 *  - name: Users
 *    description: The Users managing API
 *  - name: Admin
 *    description: The Admin API
 */

/**
 * @swagger
 * /user/signup:
 *  post:
 *      tags: [Users]
 *      summary: Create a new User
 *      requestBody:
 *          required: true
 *          content: 
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          '201': 
 *              description: User was successfully created
 *              content: 
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User' 
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating user
 */

// POST '/user/signup' adding a member to the Database
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()], validationMiddleware, signUpUser);

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags: [Users]
 *      summary: Login with a username and password
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to login
 *          schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *      responses:
 *          '201': 
 *              description: User was successfully created
 *              content: 
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User' 
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Password wrong or Information invalid
 *          '500': 
 *              description: Something went wrong
 */

// POST '/user/login'
router.post('/login', [validateEmail(), validatePassword()], validationMiddleware, loginUser);

// POST '/user/refreshtoken'
router.post('/refreshtoken', [validateToken()], validationMiddleware, refreshUserToken);

// POST '/user/validateEmail'
router.post('/validateEmail', [validateEmail(), validateOtp()], validationMiddleware, validateUserOtp);

// POST '/user/validateEmail'
router.post('/resendEmail', [validateEmail()], validationMiddleware, resendUserOtp);

// DELETE '/user/logout'
router.delete('/logout', [validateToken()], validationMiddleware, logoutUser);


export default router;
