# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URI` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Endpoints REST principales

La API RESTful de Payload expone automáticamente los endpoints para cada colección. Los principales endpoints disponibles en este proyecto son:

### Usuarios (`users`)
- `GET    /api/users` — Listar usuarios
- `POST   /api/users` — Crear usuario
- `GET    /api/users/:id` — Obtener usuario por ID
- `PATCH  /api/users/:id` — Actualizar usuario
- `DELETE /api/users/:id` — Eliminar usuario

### Media (`media`)
- `GET    /api/media` — Listar archivos multimedia
- `POST   /api/media` — Subir archivo
- `GET    /api/media/:id` — Obtener archivo por ID
- `PATCH  /api/media/:id` — Actualizar archivo
- `DELETE /api/media/:id` — Eliminar archivo

### Categorías (`categories`)
- `GET    /api/categories` — Listar categorías
- `POST   /api/categories` — Crear categoría
- `GET    /api/categories/:id` — Obtener categoría por ID
- `PATCH  /api/categories/:id` — Actualizar categoría
- `DELETE /api/categories/:id` — Eliminar categoría

### Lugares (`places`)
- `GET    /api/places` — Listar lugares turísticos
- `POST   /api/places` — Crear lugar
- `GET    /api/places/:id` — Obtener lugar por ID
- `PATCH  /api/places/:id` — Actualizar lugar
- `DELETE /api/places/:id` — Eliminar lugar

> Todos los endpoints aceptan filtros y paginación según la [documentación oficial de Payload](https://payloadcms.com/docs/rest-api/overview).

#### Ejemplo de uso con curl

```bash
# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456", "firstName": "Test", "lastName": "User"}'

# Listar lugares filtrando por categoría
curl "http://localhost:3000/api/places?where[category][equals]=<category_id>"

# Subir imagen (media)
curl -X POST http://localhost:3000/api/media \
  -F "file=@./ruta/imagen.jpg" \
  -F "title=Foto de prueba"
```

#### Autenticación
- El login se realiza vía `/api/users/login` (Payload Auth).
- Para endpoints protegidos, usa el token JWT recibido en el login:
  ```bash
  curl -H "Authorization: JWT <token>" http://localhost:3000/api/users/me
  ```

#### Filtros y paginación
- Puedes filtrar por cualquier campo usando la sintaxis `where[campo][operador]=valor`.
- Ejemplo: `?where[userType][equals]=business`
- Soporta paginación: `?limit=10&page=2`

#### Endpoints personalizados (futuros)
- `/api/auth/login`, `/api/auth/register`, `/api/search/places`, `/api/ai/chat`, etc.
- Consulta el archivo `DISEÑO_BACKEND_UNIFICADO.txt` para la lista completa de endpoints planeados.

## Esquema de la Base de Datos

```mermaid
erDiagram
    USERS {
        string id
        string email
        string password
        string firstName
        string lastName
        string phone
        date dateOfBirth
        string profileImage (rel: MEDIA)
        boolean isActive
        date lastLogin
        number loginAttempts
        boolean isBlocked
        enum userType (user|business|admin)
        group travelPreferences
        group contactPreferences
        group businessData (solo business)
        array favoritesList (rel: PLACES)
    }
    
    MEDIA {
        string id
        string title
        string alt
        string caption
        string description
        group contentInfo
        array tags
        enum category
        boolean isPublic
        boolean isApproved
        group usageStats
        string uploadedBy (rel: USERS)
    }

    CATEGORIES {
        string id
        string name
        string slug
        string description
        string icon
        string color
        string image (rel: MEDIA)
        string parentCategory (rel: CATEGORIES)
        boolean isActive
        number sortOrder
        string seoTitle
        string seoDescription
    }

    PLACES {
        string id
        string name
        string slug
        string description
        string shortDescription
        string category (rel: CATEGORIES)
        string subcategory
        array tags
        group location
        array images (rel: MEDIA)
        array videos (rel: MEDIA)
        string virtualTour
        group pricing
        array schedule
        group accessibility
        array features
        group statistics
        string businessOwner (rel: USERS)
        array relatedPlaces (rel: PLACES)
        enum status
        boolean isActive
        boolean isFeatured
        boolean isVerified
        date verificationDate
    }

    USERS ||--o{ MEDIA : profileImage
    USERS ||--o{ CATEGORIES : favoriteCategories
    USERS ||--o{ PLACES : favoritesList
    MEDIA }o--|| USERS : uploadedBy
    CATEGORIES ||--o| MEDIA : image
    CATEGORIES ||--o| CATEGORIES : parentCategory
    PLACES ||--o| CATEGORIES : category
    PLACES ||--o{ MEDIA : images
    PLACES ||--o{ MEDIA : videos
    PLACES ||--o| USERS : businessOwner
    PLACES ||--o{ PLACES : relatedPlaces
```

> Este diagrama muestra las colecciones principales y sus relaciones. Para detalles completos, consulta el archivo `DISEÑO_BACKEND_UNIFICADO.txt`.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
