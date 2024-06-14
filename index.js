import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import bodyParser from "body-parser";
import path from "path";
const __dirname = path.resolve();
const PORT = 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("view engine", "ejs");
app.set("views", "views");

//serving static files css and javascript
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/", (req, res) => {
  res.render("index", { title: "Web chat🗨️" });
});
app.get("/tech", (req, res) => {
  res.render("tech", { title: "tech-chat🗨️" });
});
app.get("/social", (req, res) => {
  res.render("social", { title: "social-chat🗨️" });
});
app.get("/cricket", (req, res) => {
  res.render("cricket", { title: "cricket-chat🗨️" });
});
httpServer.listen(PORT, () => {
  console.info(`The server is up and running on ${PORT}`);
});
