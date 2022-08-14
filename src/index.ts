// Importing .env
require('dotenv').config()

// Importing Express, Bcrypt & JWT 
import express, {Application, Request, Response, NextFunction} from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

// Initialize the App and Port
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Used so we can get json request body
app.use(express.json());

// Logger
import morgan from 'morgan';
app.use(morgan('dev'))


// home page Router
import homeRoute from './routes/home.routes';
app.use('/', homeRoute);

// user Router
import userRoute from './routes/user.routes';
app.use('/user', userRoute)


// Error handling
import { logError, returnError } from './errors/errorHandler';
import Api400Error from './errors/api400Error'

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new Api400Error('Page not found'));
})
app.use(logError)
app.use(returnError)




// // GET '/admin/get_members' to bring back all the members (JUST FOR TESTING)
// app.get('/admin/get_members', authenticateToken, async (req: Request, res: Response) => {
//     getMembers(res)
//         .catch(e => {
//             console.error(e.message)
//         })
//         .finally(async () => {
//             await prisma.$disconnect()
//         });
// });




// // POST '/user/login'
// app.post('/user/login', async (req: Request, res: Response) => {
//     const user = null || await prisma.user.findUnique({
//         where: {email: req.body.email}
//     });
//     if (user == null){
//         return res.status(400).send('Cannot find user');
//     };
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)){
//             const accessToken = generateToken(user.id)
//             const refresh_token = await prisma.refreshToken.update({
//                 where: {userId: user.id},
//                 data: {valid: true}
//             });
//             res.json({accessToken: accessToken, refresh_token: refresh_token.id});
//         } else {
//             res.send('Not Allowed');
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Server Error");
//     };
// });

// // POST '/user/refreshtoken'
// app.post('/user/refreshtoken', async (req: Request, res: Response) =>{
//     const refreshToken = req.body.token;
//     if (refreshToken == null) return res.status(400).send("Please include a refresh token");
//     const refresh_token = await prisma.refreshToken.findUnique({
//         where: {id: refreshToken}
//     });
//     if (refresh_token == null) return res.status(404).send("Refresh token not found");
//     if (refresh_token.valid == false) return res.status(403).send("Refresh token is not active, please login");
    
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: any) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = generateToken(user);
//         res.json({accessToken: accessToken});
//     });
// });

// // DELETE '/user/logout'
// app.delete('/user/logout', async (req: Request, res: Response) => {
//     const refresh_Token = req.body.token
//     if (refresh_Token == null) return res.status(400).send("Please include a refresh token");

//     const refreshtoken = await prisma.refreshToken.findUnique({
//         where: {id: refresh_Token}
//     });
//     if (refreshtoken == null) return res.status(404).send("Refresh token not found");
//     if (refreshtoken.valid == false) return res.status(403).send("Already logged out");

//     await prisma.refreshToken.update({
//         where: {id: refresh_Token},
//         data: {valid: false}
//     });
//     res.status(200).send("Logged out successfully");
// });


// Authentication function
import authenticateToken from './middleware/authenticateToken.middleware';

// function authenticateToken(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
    
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) =>{
//         if (err) {
//             return res.status(403).send("Token is invalid or has expired, please login again")
//         }
//         req.body.user = user
//         next()
//     });
// };

// Token Generation function
import { jwtAccessGen as generateToken } from './utils/jwtGenerate'
import { request } from 'http';


// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
