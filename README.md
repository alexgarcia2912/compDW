# Sistema de agenda de contactos

Aplicacion de agenda de contactos con backend en Node.js + Express + MongoDB y frontend en React + Vite.

## Requisitos

- Node.js 18 o superior
- npm
- MongoDB en local o una URI valida de MongoDB Atlas

## Estructura

- `BACK/`: API y conexion a base de datos
- `FRONT/`: interfaz web

## Variables de entorno

### Backend

Crea un archivo `BACK/.env` con valores similares a estos:

```dotenv
PORT=3001
MONGODB_URI=mongodb://neiradiego63_db_user:cnoOWubXNqLRPvJM@ac-mbys6gv-shard-00-00.kzbi209.mongodb.net:27017,ac-mbys6gv-shard-00-01.kzbi209.mongodb.net:27017,ac-mbys6gv-shard-00-02.kzbi209.mongodb.net:27017/?ssl=true&replicaSet=atlas-v3qv40-shard-0&authSource=admin&appName=userDB
JWT_SECRET=dev_jwt_secret_comp2_dw
```

### Frontend

Crea un archivo `FRONT/.env` con la URL de la API:

```dotenv
VITE_API_URL=http://localhost:3001/api
```

## Instalacion

1. Abre una terminal en la carpeta del proyecto.
2. Instala las dependencias del backend:

```bash
cd BACK
npm install
```

3. Instala las dependencias del frontend:

```bash
cd FRONT
npm install
```

## Ejecucion

### 1. Levantar el backend

En una terminal:

```bash
cd BACK
npm run dev
```

El servidor queda disponible en `http://localhost:3001`.

### 2. Levantar el frontend

En otra terminal:

```bash
cd FRONT
npm run dev
```

Por defecto Vite se ejecuta en `http://localhost:5173`.

## Uso

1. Abre el frontend en el navegador.
2. Registra un usuario o inicia sesion.
3. Crea, edita y elimina contactos desde la interfaz.

## Notas importantes

- El backend usa cookies httpOnly para la autenticacion, asi que el frontend debe consumir la API con credenciales habilitadas.
- Si cambias el puerto del backend, actualiza tambien `FRONT/.env`.
- Si usas MongoDB Atlas, sustituye `MONGODB_URI` por tu cadena de conexion completa.

## Scripts disponibles

### BACK

- `npm run dev`: inicia el servidor con recarga automatica

### FRONT

- `npm run dev`: inicia el entorno de desarrollo
- `npm run build`: genera la version de produccion
- `npm run lint`: revisa el codigo con ESLint
- `npm run preview`: previsualiza el build de produccion
