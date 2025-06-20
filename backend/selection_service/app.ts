import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import locationExtractRoute from './routes/locationExtract.route';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/locationExtract', locationExtractRoute);

export default app;