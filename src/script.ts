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





// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
