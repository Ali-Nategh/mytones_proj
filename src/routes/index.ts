const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';



// Logger
import morgan from 'morgan';
router.use(morgan('dev'))


// inject home page routes
import homeRoute from '../routes/main.routes';
router.use('/', homeRoute);
// inject user routes
import userRoute from '../routes/user.routes';
router.use('/user', userRoute)
// inject admin routes
import adminRoute from '../routes/admin.routes';
router.use('/admin', adminRoute);


// Uncought Errors handling
import { logError, returnError } from '../errors/errorHandler';
import Api400Error from '../errors/api400Error'

router.use((req: Request, res: Response, next: NextFunction) => {
    next(new Api400Error('Page not found'));
})
router.use(logError)
router.use(returnError)


export default router;
