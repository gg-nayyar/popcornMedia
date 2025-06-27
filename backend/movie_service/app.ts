import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import moviesRoutes from './routes/movies.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', moviesRoutes);

export default app;