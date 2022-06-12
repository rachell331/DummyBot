import express from "express";
import http from "http";
import { parse } from "path";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

/**pug 설정 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const wses = [];

wss.on("connection", (ws) => {
  wses.push(ws);
  ws["nickname"] = "Anonymous"; //nickname 초기값 설정
  console.log("Connected to Browser");

  ws.on("close", () => console.log("Disconnected From the Browser"));
  ws.on("message", (message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
      case "new_message":
        wses.forEach((ws) => ws.send(`${ws.nickname} : ${msg.payload}`));
      case "nickname":
        ws["nickname"] = msg.payload; //웹소켓 안에 정보를 저장할 수 있다.
    }
  });
});

server.listen(3000, () => console.log(`Listening On http://localhost:3000`));
