# Ejemplos de autenticación con usuario y contraseña (Payload CMS)

## 1. Obtener token JWT con usuario y contraseña

Para acceder a los endpoints protegidos (incluyendo el chat IA), primero debes autenticarte y obtener un token JWT.

### Endpoint de login
`POST /api/users/login`

### Request Body
```json
{
  "email": "usuario@ejemplo.com",
  "password": "tu-contraseña"
}
```

### Ejemplo con `curl`
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "tu-contraseña"
  }' \
  http://localhost:3000/api/users/login
```

### Respuesta esperada
```json
{
  "user": {
    "id": "clwxyzuser123",
    "email": "usuario@ejemplo.com",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 2. Usar el token JWT para endpoints protegidos (ejemplo: chat IA)

Agrega el token en el header `Authorization`:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: JWT <tu-token>" \
  -d '{
    "conversationId": "clwxyz1234567890",
    "message": "¿Qué lugares turísticos recomiendas en Madrid?"
  }' \
  http://localhost:3000/api/ai/chat
```

---

## 3. Usar el token JWT en WebSocket (si está implementado)

Si tu WebSocket requiere autenticación, puedes enviar el token al conectar o en el primer mensaje:

### Ejemplo de mensaje inicial con token
```json
{
  "type": "auth",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

O bien, puedes incluir el token como query param en la URL:

```
ws://localhost:3000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## 4. Notas
- El endpoint de login es `/api/users/login` (por defecto en Payload CMS).
- El token JWT es necesario para acceder a endpoints protegidos y, opcionalmente, para WebSocket.
- Cambia los datos de ejemplo por los de tu usuario real.
- Consulta el README principal para detalles de seguridad y configuración.
