const clientSocket = new WebSocket(`ws://${window.location.host}`);

clientSocket.addEventListener("open", () => {
  console.log("Connected to Server");
});

clientSocket.addEventListener("message", (message) => {
  console.log("Just Got This : ", message, "from the Server");
});

clientSocket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});
