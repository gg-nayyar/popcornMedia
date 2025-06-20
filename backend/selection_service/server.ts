import app from "./app";
import { createServer } from "http";

const PORT = process.env.PORT || 8004;
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});