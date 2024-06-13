import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on("connect", (socket) => {
  console.log(socket.id);
  console.info("user has joined the chat");
});
//logging method and routes
app.use((req, res, next) => {
  console.info(`${req.method} --> ${req.originalUrl}`);
  next();
});
//HOME ROUTE /
app.use("/", (req, res) => {
  res.send("hello world");
});
httpServer.listen(PORT, () => {
  console.info(`The server is up and running on ${PORT}`);
});
