const form = document.getElementById("editForm");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");
if (!eventId) {
alert("ID de evento no válido");
window.location.href = "/public/dashboard/index.html";
}
async function loadEvent() {
const res = await fetch(`http://localhost:3000/events/${eventId}`);
const event = await res.json();
form.title.value = event.title;
form.location.value = event.location;
form.capacity.value = event.capacity;
}
form.addEventListener("submit", async (e) => {
e.preventDefault();
const updatedEvent = {
title: form.title.value.trim(),
location: form.location.value.trim(),
capacity: parseInt(form.capacity.value),
};
await fetch(`http://localhost:3000/events/${eventId}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(updatedEvent),
});
alert("Evento actualizado con éxito.");
window.location.href = "/public/dashboard/index.html";
});
loadEvent();