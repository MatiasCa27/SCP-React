# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Conectar con SCP-backend

El catálogo usa la API REST de [SCP-backend](https://github.com/Molotov-1/SCP-backend), bajo `/api/v1/scps`.
En desarrollo, si no se configura otra URL, React usa `http://localhost:8080`.

Para apuntar a otra instancia, crea `.env.local` en la raíz:

```env
VITE_API_URL=http://localhost:8080
```

En producción, configura `VITE_API_URL` como variable de entorno del despliegue (por ejemplo, en Vercel) con la URL pública del backend, sin `/api/v1/scps` al final.

El backend debe estar iniciado y configurado con PostgreSQL (`DB_URL`, `DB_USERNAME` y `DB_PASSWORD`). Sus endpoints de catálogo permiten listar, consultar, crear, editar, eliminar y actualizar el stock. Los productos deben incluir nombre, descripción, categoría, precio y stock; las imágenes se resuelven desde React por ID.

Los endpoints actuales del backend no implementan autenticación ni registro. El login/registro de esta app sigue siendo local y los roles guardados en el navegador no protegen las operaciones de administración en el servidor.

## Desarrollo

```sh
npm install
npm run dev
```

El servidor Vite usa normalmente `http://localhost:5173`, origen permitido por la configuración CORS del backend.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
