require('dotenv').config()

import express, { Application } from 'express';
import appRouters from './routes/index'

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Used so we can get json request body
app.use(express.json(), express.urlencoded({ extended: true }));

app.use(appRouters)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
