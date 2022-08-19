const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import homeRoute from './main.routes';
import userRoute from './user.routes';
import adminRoute from './admin.routes';
import { logError, returnError } from '../errors/errorHandler';
import Api400Error from '../errors/api400Error'

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
    next(new Api400Error('Page not found'));
})
router.use(logError)
router.use(returnError)


export default router;
