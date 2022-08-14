// Importing .env
require('dotenv').config()

// Importing Express, Bcrypt & JWT 
import express, {Application} from 'express';

// Initialize the App and Port
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Used so we can get json request body
app.use(express.json());



// Initialize and use routes
import appRouter from './routes'
app.use(appRouter)


// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
