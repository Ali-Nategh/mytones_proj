import jwt, { VerifyErrors } from 'jsonwebtoken';

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
import { jwtAccessGen as generateToken } from './utils/jwtToken'
import { request } from 'http';