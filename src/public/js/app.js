const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const ws = new WebSocket(`ws://${location.host}`); //브라우저에서 백엔드와 connection을 열어준다.

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};
ws.addEventListener("open", () => {
  console.log("Connected to Server");
});

ws.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data.toString("utf-8");
  messageList.append(li);
});

ws.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  ws.send("Hello From the Browser!");
}, 10000);

const handleSubmit = (event) => {
  event.preventDefault();
  const nickInput = messageForm.querySelector(".nick");
  const chatInput = messageForm.querySelector(".chat");
  ws.send([
    makeMessage("nickname", nickInput.value),
    makeMessage("new_message", chatInput.value),
  ]);
  nickInput.value = "";
  chatInput.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
