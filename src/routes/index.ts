const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import homeRoute from './main.routes';
import userRoute from './user.routes';
import adminRoute from './admin.routes';
import { logError, returnError } from '../errors/errorHandler';
import Api404Error from '../errors/api404Error'

// Logger
router.use(morgan('dev'))

// Documentation
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Mytones API',
            version: "1.0.0",
            description: 'Mytones API information',
            contact: {
                name: "Ali Nategh"
            },
        },
        servers: [
            {
                url: "http://localhost:5000/"
            },
            {
                url: __dirname
            },
        ],
    },
    apis: ["src/routes/*.ts"]
}
const specs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

router.use('/', homeRoute);
router.use('/user', userRoute)
router.use('/admin', adminRoute);


// Uncought Errors handling
router.use((req: Request, res: Response, next: NextFunction) => {
    next(new Api404Error('Page not found'));
})
router.use(logError)
router.use(returnError)


// Documentation Schemas
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - name
 *              - lastname
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
 *              name: John
 *              lastname: Doe
 *              email: JohnDoe@examle.com
 *              password: Password
 *              age: 22 (optional)
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


export default router;
