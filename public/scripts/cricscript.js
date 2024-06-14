/* eslint-disable no-undef */

const socket = io("/tech");
socket.on("connect", () => {
  socket.emit("userConnected", { room: "cricket" });
});
socket.on("newUserMessage", () => {
  $(".close-user").addClass("display-user ");
});
$("form").submit((e) => {
  e.preventDefault();
  const value = $("#message").val();
  $("#message").val("");
  socket.emit("getMessage", { value, room: "cricket" });
});
socket.on("postMessage", (value) => {
  $(".message-list").append(`<li>${value}</li>`);
});

$("#close-button").click(() => {
  $(".close-user").removeClass("display-user");
});
