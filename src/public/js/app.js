const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const serverDone = (msg) => {
  console.log("Server Is Done.", msg);
};
const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, serverDone);
  input.value = "";
};
form.addEventListener("submit", handleRoomSubmit);
