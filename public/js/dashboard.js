/* eslint-disable no-undef */
const socket = io();

socket.on("row:new", (data) => {
  if (data) {
    window.location.reload();
  }
});

function trClickHandler(e) {
  e.currentTarget.parentNode.querySelectorAll(".row-to-expand").forEach((row) => row.classList.toggle("hide-row"));
}

const rowsToClick = document.querySelectorAll(".row-to-click");
rowsToClick.forEach((el) => el.addEventListener("click", trClickHandler));
