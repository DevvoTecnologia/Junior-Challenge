import { createServer } from "node:http";
import { app } from "./app";
import { appConfig } from "./config/app";

const server = createServer(app);

const PORT = appConfig.port;

server.listen(PORT, () => {
  console.log("O servidor esta rodando!");
});
