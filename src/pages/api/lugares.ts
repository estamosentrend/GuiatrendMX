// src/pages/api/lugares.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchDestinosFromSheet, fetchLugaresByThematicCategory, Destino, normalizeString } from '@/lib/googleSheets';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;

// Lista de categorías temáticas que se buscarán en las columnas de las hojas
const THEMATIC_CATEGORIES = [
  'Playas',
  'Cultura',
  'Familiar',
  'Aventura',
  'Vida Nocturna',
  'Shopping',
  'Romance',
  'Turismo',
];

// Función para limpiar campos (reemplazo de la función eliminada)
function limpiarCampo(valor: string): string | undefined {
  if (!valor || valor.trim() === '' || valor.trim().toUpperCase() === 'NA') return undefined;
  return valor;
}

// La función normalizeString ahora se importa de googleSheets.ts para consistencia

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const ciudad = typeof req.query.ciudad === 'string' ? req.query.ciudad : '';
  const categoria = typeof req.query.categoria === 'string' ? req.query.categoria : 'Destinos';
  const destacadosOnly = req.query.destacados === 'true';

  try {
    // Determinar si la categoría solicitada es una temática
    const isThematicCategory = THEMATIC_CATEGORIES.some(
      (tc) => normalizeString(tc) === normalizeString(categoria)
    );

    let lugares: Destino[];
    if (isThematicCategory) {
      // Si es una categoría temática, usar la nueva función que busca en múltiples hojas
      lugares = await fetchLugaresByThematicCategory(SHEET_ID, categoria, ciudad, destacadosOnly);
    } else {
      // Si es una categoría tradicional (ej. Destinos, Gastronomia), usar la función existente
      const sheetName = normalizeString(categoria); // Asume que el nombre de la hoja es la categoría
      lugares = await fetchDestinosFromSheet(SHEET_ID, sheetName, ciudad, destacadosOnly);
    }

    // Log the raw 'lugares' array received from googleSheets.ts for debugging
    console.log(`Raw lugares array for category '${categoria}' and city '${ciudad}':`, lugares);

    const resultado = lugares.map((d: Destino) => {
      const obj: Record<string, string | undefined> = {
        // Asegurar que nombre y ciudad siempre sean strings, incluso si están vacíos
        nombre: (d["nombre"] || d["Nombre"] || '').toString().trim(),
        ciudad: (d["ciudad"] || d["Ciudad"] || '').toString().trim(),
        
        // Otros campos pueden usar limpiarCampo si undefined es un estado deseado
        imagen: limpiarCampo((d["imagen"] || d["Imagen"] || '').toString()),
        categoria: limpiarCampo((d["categoria"] || d["Categoría"] || '').toString()),
        descripcion: limpiarCampo((d["descripcion"] || d["Descripción"] || '').toString()),
        direccion: limpiarCampo((d["direccion"] || d["Dirección"] || '').toString()),
        horario: limpiarCampo((d["horario"] || d["Horario"] || '').toString()),
        precios: limpiarCampo((d["precios"] || d["Precios"] || '').toString()),
        telefono: limpiarCampo((d["telefono"] || d["Teléfono"] || '').toString()),
        whatsapp: limpiarCampo((d["whatsapp"] || d["WhatsApp"] || '').toString()),
        website: limpiarCampo((d["website"] || d["Website"] || '').toString()),
        mapa: limpiarCampo((d["mapa"] || d["Mapa"] || '').toString()),
      };
      // Eliminar solo los campos que son explícitamente undefined por limpiarCampo
      Object.keys(obj).forEach(k => { 
        if (obj[k] === undefined) {
          delete obj[k]; 
        }
      });
      return obj;
    });
    res.status(200).json(resultado);
  } catch (error: unknown) {
    console.error('Error en la API de lugares:', error);
    res.status(500).json({ error: (error as Error).message || 'Error interno del servidor' });
  }
}