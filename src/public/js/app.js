const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");
const ws = new WebSocket(`ws://${location.host}`); //브라우저에서 백엔드와 connection을 열어준다.

ws.addEventListener("open", () => {
  console.log("Connected to Server");
});

ws.addEventListener("message", (message) => {
  console.log("New Message: ", message.data);
});

ws.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  ws.send("Hello From the Browser!");
}, 10000);

const handleSubmit = (event) => {
  event.preventDefault();

  const input = msgForm.querySelector("input");
  ws.send(input.value);
  console.log(input.value);
  input.value = "";
};

msgForm.addEventListener("submit", handleSubmit);
