import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

/**pug 설정 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening On http://localhost:8001`);

const server = http.createServer(app); //http server ~ express.js를 이용해서 만듬
const wss = new WebSocketServer({ server }); //WebSocket server + http server

wss.on("connection", (socket) => {
  console.log("Connected to Browser");

  socket.on("close", () => console.log("Disconnected From the Brwoser"));
  socket.on("message", (message) => {
    console.log(message.toString()); //특정 소켓에서 메세지를 받았을 때 발생
  });
  //이벤트를 추가해주고
  socket.send("hello"); //메세지를 브라우저로 전달 , back -> front로 보내기
});

server.listen(8001, handleListen);
