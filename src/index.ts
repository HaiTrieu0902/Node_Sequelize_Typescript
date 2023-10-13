import express, { Request, Response } from 'express';
const cors = require('cors');
const dotenv = require('dotenv');
// const connect = require('./config/connectDB');
const app = express();

/* Parser */
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'Server is running' });
});

// connect();
app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`);
});
