# 🚀 VARIABLES DE ENTORNO PARA RENDER (PRODUCCIÓN)
# 📋 Copia estas EXACTAMENTE en el dashboard de Render: Environment Variables

# ===== 🔑 VARIABLES BÁSICAS =====
PAYLOAD_SECRET=72ea41c8ce968039c5f483a8
DATABASE_URI=file:./production-database.db

# ===== 🌐 CONFIGURACIÓN DE SERVIDOR =====
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://backend-app-tour.onrender.com
PORT=10000

# ===== 🔧 CONFIGURACIÓN DE APLICACIÓN =====
NODE_OPTIONS=--no-deprecation
CORS_ORIGINS=https://backend-app-tour.onrender.com

# ===== 📊 PARA MONITOREO Y LOGS =====
LOG_LEVEL=info

# ===== 🔒 SEGURIDAD =====
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# ===== 🤖 INTEGRACIONES DE IA (OPCIONAL) =====
# Descomenta según necesites:
# OPENAI_API_KEY=sk-your-openai-key-here
# ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# ===== 📧 CONFIGURACIÓN SMTP (OPCIONAL) =====
# Descomenta y configura según necesites:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=tu-email@gmail.com
# SMTP_PASS=tu-app-password

# ===== 🎯 CONFIGURACIÓN ESPECÍFICA PAYLOAD (OPCIONAL) =====
# PAYLOAD_ADMIN_EMAIL=admin@tuapp.com
# PAYLOAD_ADMIN_PASSWORD=tu-password-seguro

---

## 📋 INSTRUCCIONES PARA COPIAR A RENDER

### 🔥 **FORMATO COPIA/PEGA DIRECTO**

1. **Ve a Render Dashboard > Tu Servicio > Environment**
2. **Copia cada línea (sin el #) directamente:**

```
PAYLOAD_SECRET=72ea41c8ce968039c5f483a8
DATABASE_URI=file:./production-database.db
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://backend-app-tour.onrender.com
PORT=10000
NODE_OPTIONS=--no-deprecation
CORS_ORIGINS=https://backend-app-tour.onrender.com
LOG_LEVEL=info
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### 🎯 **VARIABLES OPCIONALES** (Solo si las necesitas)
```
OPENAI_API_KEY=sk-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
PAYLOAD_ADMIN_EMAIL=admin@tuapp.com
PAYLOAD_ADMIN_PASSWORD=tu-password-seguro
```

### ⚠️ **IMPORTANTE**
- Cambiar `backend-app-tour` por el nombre real de tu app en Render
- Si necesitas las opcionales, descomenta y configura con valores reales

## 🚨 OBLIGATORIAS (Copiar exactamente como está)

**NODE_ENV**
```
production
```

**PAYLOAD_SECRET** ⚠️ (Generar nuevo secret único)
```
KmN9p2R5sY8xA3dF6hJ4kL7mP0qS1tV6
```

**DATABASE_URI**
```
file:./production-database.db
```

**NEXT_PUBLIC_SERVER_URL** (Cambiar 'tu-app-name' por el nombre real)
```
https://tu-app-name.onrender.com
```

## 📋 RECOMENDADAS

**NODE_OPTIONS**
```
--no-deprecation
```

**PORT**
```
10000
```

**CORS_ORIGINS** (Actualizar con tu dominio real)
```
https://tu-app-name.onrender.com
```

## 🔧 OPCIONALES (Solo si las necesitas)

**OPENAI_API_KEY** (Si usas IA)
```
sk-your-openai-key-here
```

**ANTHROPIC_API_KEY** (Si usas Claude)
```
sk-ant-your-anthropic-key-here
```

**SMTP_HOST** (Si envías emails)
```
smtp.gmail.com
```

**SMTP_PORT**
```
587
```

**SMTP_USER**
```
tu-email@gmail.com
```

**SMTP_PASS**
```
tu-app-password
```

---

## 📋 INSTRUCCIONES PARA RENDER

1. **Ve a tu servicio en Render Dashboard**
2. **Click en "Environment"**
3. **Por cada variable de arriba:**
   - Click "Add Environment Variable"
   - Key: [nombre de la variable]
   - Value: [valor sin las comillas]
   - Click "Save"

## ⚠️ IMPORTANTE
- **PAYLOAD_SECRET**: Genera uno nuevo en https://randomkeygen.com/
- **NEXT_PUBLIC_SERVER_URL**: Cambia 'tu-app-name' por el nombre real de tu servicio
- **CORS_ORIGINS**: Actualiza con tu dominio real cuando lo tengas