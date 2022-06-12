const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { roomName: input.value }, () => {
    console.log("Server is Done.");
  });
  input.value = "";
};
form.addEventListener("submit", handleRoomSubmit);
