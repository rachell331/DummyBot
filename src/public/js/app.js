const clientSocket = new WebSocket(`ws://${window.location.host}`); //브라우저에서 백엔드와 connection을 열어준다.

clientSocket.addEventListener("open", () => {
  console.log("Connected to Server");
});

clientSocket.addEventListener("message", (message) => {
  console.log("Just Got This : ", message, "from the Server");
});

clientSocket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  socket.send("Hello From the Browser!"); //front -> back로 보내기
}, 1000);
