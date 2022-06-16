import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

/**pug 설정 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    setTimeout(() => {
      done();
    }, 1000);
  });
});

httpServer.listen(3000);
