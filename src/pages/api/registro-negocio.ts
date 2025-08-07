import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Permite procesar FormData
  },
};

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

  try {
    // Obtener FormData del cuerpo de la petición
    const formData = await new Promise<FormData>((resolve, reject) => {
      const chunks: Buffer[] = [];
      
      req.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const formData = new FormData();
        
        // Parsear manualmente el FormData (simplificado)
        const text = buffer.toString('utf-8');
        const boundary = text.split('\r\n')[0];
        const parts = text.split(boundary).slice(1, -1);
        
        parts.forEach(part => {
          const [headers, ...contentParts] = part.split('\r\n\r\n');
          const content = contentParts.join('\r\n\r\n');
          
          const disposition = headers.match(/Content-Disposition: form-data; name="([^"]+)"/);
          if (disposition) {
            const name = disposition[1];
            
            // Si es un archivo, extraer información
            const filenameMatch = headers.match(/filename="([^"]+)"/);
            if (filenameMatch) {
              const filename = filenameMatch[1];
              const contentType = headers.match(/Content-Type: (.+)/)?.[1] || 'application/octet-stream';
              
              // Crear un objeto File simulado
              const file = new File([content], filename, { type: contentType });
              formData.set(name, file as any);
            } else {
              // Es un campo de texto normal
              formData.set(name, content.trim());
            }
          }
        });
        
        resolve(formData);
      });
      
      req.on('error', reject);
    });

    // Extraer datos del FormData
    const nombreNegocio = formData.get('nombreNegocio') as string;
    const categoria = formData.get('categoria') as string;
    const descripcion = formData.get('descripcion') as string;
    const contactoNombre = formData.get('contactoNombre') as string;
    const contactoEmail = formData.get('contactoEmail') as string;
    const contactoTelefono = formData.get('contactoTelefono') as string;
    const calle = formData.get('calle') as string;
    const numeroExterior = formData.get('numeroExterior') as string;
    const numeroInterior = formData.get('numeroInterior') as string;
    const colonia = formData.get('colonia') as string;
    const ciudad = formData.get('ciudad') as string;
    const estado = formData.get('estado') as string;
    const codigoPostal = formData.get('codigoPostal') as string;
    const horario = formData.get('horario') as string;
    const rangoPrecios = formData.get('rangoPrecios') as string;
    const website = formData.get('website') as string;
    const redesSociales = formData.get('redesSociales') as string;
    const logo = formData.get('logo') as File;
    const imagenes = formData.getAll('imagenes') as File[];

    // Validación básica de los campos
    if (!nombreNegocio || !categoria || !descripcion || !contactoNombre || 
        !contactoEmail || !contactoTelefono || !calle || !colonia || 
        !ciudad || !codigoPostal || !horario || !rangoPrecios) {
      return res.status(400).json({ message: 'Todos los campos marcados con * son obligatorios', success: false });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactoEmail)) {
      return res.status(400).json({ message: 'El formato del email no es válido', success: false });
    }

    // Procesar archivos si existen
    let logoUrl = '';
    let imagenesUrls: string[] = [];

    // Aquí normalmente se subirían los archivos a un servicio de almacenamiento
    // Por ahora, solo mostraremos información en los logs
    if (logo) {
      console.log('Logo recibido:', logo.name, logo.size, logo.type);
      // logoUrl = await uploadFile(logo);
    }

    if (imagenes.length > 0) {
      console.log('Imágenes recibidas:', imagenes.length);
      imagenes.forEach((img, index) => {
        console.log(`Imagen ${index + 1}:`, img.name, img.size, img.type);
        // imagenesUrls.push(await uploadFile(img));
      });
    }

    // El email al que se enviará el mensaje
    const recipientEmail = process.env.EMAIL_RECIPIENT || 'estamosentrend@gmail.com';

    // Construir dirección completa
    const direccionCompleta = [
      calle,
      numeroExterior,
      numeroInterior && `Int. ${numeroInterior}`,
      colonia,
      ciudad,
      estado,
      codigoPostal
    ].filter(Boolean).join(', ');

    const mailOptions = {
      from: `"${contactoNombre}" <${contactoEmail}>`,
      to: recipientEmail,
      subject: `Nuevo registro de negocio: ${nombreNegocio}`,
      text: `Has recibido un nuevo registro de negocio:\n\n` +
            `Información del Negocio:\n` +
            `  Nombre: ${nombreNegocio}\n` +
            `  Categoría: ${categoria}\n` +
            `  Descripción: ${descripcion}\n\n` +
            `Información de Contacto:\n` +
            `  Nombre: ${contactoNombre}\n` +
            `  Email: ${contactoEmail}\n` +
            `  Teléfono: ${contactoTelefono}\n\n` +
            `Dirección:\n` +
            `  ${direccionCompleta}\n\n` +
            `Información Adicional:\n` +
            `  Horario: ${horario}\n` +
            `  Rango de Precios: ${rangoPrecios}\n` +
            `  Website: ${website || 'No proporcionado'}\n` +
            `  Redes Sociales: ${redesSociales || 'No proporcionado'}\n\n` +
            `Archivos Adjuntos:\n` +
            `  Logo: ${logo ? logo.name : 'No proporcionado'}\n` +
            `  Imágenes: ${imagenes.length} archivo(s)\n\n` +
            `Fecha de registro: ${new Date().toLocaleString('es-MX')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">Nuevo Registro de Negocio</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Desde Guía Trend</p>
          </div>
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Información del Negocio</h3>
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombreNegocio}</p>
              <p style="margin: 8px 0;"><strong>Categoría:</strong> ${categoria}</p>
              <p style="margin: 8px 0;"><strong>Descripción:</strong></p>
              <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea;">
                ${descripcion.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Información de Contacto</h3>
              <p style="margin: 8px 0;"><strong>Nombre:</strong> ${contactoNombre}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${contactoEmail}" style="color: #667eea;">${contactoEmail}</a></p>
              <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${contactoTelefono}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Dirección</h3>
              <p style="margin: 8px 0; line-height: 1.5;">${direccionCompleta}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Información Adicional</h3>
              <p style="margin: 8px 0;"><strong>Horario:</strong> ${horario}</p>
              <p style="margin: 8px 0;"><strong>Rango de Precios:</strong> ${rangoPrecios}</p>
              <p style="margin: 8px 0;"><strong>Website:</strong> ${website ? `<a href="${website}" style="color: #667eea;">${website}</a>` : 'No proporcionado'}</p>
              <p style="margin: 8px 0;"><strong>Redes Sociales:</strong></p>
              <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea;">
                ${redesSociales ? redesSociales.replace(/\n/g, '<br>') : 'No proporcionado'}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Archivos Adjuntos</h3>
              <p style="margin: 8px 0;"><strong>Logo:</strong> ${logo ? logo.name : 'No proporcionado'}</p>
              <p style="margin: 8px 0;"><strong>Imágenes:</strong> ${imagenes.length} archivo(s)</p>
              ${imagenes.length > 0 ? imagenes.map((img, index) => `<p style="margin: 5px 0 5px 20px;">• ${img.name}</p>`).join('') : ''}
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
              <p>Este registro fue enviado desde el formulario de registro de Guía Trend</p>
              <p>${new Date().toLocaleString('es-MX')}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar el email
    console.log('Enviando email de registro a:', recipientEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de registro enviado:', info.messageId);

    // Enviar confirmación al usuario
    const userMailOptions = {
      from: `"Guía Trend" <${process.env.EMAIL_USER || 'noreply@guiatrend.com'}>`,
      to: contactoEmail,
      subject: 'Confirmación de registro en Guía Trend',
      text: `Hola ${contactoNombre},\n\n` +
            `Gracias por registrar tu negocio "${nombreNegocio}" en Guía Trend.\n\n` +
            `Hemos recibido tu solicitud y nuestro equipo la revisará en las próximas 24 horas. Una vez validada la información, tu negocio aparecerá en nuestra plataforma.\n\n` +
            `Si tienes alguna pregunta, no dudes en contactarnos.\n\n` +
            `Saludos,\n` +
            `El equipo de Guía Trend`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">¡Gracias por registrarte!</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Guía Trend</p>
          </div>
          <div style="background: white; padding: 25px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #333; margin-bottom: 20px;">Hola <strong>${contactoNombre}</strong>,</p>
            
            <p style="color: #333; margin-bottom: 15px;">Gracias por registrar tu negocio <strong>"${nombreNegocio}"</strong> en Guía Trend.</p>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; margin-bottom: 20px;">
              <p style="color: #333; margin: 0; font-size: 14px;">Hemos recibido tu solicitud y nuestro equipo la revisará en las próximas 24 horas. Una vez validada la información, tu negocio aparecerá en nuestra plataforma.</p>
            </div>
            
            <p style="color: #333; margin-bottom: 20px;">Si tienes alguna pregunta, no dudes en contactarnos a través de nuestro formulario de contacto.</p>
            
            <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">Saludos,<br/>El equipo de Guía Trend</p>
              <p style="color: #666; font-size: 11px; margin: 5px 0 0 0;">${new Date().toLocaleDateString('es-MX')}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar email de confirmación al usuario
    await transporter.sendMail(userMailOptions);
    console.log('Email de confirmación enviado a:', contactoEmail);

    res.status(200).json({ 
      message: 'Registro enviado con éxito. Te enviaremos un email de confirmación.',
      success: true 
    });

  } catch (error: any) {
    console.error('Error al procesar el registro:', error);
    
    res.status(500).json({ 
      message: 'Error al procesar el registro. Por favor, intenta nuevamente más tarde.',
      success: false 
    });
  }
}