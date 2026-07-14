# Agenda Pro

Sistema web de agenda de contactos desarrollado como proyecto académico full stack. Permite registrar usuarios, iniciar y cerrar sesión, proteger rutas mediante JWT y administrar contactos con un CRUD completo.

## Tecnologías

- Frontend: React 19, React Router, Axios, Tailwind CSS y DaisyUI.
- Backend: Node.js, Express 5 y arquitectura por capas.
- Base de datos: MongoDB con Mongoose.
- Seguridad: JWT en cookie `httpOnly`, contraseñas cifradas con bcrypt y CORS configurado.
- Evidencias: Postman, Git/GitHub y [prototipo Figma](https://www.figma.com/design/bhvBCFngjIwzz24xFUV0qN/CP2---Agenda-de-Contactos---Prototipo?node-id=0-1&t=IhbpnMPNfIqo8TbP-1)
## Funcionalidades

- Registro, inicio de sesión, restauración de sesión y cierre de sesión.
- Rutas privadas en React y middleware de autenticación en Express.
- Crear, listar, consultar, actualizar y eliminar contactos.
- Cada usuario accede únicamente a sus propios contactos mediante la relación `Contact.owner -> User._id`.
- Formularios controlados y validaciones en frontend, middleware y modelos de MongoDB.
- Manejo centralizado de errores, rutas inexistentes y estados de carga/vacío/error.

## Arquitectura

```text
BACK/src/
├── config/          # conexión MongoDB
├── controllers/     # lógica de autenticación y contactos
├── middleware/      # JWT, validaciones y errores
├── models/          # esquemas User y Contact
├── routes/          # definición de endpoints REST
└── utils/           # AppError y asyncHandler

FRONT/src/
├── api/             # cliente Axios
├── components/      # navegación, formularios y rutas protegidas
├── context/         # estado global de autenticación
└── pages/           # dashboard y páginas del CRUD
```

## Modelo de datos

### User

| Campo | Tipo | Reglas |
|---|---|---|
| nombre | String | requerido, 2–80 caracteres |
| correo | String | requerido, único, minúsculas |
| password | String | hash bcrypt, no se devuelve en consultas |

### Contact

| Campo | Tipo | Reglas |
|---|---|---|
| nombre | String | requerido |
| telefono | String | requerido |
| correo | String | requerido, minúsculas |
| empresa | String | opcional, máximo 100 |
| notas | String | opcional, máximo 500 |
| owner | ObjectId | requerido, referencia a User e indexado |

La separación en dos colecciones evita duplicar datos de usuario y establece una relación uno-a-muchos.

## Instalación

Requisitos: Node.js 18+, npm y MongoDB local o Atlas.

```bash
cd BACK
npm install
copy .env.example .env

cd ../FRONT
npm install
copy .env.example .env
```

Variables del backend:

```dotenv
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/agenda_pro
JWT_SECRET=cambia_esta_clave
NODE_ENV=development
CLIENT_URLS=http://localhost:5173,http://127.0.0.1:5173
```

## Ejecución

En terminales diferentes:

```bash
cd BACK
npm run dev

cd FRONT
npm run dev -- --port 5173
```

Opcionalmente se pueden crear datos demostrativos:

```bash
cd BACK
npm run seed
```

## API REST

Base local: `http://127.0.0.1:3001/api`

| Método | Endpoint | Descripción | Privado |
|---|---|---|---|
| GET | `/health` | estado del servidor | No |
| POST | `/auth/register` | registrar usuario | No |
| POST | `/auth/login` | iniciar sesión | No |
| GET | `/auth/me` | validar JWT y obtener usuario | Sí |
| POST | `/auth/logout` | cerrar sesión | Sí/No |
| GET | `/contacts` | listar contactos propios | Sí |
| GET | `/contacts/:id` | consultar contacto propio | Sí |
| POST | `/contacts` | crear contacto | Sí |
| PUT | `/contacts/:id` | actualizar contacto | Sí |
| DELETE | `/contacts/:id` | eliminar contacto | Sí |

## Evidencias de entrega

- Figma: enlace incluido en este README.
- Postman: importar `postman/Agenda-Pro.postman_collection.json` y su environment local.
- Base de datos: `BACK/scripts/seed.js` y `database/contacts.sample.json`.
- Repositorio GitHub: [alexgarcia2912/compDW](https://github.com/alexgarcia2912/compDW).

La colección Postman utiliza la cookie JWT almacenada automáticamente por Postman. Ejecuta primero Registro o Login y después las solicitudes de Contactos en orden.

## Integrantes

- Integrante 1: completar nombre y participación.
- Integrante 2: completar nombre y participación.
- Integrante 3: completar nombre y participación.
