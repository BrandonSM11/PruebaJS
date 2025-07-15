📆
Reame
#
SPA de Gestión de Eventos
Una aplicación **Single Page Application (SPA)** moderna para gestión de eventos,
construida con HTML, JavaScript y Bootstrap, con roles de usuario y persistencia de datos
usando `json-server`.
##
🚀 Funcionalidades
* Autenticación de usuarios (login y registro).
* Dashboard con navegación SPA (sin recargar la página).
* Rol **admin**:
* Crear, editar y eliminar eventos.
* Rol **visitor**:
* Ver eventos disponibles.
* Registrarse en eventos (si hay cupos).
* Ver eventos donde está inscrito.
* Diseño moderno inspirado en Apple/Figma:
* Sidebar morado, avatar, botones violetas, inputs redondeados.
---
##
📂 Estructura del Proyecto
```
/public
├── auth/
│ ├── login.html
│ └── register.html
├── dashboard/
│ ├── dashboard.html ← SPA principal
│ ├── events/
│ │ ├── create.html
│ │ └── edit.html
└── not-found/
└── index.html
/img
└── avatar.png
style.css
```
---##
⚙️ Instalación rápida
1. Clona el repositorio o descarga el ZIP.
2. Instala `json-server` globalmente si no lo tienes:
```bash
npm install -g json-server
```
3. Crea un archivo `db.json` con usuarios y eventos:
```json
{
"users": [],
"events": []
}
```
4. Corre el servidor:
```bash
json-server --watch db.json --port 3000
```
5. Abre `public/auth/login.html` en tu navegador.
---
##
🧪 Datos de prueba
Puedes usar usuarios de ejemplo:
```json
{
"id": 1,
"name": "Brandon",
"email": "admin@mail.com",
"password": "1234",
"role": "admin"
}
{
"id": 2,
"name": "Usuario",
"email": "user@mail.com",
"password": "1234",
"role": "visitor"
}
```---
📬 Contacto
Hecho por Brandon Stiven Arredondo Muñoz
##
---
##
🛠 Tecnologías usadas
* HTML5
* CSS3 + Bootstrap 5
* JavaScript (modular, Vanilla JS)
* `json-server` como backend fake REST API
---
##
📦 Bonus
Incluye:
* Redirección si el usuario no está logueado
* SPA sin frameworks
* Validación de capacidad antes de inscribir
* Estilos inspirados en Figma 