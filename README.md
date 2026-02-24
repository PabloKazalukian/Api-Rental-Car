# 🚗Car Rental Car System

Este proyecto es una aplicación web para gestionar alquileres de coches.

## 🧵UML Rental Car System

| Car                     | User                                                   | Request                                       | Payment                        | Discount                            |
| ----------------------- | ------------------------------------------------------ | --------------------------------------------- | ------------------------------ | ----------------------------------- |
| - id: INT               | - id: INT                                              | - id: INT                                     | - id: INT                      | - id: INT                           |
| - image: VARCHAR        | - username: VARCHAR                                    | - amount: FLOAT                               | - paidDate: DATE               | - codeDiscount: VARCHAR             |
| - brand: VARCHAR        | - password: VARCHAR                                    | - initialDate: DATE                           | - createdTime: TIMESTAMP       | - initialDate: DATE                 |
| - model: VARCHAR        | - email: VARCHAR                                       | - finalDate: DATE                             | - automatic: ENUM('YES', 'NO') | - expirationDate: DATE              |
| - year: INT             | - type: ENUM('LOCAL', 'GOOGLE', 'GITHUB', 'MICROSOFT') | - state: ENUM('REQUEST', 'CONFIRM', 'CANCEL') | - request_id: INT              | - type: ENUM('PERCENTAGE', 'FIXED') |
| - price: FLOAT          | - role: ENUM('ADMIN', 'USER')                          | - user_id: INT                                | - createdAt: TIMESTAMP         | - percentage: FLOAT                 |
| - engine: VARCHAR       | - createdAt: TIMESTAMP                                 | - car_id: INT                                 | - updatedAt: TIMESTAMP         | - amount: FLOAT                     |
| - power: VARCHAR        | - updatedAt: TIMESTAMP                                 | - createdAt: TIMESTAMP                        |                                | - status: BOOLEAN                   |
| - torque: VARCHAR       |                                                        | - updatedAt: TIMESTAMP                        |                                | - request_id: INT                   |
| - weight: VARCHAR       |                                                        |                                               |                                | - createdAt: TIMESTAMP              |
| - max_speed: VARCHAR    |                                                        |                                               |                                | - updatedAt: TIMESTAMP              |
| - acceleration: VARCHAR |                                                        |                                               |                                |                                     |
| - consumption: VARCHAR  |                                                        |                                               |                                |                                     |
| - createdAt: TIMESTAMP  |                                                        |                                               |                                |                                     |
| - updatedAt: TIMESTAMP  |                                                        |                                               |                                |                                     |

## 🪡 Diagrama de Entidades

![Diagrama del Proyecto](assets/UML_entities.png)

> [!NOTE]
> El diagrama anterior representa las entidades principales y sus relaciones dentro del dominio del sistema.

## 🛣️ Recorrido de un pedido a la Api

El flujo de una solicitud sigue los principios de Clean Architecture:

`Cliente (HTTP) -> Routes -> Controller -> Use Cases -> Repositories/Gateways -> Domain Entities`

1.  **Routes**: Punto de entrada que define el endpoint y aplica middlewares.
2.  **Controller**: Gestiona la entrada/salida HTTP y delega la lógica al caso de uso.
3.  **UseCase**: Contiene la lógica de aplicación pura.
4.  **Repository/Gateway**: Implementación de infraestructura para persistencia o servicios externos.
5.  **Entities**: Modelos de dominio que representan las reglas de negocio.

## 🚀 Instrucciones para Empezar

Este proyecto está estructurado siguiendo una **Arquitectura de Capas** inspirada en **Clean Architecture**, respetando los principios **SOLID**. Esto garantiza una separación clara de responsabilidades, facilidad de mantenimiento y escalabilidad.

### 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes componentes:

- **Node.js** (versión 18.x o superior recomendada)
- **npm** (versión 8.x o superior)
- **MySQL** (versión 5.7 o superior)
- **Redis** (para la capa de caché)

### 🛠️ Pasos para la Instalación

1. **Clonar el Repositorio**

    ```bash
    git clone https://github.com/tu-usuario/api-rental-car.git
    cd api-rental-car
    ```

2. **Instalar Dependencias**

    ```bash
    npm install
    ```

3. **Configurar la Base de Datos y Redis**
    - Configura el archivo `.env` basado en `.env.example`:

        ```env
        DB_HOST=localhost
        DB_PORT=3306
        DB_USERNAME=root
        DB_PASSWORD=secret
        DB_DATABASE=car_rental

        REDIS_HOST=localhost
        REDIS_PORT=6379
        ```

4. **Ejecutar Migraciones**

    ```bash
    npm run m:run
    ```

5. **Iniciar el Servidor**
    ```bash
    npm run start:dev
    ```

## 🌟 Características del Proyecto

- **Clean Architecture & SOLID**: Estructura modular que desacopla la lógica de negocio de los detalles de infraestructura.
- **IoC Container (Inversion of Control)**: Contenedor de dependencias personalizado para gestionar el ciclo de vida de los servicios y facilitar el testing.
- **Cache con Redis**: Implementación de una capa de caché para optimizar consultas y mejorar la velocidad de respuesta en `src/infrastructure/cache`.
- **TypeORM**: Gestión robusta de la base de datos relacional con migraciones y entidades.
- **Autenticación con Passport**: Protege las rutas mediante estrategias como **JWT** y soporte para login social.
- **DTOs & Mappers**: Validación estricta de datos de entrada y transformación fluida entre capas.
- **CLI Generator**: Herramienta personalizada para generar automáticamente la estructura de nuevos módulos (entidades, servicios, controladores, etc.).

## 📂 Estructura de Carpetas

### `/src/domain`

Contiene la lógica esencial del negocio y las definiciones de contratos.

- `/entities`: Modelos de negocio puros.
- `/interface`: Definición de contratos (interfaces) para servicios, repositorios y middlewares.
- `/value-objects`: Objetos que definen atributos del dominio con lógica propia.

### `/src/application`

Orquestación de la lógica de aplicación.

- `/use-case`: Implementación de los casos de uso (ej: Login, Crear Pedido).
- `/dtos`: Data Transfer Objects para validación de entrada.
- `/mappers`: Transformación de datos entre infraestructura y dominio.
- `/middlewares`: Lógica transversal (auth, validación) desacoplada de la infraestructura.

### `/src/infrastructure`

Detalles de implementación técnica y frameworks.

- `/di`: Configuración del contenedor de dependencias (IoC).
- `/db`: Configuración de TypeORM, entidades de DB y migraciones.
- `/cache`: Cliente y lógica de Redis.
- `/gateways`: Implementaciones concretas de interfaces (repositorios, proveedores de email).
- `/interfaces/http`: Punto de contacto con el exterior (Controllers y Routes).

### `/src/shared`

Utilidades, constantes y decoradores reutilizables en todo el proyecto.

## 🏗️ Inyección de Dependencias (IoC)

El proyecto utiliza un sistema de **Inversión de Control** manual para garantizar el desacoplamiento:

1.  **Container** (`src/infrastructure/di/container.ts`): Gestiona el registro de clases, factories y singletons.
2.  **Configuración** (`src/infrastructure/di/config-container.ts`): Centraliza la inicialización de todas las dependencias del proyecto.
3.  **Resolución**: Las rutas resuelven sus controladores a través del contenedor, asegurando que todas las dependencias (servicios, casos de uso, repositorios) se inyecten correctamente.

```typescript
// Ejemplo de registro en config-container.ts
Container.registerSingleton<ICarRepository>('ICarRepository', CarRepository);
Container.registerFactory<ICarController>('ICarController', () => {
    const carRepository = Container.resolve<ICarRepository>('ICarRepository');
    return new CarController(carRepository, httpResponse);
});
```

# 🚀 CLI Generador de Features y Entidades

Este proyecto incluye un sistema de generación de archivos mediante comandos CLI para agilizar la creación de módulos como controladores, rutas, DTOs, entidades, etc.

## 📁 Estructura del CLI

```
cli/
├── generators/
│   ├── entity.generator.js        ← Generador para módulos con entidad (entity + service + repositorio)
│   └── feature.generator.js       ← Generador para módulos comunes (controller + middleware + route)
├── templates/
│   ├── controller-entity.template ← Controller orientado a entidades
│   ├── controller-feature.template← Controller para features simples
│   ├── dto.template               ← Plantilla de DTO
│   ├── entity-db.template         ← Plantilla de entidad de base de datos
│   ├── entity-domain.template     ← Plantilla de entidad de dominio
│   ├── interface-repo.template    ← Interfaz del repositorio
│   ├── mapper.template            ← Mapper de entidades
│   ├── middleware.template        ← Middleware genérico
│   ├── repository.template        ← Repositorio concreto
│   └── route.template             ← Definición de rutas
├── utils/
│   ├── factory-injector.js        ← Inyección automática en factories
│   ├── factory-utils.js           ← Funciones auxiliares para modificar factories
│   ├── file-utils.js              ← Funciones para crear/editar archivos
│   ├── cli-generators.js          ← Registro central de generadores CLI
│   ├── generate.js                ← Punto de entrada CLI
│   └── open-features.js           ← Utilidad para abrir features disponibles

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
