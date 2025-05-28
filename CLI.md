
# 🚀 CLI Generador de Features y Entidades

Este proyecto incluye un sistema de generación de archivos mediante comandos CLI para agilizar la creación de módulos como controladores, rutas, DTOs, entidades, etc.

## 📁 Estructura del CLI

```
cli/
├── generators/
│   ├── feature.generator.js       ← Generador para módulos comunes
│   └── entity.generator.js        ← Generador para módulos con entidad y servicio
├── templates/
│   ├── controller.template
│   ├── dto.template
│   ├── entity.template
│   ├── middleware.template
│   ├── route.template
│   └── service.template
```

## 🛠️ Comandos disponibles

En el archivo `package.json` se definen los siguientes scripts:

```json
"scripts": {
  "cli:generate": "node cli/cli-generator.js"
}
```

> ⚠️ Asegúrate de tener los archivos `.template` correctamente configurados dentro de `cli/templates/`.

## 📌 Uso

### ➕ Generar una feature (sin entidad ni servicio)

Crea automáticamente:
- Ruta (`routes/`)
- Controlador (`controllers/`)
- Middleware (`middlewares/`)
- DTO (`dto/`)

```bash
npm run cli:generate feature nombre
```

**Ejemplo:**

```bash
npm run cli:generate feature email
```

Esto generará:
```
src/
├── controllers/email.controller.ts
├── dto/email.dto.ts
├── middlewares/email.middleware.ts
└── routes/email.routes.ts
```

---

### 🧱 Generar una entidad (con DTO, controller, service, etc.)

Crea todo lo anterior más:
- Servicio (`services/`)
- Entidad (`entities/`)

```bash
npm run cli:generate entity nombre
```

**Ejemplo:**

```bash
npm run cli:generate entity car
```

Esto generará:
```
src/
├── controllers/car.controller.ts
├── dto/car.dto.ts
├── entities/car.entity.ts
├── middlewares/car.middleware.ts
├── routes/car.routes.ts
└── services/car.service.ts
```

---

## 🧩 Plantillas personalizadas

Cada archivo generado se basa en una plantilla que puede contener variables como:

- `__Name__` → Nombre con la primera letra en mayúscula (`Car`)
- `__name__` → Nombre en minúscula (`car`)

Estas variables son reemplazadas automáticamente en los archivos generados.

> Puedes modificar las plantillas ubicadas en `cli/templates/` para adaptarlas a tu estilo de código.

---

## ✅ Recomendaciones

- Asegúrate de que las carpetas `src/routes`, `src/controllers`, `src/services`, `src/middlewares`, `src/dto`, y `src/entities` existen o serán creadas automáticamente.
- Usa nombres simples en minúscula para los comandos (ej. `car`, `user`, `email`).
- Revisa que los archivos generados sigan tu patrón de arquitectura y estructura del proyecto.
