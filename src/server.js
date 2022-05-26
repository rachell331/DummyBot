import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

/**pug 설정 */
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.render("/"));

const handleListen = () => console.log(`Listening On http://localhost:3000`);

const server = http.createServer(app); //http server

const wss = new WebSocket.Server({ server }); //WebSocket server + http server

server.listen(3000, handleListen);
