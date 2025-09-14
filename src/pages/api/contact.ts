// src/pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: true, // Permite procesar el body de la petición
  },
};

// Configuración del transporter de Nodemailer
// Las credenciales se obtendrán de las variables de entorno
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para verificar si las credenciales son válidas
const validateCredentials = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { valid: false, error: 'Credenciales no configuradas' };
  }
  
  if (process.env.EMAIL_USER === 'tu-correo@gmail.com' || process.env.EMAIL_PASS === 'tu-contraseña-de-aplicación') {
    return { valid: false, error: 'Credenciales son valores de ejemplo' };
  }
  
  return { valid: true };
};

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido', success: false });
  }

  const { name, email, message } = req.body;

  // Validación básica de los campos
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios', success: false });
  }

  // Opcional: Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'El formato del email no es válido', success: false });
  }

  try {
    // El email al que se enviará el mensaje
    const recipientEmail = process.env.EMAIL_RECIPIENT || 'estamosentrend@gmail.com';

    // Si estamos en modo desarrollo o no hay credenciales configuradas, guardar los datos en la consola
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('=== DATOS DE CONTACTO (Modo Desarrollo) ===');
      console.log('Nombre:', name);
      console.log('Email:', email);
      console.log('Mensaje:', message);
      console.log('==============================================');
      console.log('¡Formulario funcionando! Los datos se muestran arriba.');
      console.log('Para enviar emails reales, configura EMAIL_USER y EMAIL_PASS en .env.local');
      console.log('==============================================');
      
      return res.status(200).json({
        message: '¡Mensaje recibido con éxito! Te responderemos lo antes posible a tu correo.',
        success: true
      });
    }

    // Validar credenciales para producción
    const credentials = validateCredentials();
    if (!credentials.valid) {
      console.error('Error de credenciales:', credentials.error);
      return res.status(500).json({
        message: 'El formulario de contacto está temporalmente deshabilitado. Por favor, contacta directamente a estamosentrend@gmail.com',
        success: false
      });
    }

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: recipientEmail,
      subject: `Nuevo mensaje de contacto desde Guía Trend: ${name}`,
      text: `Has recibido un nuevo mensaje de contacto:\n\n` +
            `Nombre: ${name}\n` +
            `Email: ${email}\n\n` +
            `Mensaje:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">Nuevo mensaje de contacto</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Desde Guía Trend</p>
          </div>
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Información del contacto</h3>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
            </div>
            <div>
              <h3 style="color: #333; margin-bottom: 10px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
              <p>Este mensaje fue enviado desde el formulario de contacto de Guía Trend</p>
              <p>${new Date().toLocaleString('es-MX')}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar el email
    console.log('Enviando email a:', recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);

    res.status(200).json({
      message: 'Mensaje enviado con éxito. Te responderemos lo antes posible.',
      success: true
    });
  } catch (error: unknown) {
    console.error('Error al enviar el email:', error);
    
    let errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.';
    
    // Analizar el tipo de error específico
    if (error instanceof Error) {
      console.error('Detalles del error:', {
        message: error.message,
        code: (error as { code?: string }).code,
        response: (error as { response?: unknown }).response,
        stack: error.stack
      });
      
      // Mensajes de error más específicos
      if ((error as { code?: string }).code === 'EAUTH') {
        errorMessage = 'Error de autenticación. Verifica que tu correo y contraseña de aplicación sean correctos.';
      } else if ((error as { code?: string }).code === 'ETIMEDOUT') {
        errorMessage = 'Tiempo de espera agotado. Por favor, intenta nuevamente más tarde.';
      } else if (error.message.includes('blocked') || error.message.includes('spam')) {
        errorMessage = 'El email fue bloqueado por filtros de spam. Por favor, contacta directamente a estamosentrend@gmail.com';
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = 'Has excedido el límite de envíos de Gmail. Por favor, intenta nuevamente más tarde.';
      }
    }
    
    res.status(500).json({
      message: errorMessage,
      success: false
    });
  }
}