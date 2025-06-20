import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 8002;
const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
