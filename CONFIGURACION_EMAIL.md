# Configuración del Formulario de Contacto

## Estado Actual
✅ **El formulario está funcionando correctamente** - Los datos se reciben y se muestran en la consola del servidor.

## Para enviar correos reales

### Paso 1: Activar 2FA en tu cuenta Gmail
1. Ve a https://myaccount.google.com/
2. Sección "Seguridad"
3. Activa "Verificación en dos pasos"
4. Sigue los pasos para configurar tu método preferido

### Paso 2: Generar Contraseña de Aplicación
1. En la misma sección de seguridad, busca "Contraseñas de aplicaciones"
2. Si no ves esta opción, necesitarás activarla primero
3. Haz clic en "Crear contraseña"
4. Selecciona "Otra (nombre personalizado)"
5. Dale un nombre como "GuiaTrend Contacto"
6. Copia la contraseña generada (será una de 16 caracteres)

### Paso 3: Configurar variables de entorno
Abre el archivo `.env.local` y descomenta las líneas:

```env
# Tu correo Gmail (debe tener 2FA activado)
EMAIL_USER=tu-correo@gmail.com

# Contraseña de aplicación de Gmail (la que generaste en el paso 2)
EMAIL_PASS=contraseña-de-16-caracteres

# Email al que se enviarán los mensajes
EMAIL_RECIPIENT=estamosentrend@gmail.com
```

### Paso 4: Reemplaza los valores
- `tu-correo@gmail.com` → Tu correo Gmail actual
- `contraseña-de-16-caracteres` → La contraseña que generaste en el paso 2
- `estamosentrend@gmail.com` → Puedes cambiarlo si prefieres otro correo

### Paso 5: Reinicia el servidor
Después de guardar los cambios, reinicia el servidor de desarrollo:

```bash
npm run dev
```

## Verificación
1. Envía un mensaje desde el formulario
2. Deberías recibir un correo en la dirección que configuraste en `EMAIL_RECIPIENT`
3. El correo tendrá el diseño profesional de Guía Trend

## Problemas comunes
- **Error de autenticación**: Verifica que la contraseña de aplicación sea correcta
- **Correo no llega**: Revisa la carpeta de spam en Gmail
- **Límite de envíos**: Gmail tiene límites diarios, si envías muchos correos podrías necesitar una solución profesional

## Alternativa: Servicios de Email Transaccional
Si prefieres no usar Gmail, considera servicios como:
- **Resend**: https://resend.com (muy fácil de configurar)
- **SendGrid**: https://sendgrid.com
- **Brevo**: https://brevo.com

Estos servicios están diseñados para envíos masivos y tienen mejores tasas de entrega.