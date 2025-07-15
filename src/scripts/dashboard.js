 const user = JSON.parse(localStorage.getItem("user"));
 if (!user) {
     window.location.href = "/public/not-found/index.html";
 }
 document.getElementById("userName").textContent = user.name;
 document.getElementById("sidebarUserName").textContent = user.name;
 document.getElementById("sidebarRoles").textContent = user.role
 const eventsContainer = document.getElementById("events");
 const btnCreate = document.getElementById("btnCreate");
 if (user.role === "admin") {
     btnCreate.classList.remove("d-none");
     btnCreate.addEventListener("click", () => {
         window.location.href = "/public/dashboard/events/create.html";
     });
 }
 document.getElementById("logout").addEventListener("click", () => {
     localStorage.removeItem("user");
     window.location.href = "/public/auth/login.html";
 });
 document.getElementById("logoutSidebar").addEventListener("click", () => {
     localStorage.removeItem("user");
     window.location.href = "/public/auth/login.html";
 });
 async function loadEvents() {
     const res = await fetch("http://localhost:3000/events");
     const events = await res.json();
     eventsContainer.innerHTML = events.map(ev => `
 <div class="col-md-6">
 <div class="card p-3">
 <h5>${ev.title}</h5>
 <p><strong>Lugar:</strong> ${ev.location}</p>
 <p><strong>Cupos:</strong> ${ev.attendees?.length || 0}/${ev.capacity}</p>
 ${user.role === "admin" ? `
 <button class="btn btn-primary btn-sm me-2"
 onclick="editar(${ev.id})">Editar</button>
 <button class="btn btn-danger btn-sm"
 onclick="eliminar(${ev.id})">Eliminar</button>
 `: `
 <button class="btn btn-success btn-sm register-btn"
 data-id="${ev.id}">Registrarse</button>
 `}
 </div>
 </div>
 `).join("");
 }
 window.edit = (id) => {
     window.location.href = `/public/dashboard/events/edit.html?id=${id}`;
 };
 window.delete = async (id) => {
     if (confirm("¿Deseas eliminar este evento?")) {
         await fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" });
         loadEvents  ();
     }
 };
 document.addEventListener("click", async (e) => {
     if (e.target.classList.contains("register-btn")) {
         const eventId = e.target.dataset.id;
         const res = await fetch(`http://localhost:3000/events/${eventId}`);
         const ev = await res.json();
         if (!ev.attendees) ev.attendees = [];
         if (ev.attendees.includes(user.id)) {
             alert("Ya estás registrado.");
             return;
         }
         if (ev.attendees.length >= ev.capacity) {
             alert("Evento lleno.");
             return;
         }
         ev.attendees.push(user.id);
         await fetch(`http://localhost:3000/events/${eventId}`, {
             method: "PUT",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(ev)
         });
         alert("Te registraste con éxito.");
         loadEvents();
         showEventsRegistered(user.id);
     }
 });
 async function showEventsRegistered(userId) {
     const res = await fetch("http://localhost:3000/events");
     const events = await res.json();
     const registered = events.filter(ev => ev.attendees?.includes(userId)); 
     const list = registered.map(ev => `<li>${ev.title} - ${ev.location}</li>`).join("");
     document.getElementById("misEventos").innerHTML = `
 <h5>Tus eventos registrados:</h5>
 <ul>${list}</ul>
 `;
 }
 if (user.role === "visitor") {
    showEventsRegistered(user.id);
 }
 loadEvents();