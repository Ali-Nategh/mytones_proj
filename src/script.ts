// Importing .env
require('dotenv').config()
// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Importing Express, Bcrypt & JWT 
import express, {Application, Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt, { VerifyErrors} from 'jsonwebtoken';

// Initialize the App and Port
const app: Application = express();
const PORT = process.env.PORT || 5000;

// This is used so we can get json request body
app.use(express.json());


// A function getting members from the Database
async function getMembers(res: Response) {
    const users = await prisma.user.findMany({
        select: {
            name: true,
            email: true
        }
    })
    res.send(users);
};

// GET '/' route (HomePage)
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Home Page");
});

// GET '/admin/get_members' to bring back all the members (JUST FOR TESTING)
app.get('/admin/get_members', authenticateToken, async (req: Request, res: Response) => {
    getMembers(res)
        .catch(e => {
            console.error(e.message)
        })
        .finally(async () => {
            await prisma.$disconnect()
        });
});

// POST '/users/signup' adding a member to the Database
app.post('/users/signup', async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Get user info from request body
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age          // Age is optional
        };
        // Generate a refreshToken for this user
        const refresh_token: string = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
        // Add user to Database
        const user_data = await prisma.user.create({   
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                age: user.age,
                refreshToken: {
                    create: {
                        id: refresh_token
                    }
                }
            },
            include: {refreshToken: true}
        });
        console.log(user_data);
        res.status(201).send();
    } catch (error){
        if (String(error).includes('email')){
            res.status(400).send("Email already exists");
        }
        res.status(500).send();
    };
});

// POST '/users/login'
app.post('/users/login', async (req: Request, res: Response) => {
    const user = null || await prisma.user.findUnique({
        where: {email: req.body.email}
    });
    if (user == null){
        return res.status(400).send('Cannot find user');
    };
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            const accessToken = generateToken(user.id)
            const refresh_token = await prisma.refreshToken.update({
                where: {userId: user.id},
                data: {valid: true}
            });
            res.json({accessToken: accessToken, refresh_token: refresh_token.id});
        } else {
            res.send('Not Allowed');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    };
});

// POST '/users/refreshtoken'
app.post('/users/refreshtoken', async (req: Request, res: Response) =>{
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(400).send("Please include a refresh token");
    const refresh_token = await prisma.refreshToken.findUnique({
        where: {id: refreshToken}
    });
    if (refresh_token == null) return res.status(404).send("Refresh token not found");
    if (refresh_token.valid == false) return res.status(403).send("Refresh token is not active, please login");
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateToken(user);
        res.json({accessToken: accessToken});
    });
});


// DELETE '/users/logout'
app.delete('/users/logout', async (req: Request, res: Response) => {
    const refresh_Token = req.body.token
    if (refresh_Token == null) return res.status(400).send("Please include a refresh token");

    const refreshtoken = await prisma.refreshToken.findUnique({
        where: {id: refresh_Token}
    });
    if (refreshtoken == null) return res.status(404).send("Refresh token not found");
    if (refreshtoken.valid == false) return res.status(403).send("Already logged out");

    await prisma.refreshToken.update({
        where: {id: refresh_Token},
        data: {valid: false}
    });
    res.status(200).send("Logged out successfully");
});

// Authentication function
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) =>{
        if (err) {
            return res.status(403).send("Token is invalid or has expired, please login again")
        }
        req.body.user = user
        next()
    });
};

// Token Generation function
function generateToken(userid: string){
    return jwt.sign({id: userid}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '30m'});
};


// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
