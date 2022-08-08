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




// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});