const user = JSON.parse(localStorage.getItem("user"));
if (user) window.location.href = "/public/dashboard/index.html";

const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
e.preventDefault();

const email = form.email.value.trim();
const password = form.password.value.trim();
const res = await

fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
const users = await res.json();

if (users.length === 1) {
const user = users[0];
localStorage.setItem('user', JSON.stringify(user));
window.location.href = "/public/dashboard/index.html";
} else {
alert("Correo o contraseña incorrectos");
}
});