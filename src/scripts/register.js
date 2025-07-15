const user = JSON.parse(localStorage.getItem("user"));
    if (user) window.location.href = "/public/dashboard/index.html";

registerForm = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role = form.role.value;
    if (!name || !email || !password || !role) {
    alert("Completa todos los campos.");
    return;
    }
    // Validar si ya existe el email
    const res = await fetch(`http://localhost:3000/users?email=${email}`);
    const existing = await res.json();
    if (existing.length > 0) {
    alert("El correo ya está registrado.");
    return;
    }
    const newUser = { name, email, password, role };
    await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
    });alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
    });