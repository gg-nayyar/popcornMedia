import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import expressProxy from 'express-http-proxy';

dotenv.config();
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;

app.use('/api/auth', expressProxy('http://localhost:8001'));

server.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});


