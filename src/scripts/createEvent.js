const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role !== "admin") {
window.location.href = "/public/not-found/index.html";
}
document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("form-create");form.addEventListener("submit", (e) => {
e.preventDefault();
const title = document.getElementById("title").value;
const location = document.getElementById("location").value;
const capacity = parseInt(document.getElementById("capacity").value);
const newEvent = {
title,
location,
capacity,
attendees: []
};
fetch("http://localhost:3000/events", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newEvent)
})
.then(() => {
alert("Evento creado con éxito");
window.location.href = "/public/dashboard/index.html";
});
});
});