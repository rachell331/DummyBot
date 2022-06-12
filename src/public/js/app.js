const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const ws = new WebSocket(`ws://${location.host}`); //브라우저에서 백엔드와 connection을 열어준다.

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

ws.addEventListener("open", () => {
  console.log("Connected to Server");
});

ws.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

const nicknameSubmit = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  ws.send(makeMessage("nickname", input.value));
  input.value = "";
};

const messageSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  ws.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `${input.value}`;
  messageList.append(li);
  input.value = "";
};

nicknameForm.addEventListener("submit", nicknameSubmit);
messageForm.addEventListener("submit", messageSubmit);
