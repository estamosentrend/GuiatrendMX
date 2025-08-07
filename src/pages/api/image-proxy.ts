import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Importante: no procesar el body, lo manejamos manualmente
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageUrl = req.query.url as string;

  if (!imageUrl) {
    console.error('Error: URL de la imagen no proporcionada.');
    return res.status(400).json({ error: 'URL de la imagen es requerida' });
  }

  console.log(`Proxy: Intentando cargar imagen desde: ${imageUrl}`);

  try {
    // Para evitar errores 403 de Google Photos/Drive, simulamos una petición de un navegador real.
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };
    if (imageUrl.includes('lh3.googleusercontent.com')) {
      headers['Referer'] = 'https://docs.google.com/';
    }

    const imageResponse = await fetch(imageUrl, {
      // Añadimos un timeout para que las peticiones no se queden colgadas
      signal: AbortSignal.timeout(15000), // 15 segundos
      headers: headers,
    });

    if (!imageResponse.ok) {
      console.error(`Proxy: Error al obtener la imagen desde ${imageUrl}. Status: ${imageResponse.status} - ${imageResponse.statusText}`);
      // Devolvemos el mismo código de estado que el servidor remoto
      return res.status(imageResponse.status).send(imageResponse.statusText);
    }

    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Proxy: La URL no apunta a una imagen válida. Content-Type: ${contentType}`);
      return res.status(400).json({ error: 'La URL no apunta a una imagen válida' });
    }

    console.log(`Proxy: Imagen cargada exitosamente. Content-Type: ${contentType}`);
    res.setHeader('Content-Type', contentType);
    
    // Usamos streaming para transferir los datos eficientemente
    if (imageResponse.body) {
      const reader = imageResponse.body.getReader();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
          } finally {
            controller.close();
            reader.releaseLock();
          }
        }
      });
      
      const response = new Response(readable);
      const blob = await response.blob();
      res.setHeader('Content-Length', blob.size);
      res.send(Buffer.from(await blob.arrayBuffer()));
    } else {
      res.status(500).send('El cuerpo de la respuesta de la imagen es nulo.');
    }

  } catch (error: unknown) {
    console.error('Proxy: Error crítico en el servidor:', error instanceof Error ? error.message : 'Error desconocido');
    if (error instanceof Error && error.name === 'AbortError') {
        console.error('Proxy: La petición a la imagen externa excedió el tiempo de espera (15s).');
        return res.status(408).send('Tiempo de espera agotado al cargar la imagen externa.');
    }
    res.status(500).json({ error: 'Error interno del servidor al procesar la imagen' });
  }
}