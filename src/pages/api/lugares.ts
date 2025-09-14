import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDestinosFromSheet, fetchLugaresByThematicCategory, normalizeString, Destino } from '@/lib/googleSheets';

// Mapa para almacenar lugares cacheados por ciudad y categoría temática
const lugaresCache = new Map<string, { data: Destino[]; timestamp: number }>();

// Duración de cache en segundos - 5 minutos (300 segundos) para detectar cambios rápidamente
const CACHE_DURATION_SECONDS = 300;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoria, ciudad, destacados, forceRefresh } = req.query;

  if (!categoria || !ciudad) {
    return res.status(400).json({ error: 'Faltan parámetros: categoria y ciudad son requeridos' });
  }

  try {
    // Generar clave de cache
    const cacheKey = `${normalizeString(ciudad as string)}:${normalizeString(categoria as string)}`;
    
    // Si forceRefresh es true, ignorar el cache y forzar recarga desde Google Sheets
    if (forceRefresh === 'true') {
      console.log(`Force refresh activado para: ${cacheKey} - Ignorando cache`);
    } else {
      // Verificar si hay datos en cache y si aún son válidos
      const cachedData = lugaresCache.get(cacheKey);
      if (cachedData) {
        const now = Date.now();
        const cacheAge = (now - cachedData.timestamp) / 1000;  // Edad del cache en segundos
        
        if (cacheAge < CACHE_DURATION_SECONDS) {
          console.log(`Usando cache para: ${cacheKey}`);
          return res.status(200).json(cachedData.data);
        } else {
          console.log(`Cache expirado para: ${cacheKey}`);
          lugaresCache.delete(cacheKey); // Eliminar datos expirados
        }
      }
    }
    
    // Si no hay cache válido o no hay cache, obtener datos de Google Sheets
    let lugares: Destino[] = [];
    
    // Lista de categorías principales que son hojas directas en Google Sheets
    const mainCategories = ['Destinos', 'Gastronomia', 'Hospedaje', 'Emergencias', 'Directorio', 'Servicios', 'Inmuebles', 'Promociones'];
    
    if (mainCategories.includes(categoria as string)) {
      // Para categorías principales, buscar solo en la hoja correspondiente
      lugares = await fetchDestinosFromSheet(
        process.env.GOOGLE_SHEETS_ID || '',
        categoria as string,
        ciudad as string,
        destacados === 'true'
      );
    } else {
      // Para categorías temáticas (Playas, Cultura, Vida Nocturna, etc.) y otras
      lugares = await fetchLugaresByThematicCategory(
        process.env.GOOGLE_SHEETS_ID || '',
        categoria as string,
        ciudad as string,
        destacados === 'true'
      );
    }
    
    // Guardar resultados en cache
    lugaresCache.set(cacheKey, {
      data: lugares,
      timestamp: Date.now()
    });
    console.log(`Guardado en cache: ${cacheKey}`);
    
    // Log para debugging
    console.log(`Raw lugares array for category '${categoria}' and city '${ciudad}':`, lugares);
    
    // Log para verificar URLs de imagen
    lugares.forEach((lugar, index) => {
      console.log(`[API] Lugar ${index + 1} - ${lugar.nombre}:`, {
        imagen: lugar.imagen,
        isValidUrl: typeof lugar.imagen === 'string' && lugar.imagen.trim() !== '' ? 'Valida' : 'Inválida o vacía'
      });
    });
    
    res.status(200).json(lugares);
  } catch (error) {
    console.error('Error en API de lugares:', error);
    res.status(500).json({ error: 'Error al obtener lugares', lugares: [] });
  }
}