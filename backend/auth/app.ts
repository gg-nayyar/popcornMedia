import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

export default app; 