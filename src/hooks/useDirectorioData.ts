import { useState, useEffect } from 'react';

export interface DirectorioItem {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  website?: string;
  horario: string;
  imagen: string;
  estado: string;
  whatsapp?: string;
  mapa?: string;
  precios?: string; // Añadido para corregir el error de tipo
}

export function useDirectorioData(ciudad: string, categoria?: string) {
  const [data, setData] = useState<DirectorioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Si no se especifica categoría, usar "Destinos" como predeterminado
    const finalCategoria = categoria || 'Destinos';
    fetch(`/api/lugares?categoria=${finalCategoria}&ciudad=${encodeURIComponent(ciudad)}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar la información');
        return res.json();
      })
      .then((items: DirectorioItem[]) => {
        setData(items);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, [ciudad, categoria]);

  return { data, loading, error };
} 