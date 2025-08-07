// src/lib/googleSheets.ts

export interface Destino {
  ciudad: string;
  nombre: string;
  imagen: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  horario: string;
  precios: string;
  telefono: string;
  whatsapp: string;
  website: string;
  mapa: string;
  [key: string]: string | number | boolean; // Add index signature to allow dynamic property access for thematic columns
}

// Lista de hojas que contienen datos de lugares y columnas temáticas
const THEMATIC_SHEETS = [
  'Destinos',
  'Gastronomia',
  'Hospedaje',
  'Emergencias',
  'Directorio',
  'Servicios',
  'Inmuebles',
  'Promociones',
];

// Función de normalización para nombres de cadenas (ej. categorías, ciudades, headers)
export function normalizeString(str: string): string {
  return str
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quita tildes
        .trim()
        .toLowerCase()
    : '';
}

/**
 * Lee y filtra datos de una Google Sheet pública.
 * @param sheetId ID de la hoja de cálculo
 * @param sheetName Nombre de la pestaña/hoja
 * @param ciudad Ciudad a filtrar
 * @param categoria Categoría a filtrar (ej: "Destinos")
 */
export async function fetchDestinosFromSheet(sheetId: string, sheetName: string, ciudad: string, destacadosOnly?: boolean): Promise<Destino[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?alt=json&key=${process.env.GOOGLE_SHEETS_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo acceder a la hoja de cálculo: ${sheetName}`);
  const data = await res.json();
  if (!data.values || !Array.isArray(data.values)) return []; // Retorna array vacío si no hay datos

  const [headers, ...rows] = data.values;
  const destinos: Destino[] = rows.map((row: string[]) => {
    const obj: Record<string, string | number | boolean> = {};
    headers.forEach((h: string, i: number) => {
      const key = h.trim().toLowerCase();
      obj[key] = row[i] || '';
    });
    obj.ciudad = obj['ciudad'] || ''; // Alias explícito para compatibilidad frontend
    return obj as Destino;
  });


  // Filtrar por ciudad si se proporciona
  let filteredDestinos = destinos;
  if (ciudad) {
    filteredDestinos = destinos.filter(d => {
      // Explicitly normalize both sides of the comparison to be extra robust
      const normalizedSheetCity = (d.ciudad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-\s]/g, '').toLowerCase();
      const normalizedQueryCity = (ciudad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-\s]/g, '').toLowerCase();
      return normalizedSheetCity === normalizedQueryCity;
    });
  }
  
  let finalResults = filteredDestinos;
  if (destacadosOnly) {
    finalResults = finalResults.filter(lugar => {
      const destacadosValue = (lugar['destacados'] || '').toString();
      return destacadosValue.trim().toLowerCase() === 'x';
    });
  }

  return finalResults;
}

/**
 * Lee y filtra datos de múltiples Google Sheets por una categoría temática.
 * @param sheetId ID de la hoja de cálculo
 * @param thematicCategory Categoría temática a filtrar (ej: "Playas", "Cultura")
 * @param ciudad Ciudad a filtrar (opcional)
 */
export async function fetchLugaresByThematicCategory(sheetId: string, thematicCategory: string, ciudad?: string, destacadosOnly?: boolean): Promise<Destino[]> {
  let allLugares: Destino[] = [];
  const normalizedThematicCategory = normalizeString(thematicCategory);

  for (const sheetName of THEMATIC_SHEETS) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?alt=json&key=${process.env.GOOGLE_SHEETS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`No se pudo acceder a la hoja de cálculo: ${sheetName}. Saltando...`);
        continue;
      }
      const data = await res.json();
      if (!data.values || !Array.isArray(data.values)) {
        console.warn(`Formato de hoja inválido para ${sheetName}. Saltando...`);
        continue;
      }

      const [headers, ...rows] = data.values;

      const sheetLugares: Destino[] = rows.map((row: string[]) => {
        const obj: Record<string, string | number | boolean> = {};
        headers.forEach((h: string, i: number) => {
          const key = normalizeString(h);
          obj[key] = (row[i] || '').toString().trim();
        });
        obj.ciudad = obj['ciudad'] || '';
        return obj as Destino;
      });
      allLugares = allLugares.concat(sheetLugares);
    } catch (err) {
      console.error(`Error al procesar la hoja ${sheetName}:`, err);
    }
  }

  // Filtrar por la columna temática y por ciudad si se proporciona
  let filteredLugares = allLugares.filter(lugar => {
    const thematicColumnKey = normalizedThematicCategory;
    const columnValue = lugar[thematicColumnKey];

    console.log(`
--- Debugging Thematic Category Filter ---`);
    console.log(`Thematic Category (normalized): '${thematicColumnKey}'`);
    console.log(`Lugar Name: '${lugar.nombre}'`);
    console.log(`Lugar City: '${lugar.ciudad}'`);
    console.log(`All keys in lugar object:`, Object.keys(lugar));
    console.log(`Value for '${thematicColumnKey}': '${columnValue}'`);
    console.log(`--- End Debugging ---
`);

    // Verificar si la columna temática existe y tiene un valor '1' (o 'TRUE' si Google Sheets lo convierte)
    // Se usa trim() y toUpperCase() para ser más robusto con los valores de la hoja
    // También se añade Number() para manejar casos donde Google Sheets podría devolver un número
    const columnValueStr = columnValue?.toString() || '';
    return columnValue && (columnValue === '1' || columnValueStr.toUpperCase() === 'TRUE' || Number(columnValue) === 1);
  });

  if (ciudad) {
    filteredLugares = filteredLugares.filter(lugar => {
      // Explicitly normalize both sides of the comparison to be extra robust
      const normalizedSheetCity = (lugar.ciudad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-\s]/g, '').toLowerCase();
      const normalizedQueryCity = (ciudad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-\s]/g, '').toLowerCase();
      return normalizedSheetCity === normalizedQueryCity;
    });
  }

  // Eliminar duplicados basados en una combinación de nombre y ciudad para evitar mostrar el mismo lugar si aparece en varias hojas
  // Usar lugar.nombre y lugar.ciudad (lowercase) para la clave de unicidad
  const uniqueLugares = Array.from(new Map(filteredLugares.map(l => [`${normalizeString(l.nombre)}-${normalizeString(l.ciudad)}`, l])).values());

  let finalResults = uniqueLugares;
  if (destacadosOnly) {
    finalResults = finalResults.filter(lugar => {
      const destacadosValue = (lugar['destacados'] || '').toString();
      return destacadosValue.trim().toLowerCase() === 'x';
    });
  }

  return finalResults;
}
