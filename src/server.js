import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

/**pug 설정 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on("upgrade", (request, socket, head) => {
  console.log("Parsing Session From Request");

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", (ws, request) => {
  console.log("Connected to Browser");

  ws.on("message", (message) => {
    console.log(message);
  });

  ws.on("close", () => console.log("Disconnected From the Browser"));
});

server.listen(9000, () => console.log(`Listening On http://localhost:9000`));
