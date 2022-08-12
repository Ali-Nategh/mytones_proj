// Importing .env
require('dotenv').config();
// Importing Express, Bcrypt & JWT 
import express from 'express';
// Initialize the App and Port
const app = express();
const PORT = process.env.PORT || 5000;
// This is used so we can get json request body
app.use(express.json());
import userRoute from './routes/user.routes';
app.use('/user', userRoute);
import homeRoute from './routes/home.routes';
app.use('/', homeRoute);
// PORT listen
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map