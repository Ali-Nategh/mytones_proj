const router = require('express').Router();

import bodyParser from 'body-parser';
const urlencodedparser = bodyParser.urlencoded({ extended: false });

import { signUpUser, loginUser, refreshUserToken, logoutUser, validateUserOtp, resendUserOtp } from '../controllers/user.controller';
import { validateUsername, validateEmail, validatePassword, validateToken, validateOtp } from '../services/validation.service';
import validationMiddleware from '../middlewares/validateResults.middleware';


/**
 * @swagger
 * /user/signup:
 *  post:
 *      tags: [Users]
 *      summary: Create a new User
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          '201': 
 *              description: User was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating user
 */
router.post('/signup', urlencodedparser, [validateUsername(), validateEmail(), validatePassword()], validationMiddleware, signUpUser);


/**
 * @swagger
 * /user/login:
 *  post:
 *      tags: [Users]
 *      summary: Login with a username and password
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserLogin'
 *      responses:
 *          '200': 
 *              description: Logged in Successfully
 *              content: 
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Password wrong or Information invalid
 *          '500': 
 *              description: Something went wrong
 */
router.post('/login', [validateEmail(), validatePassword()], validationMiddleware, loginUser);


/**
 * @swagger
 * /user/refreshToken:
 *  post:
 *      tags: [Users]
 *      summary: Login with a username and password
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *      responses:
 *          '200': 
 *              description: Access token generated
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Password wrong or Information invalid
 *          '500': 
 *              description: Something went wrong
 */
router.post('/refreshToken', [validateToken()], validationMiddleware, refreshUserToken);


/**
 * @swagger
 * /user/validateEmail:
 *  post:
 *      tags: [Users]
 *      summary: Validate email with the sent otp
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EmailValid'
 *      responses:
 *          '200': 
 *              description: Email activated successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Password wrong or Information invalid
 *          '500': 
 *              description: Something went wrong
 */
router.post('/validateEmail', [validateEmail(), validateOtp()], validationMiddleware, validateUserOtp);


/**
 * @swagger
 * /user/resendEmail:
 *  post:
 *      tags: [Users]
 *      summary: Resend the otp email if user hasn't received it
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Email'
 *      responses:
 *          '200': 
 *              description: Email sent successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Information invalid
 *          '500': 
 *              description: Something went wrong
 */
router.post('/resendEmail', [validateEmail()], validationMiddleware, resendUserOtp);


/**
 * @swagger
 * /user/logout:
 *  delete:
 *      tags: [Users]
 *      summary: Log out and Deactivate the Refresh Token
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Token'
 *      responses:
 *          '200': 
 *              description: Logged out successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Refresh token not found
 *          '500': 
 *              description: Something went wrong
 */
router.delete('/logout', [validateToken()], validationMiddleware, logoutUser);


export default router;
