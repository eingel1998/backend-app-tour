# 🔐 GUÍA DE SEGURIDAD - VARIABLES DE ENTORNO

## 📋 ESTRUCTURA DE ARCHIVOS

```
├── .env                    # ❌ LOCAL SOLAMENTE - NO SUBIR A GIT
├── .env.example           # ✅ Plantilla sin secretos reales
├── .env.production.example # ✅ Plantilla para producción
├── RENDER-ENV-VARS.md     # ✅ Variables listas para copiar
└── .gitignore             # ✅ Incluye .env
```

## 🚨 REGLAS DE SEGURIDAD

### ❌ NUNCA HACER:
- Subir `.env` con secretos reales a Git
- Compartir `PAYLOAD_SECRET` en mensajes/emails
- Usar el mismo secret en desarrollo y producción
- Dejar credenciales en comentarios de código

### ✅ SIEMPRE HACER:
- Usar `.env.example` como plantilla
- Generar secrets únicos para cada entorno
- Verificar que `.env` esté en `.gitignore`
- Rotar secrets periódicamente

## 🔄 FLUJO DE TRABAJO

### 📝 **DESARROLLO LOCAL:**
1. Copia `.env.example` → `.env`
2. Completa con valores reales de desarrollo
3. Nunca hagas commit de `.env`

### 🚀 **DEPLOYMENT EN RENDER:**
1. Abre `RENDER-ENV-VARS.md`
2. Copia cada variable al dashboard de Render
3. Genera nuevo `PAYLOAD_SECRET` para producción
4. Actualiza `NEXT_PUBLIC_SERVER_URL` con tu dominio real

## 🛡️ VERIFICACIÓN DE SEGURIDAD

### Comando para verificar que .env no se suba:
```powershell
git status
# .env NO debe aparecer en la lista
```

### Comando para verificar .gitignore:
```powershell
git check-ignore .env
# Debe devolver: .env
```

## 🔧 GENERADORES DE SECRETS

### PAYLOAD_SECRET (32 caracteres):
- https://randomkeygen.com/
- https://1password.com/password-generator/
- PowerShell: `[System.Web.Security.Membership]::GeneratePassword(32, 0)`

### Ejemplo de secret seguro:
```
KmN9p2R5sY8xA3dF6hJ4kL7mP0qS1tV6
```

## 📞 EN CASO DE COMPROMISO

Si accidentalmente subes secretos a Git:

1. **Cambia TODOS los secretos inmediatamente**
2. **Genera nuevos PAYLOAD_SECRET**
3. **Actualiza variables en Render**
4. **Considera hacer git rebase** para eliminar historial
5. **Notifica al equipo si es proyecto colaborativo**

---

⚠️ **RECUERDA**: La seguridad es responsabilidad de todos. Mantén tus secretos seguros.
