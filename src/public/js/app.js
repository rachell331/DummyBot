const btn = document.querySelector(".outlined");
const ws = new WebSocket(`ws://${location.host}`); //브라우저에서 백엔드와 connection을 열어준다.

ws.onopen = () => {
  console.log("Connected to Server");
};

ws.onmessage = (message) => {
  console.log(message);
};

ws.onclose = () => {
  console.log("Disconnected from Server");
};

btn.onclick = () => {
  if (!ws) return;

  ws.send("Hello World!");
};
