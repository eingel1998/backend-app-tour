# 🔐 VARIABLES DE ENTORNO PARA RENDER
# Copia estas variables una por una en el dashboard de Render

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