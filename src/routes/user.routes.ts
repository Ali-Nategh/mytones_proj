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
 *              example:
 *                  username: JohnDoe
 *                  email: JohnDoe@examle.com
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

/**
 * @swagger
 * /user/refreshtoken:
 *  post:
 *      tags: [Users]
 *      summary: Get a new Access Token
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: refreshtoken
 *          description: Refreshing Access Token
 *          schema:
 *              type: object
 *              required:
 *                  - token
 *              properties:
 *                  token:
 *                      type: string
 *              example:
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoiYmlhc2Fna2hvcmRAZ21haWwuY29tIiwiaWF0IjoxNjYwNTkyNTY3fQ.dYa6AaKOwIV3TEdE3QQUQdbDBNJvS3bSCQGK5OZzEL0
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

// POST '/user/refreshtoken'
router.post('/refreshtoken', [validateToken()], validationMiddleware, refreshUserToken);

/**
 * @swagger
 * /user/validateEmail:
 *  post:
 *      tags: [Users]
 *      summary: Validate email with the sent otp
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: Email validation with one time password
 *          schema:
 *              type: object
 *              required:
 *                  - email
 *                  - otp
 *              properties:
 *                  email:
 *                      type: string
 *                  otp:
 *                      type: string
 *      responses:
 *          '201': 
 *              description: User was successfully created
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

// POST '/user/validateEmail'
router.post('/validateEmail', [validateEmail(), validateOtp()], validationMiddleware, validateUserOtp);

/**
 * @swagger
 * /user/resendEmail:
 *  post:
 *      tags: [Users]
 *      summary: Resend the otp email if user hasn't received it
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
 *              properties:
 *                  email:
 *                      type: string
 *      responses:
 *          '201': 
 *              description: Email sent successfully
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

// POST '/user/validateEmail'
router.post('/resendEmail', [validateEmail()], validationMiddleware, resendUserOtp);

/**
 * @swagger
 * /user/logout:
 *  delete:
 *      tags: [Users]
 *      summary: Log out and Deactivate the Refresh Token
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: refreshtoken
 *          description: Deactivate Refresh Token
 *          schema:
 *              type: object
 *              required:
 *                  - token
 *              properties:
 *                  token:
 *                      type: string
 *              example:
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmV6YSIsImVtYWlsIjoiYmlhc2Fna2hvcmRAZ21haWwuY29tIiwiaWF0IjoxNjYwNTkyNTY3fQ.dYa6AaKOwIV3TEdE3QQUQdbDBNJvS3bSCQGK5OZzEL0
 *      responses:
 *          '200': 
 *              description: Logged out successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User' 
 *          '400':
 *              description: Bad Request, information invalid
 *          '403':
 *              description: Refresh token not found
 *          '500': 
 *              description: Something went wrong
 */

// DELETE '/user/logout'
router.delete('/logout', [validateToken()], validationMiddleware, logoutUser);


export default router;
