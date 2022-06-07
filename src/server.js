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

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const webss = [];

wss.on("connection", (ws) => {
  webss.push(ws);
  console.log("Connected to Browser");
  ws.on("close", () => console.log("Disconnected From the Browser"));
  ws.on("message", (message) => {
    webss.forEach((aws) => aws.send(message.toString("utf-8")));
  });
});

server.listen(3000, () => console.log(`Listening On http://localhost:3000`));
