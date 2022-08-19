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
 *      UserLogin:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password
 *          example:
 *              email: JohnDoe@examle.com
 *              password: Password
 *      EmailValid:
 *          type: object
 *          required:
 *              - email
 *              - otp
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *              otp:
 *                  type: string
 *                  description: Sent password
 *          example:
 *              email: JohnDoe@examle.com
 *              otp: "156482"
 *      Email:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *          example:
 *              email: JohnDoe@examle.com
 *      Token:
 *          type: object
 *          required:
 *              token
 *          properties:
 *              token:
 *                  type: string
 *                  description: jwt token
 *          example:
 *              token: afjlkd2jflsi4fghs7jg.sdfisjgp4sodk7lskfhpwej.sdpjfi7sjp4gosdgpsm
 *      AccessToken:
 *          type: object
 *          required:
 *              authorization
 *          properties:
 *              authorization:
 *                  type: string
 *                  description: jwt token
 *          example:
 *              authorization: Bearer afjlkd2jflsi4fghs7jg.sdfisjgp4sodk7lskfhpwej.sdpjfi7sjp4gosdgpsm
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
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      responses:
 *          '201': 
 *              description: User was successfully created
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User' 
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
 *                          $ref: '#/components/schemas/User' 
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
 * /user/refreshtoken:
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
 *                          $ref: '#/components/schemas/User' 
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Password wrong or Information invalid
 *          '500': 
 *              description: Something went wrong
 */
router.post('/refreshtoken', [validateToken()], validationMiddleware, refreshUserToken);


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
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User' 
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
