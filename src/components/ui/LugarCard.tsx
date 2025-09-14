// src/components/ui/LugarCard.tsx
import React from "react";
import Image from "next/image";
import { FiMapPin, FiHeart, FiStar, FiPhone, FiGlobe, FiMessageCircle, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface LugarCardProps {
  nombre: string;
  imagen: string;
  descripcion: string;
  direccion: string;
  website?: string;
  telefono?: string;
  whatsapp?: string;
  precios?: string;
  horario?: string;
  mapa?: string;
  onWebClick?: (url: string) => void; // Cambiado para pasar la URL
  onMapClick?: (mapUrl: string) => void; // Cambiado para pasar la URL del mapa
  onWhatsAppClick?: (whatsappNumber: string) => void; // Nueva prop
  rating?: number;
  onImageClick?: () => void;
}

function getCategoriaHorario(horario?: string): 'abierto' | 'cerrado' | null {
  // Casos base
  if (!horario || /no disponible|NA/i.test(horario)) return null;
  if (/cerrado/i.test(horario)) return 'cerrado';
  if (/24\s*h|abierto\s*24/i.test(horario)) return 'abierto';

  // Extraer horas con una expresión regular.
  // Ejemplo: "9:00am - 6:00pm", "10:00 - 18:00"
  const match = horario.match(/(?:de\s)?(\d{1,2}:\d{2}(?:\s*(?:am|pm))?)\s*(?:a|-|hasta)\s*(\d{1,2}:\d{2}(?:\s*(?:am|pm))?)/i);
  if (!match) {
    // Si el formato no es un rango, no podemos determinar el estado.
    // Devolver null es más seguro para evitar información incorrecta.
    return null;
  }

  // Función para convertir "hh:mmAM/PM" o "HH:mm" a un objeto Date de hoy
  const parseTime = (timeStr: string) => {
    const now = new Date();
    const timePart = timeStr.toLowerCase();
    let hours: number;
    const minutes: number = parseInt(timePart.split(':')[1], 10);
    hours = parseInt(timePart.split(':')[0], 10);

    if (timePart.includes('pm') && hours !== 12) {
      hours += 12;
    } else if (timePart.includes('am') && hours === 12) {
      hours = 0; // Medianoche
    }
    
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  try {
    const horaApertura = parseTime(match[1]);
    const horaCierre = parseTime(match[2]);
    const horaActual = new Date();

    // Manejar horarios que cruzan la medianoche (ej. 8:00pm - 2:00am)
    if (horaCierre < horaApertura) {
      // Si la hora actual es después de la apertura O antes del cierre del día siguiente
      if (horaActual >= horaApertura || horaActual < horaCierre) {
        return 'abierto';
      }
    } else {
      // Horario normal en el mismo día
      if (horaActual >= horaApertura && horaActual < horaCierre) {
        return 'abierto';
      }
    }

    // Si no está en el rango, está cerrado
    return 'cerrado';

  } catch (err) {
    console.error("Error al parsear el horario:", horario, err);
    return null; // No mostrar estado si hay un error
  }
}

function extraerTags(descripcion: string, horario?: string): string[] {
  const tags: string[] = [];
  if (horario) tags.push(horario);
  // Extrae palabras clave de la descripción como actividades
  if (descripcion) {
    if (/concierto|evento/i.test(descripcion)) tags.push("Eventos");
    if (/museo|historia/i.test(descripcion)) tags.push("Cultura");
    if (/parque|aire libre/i.test(descripcion)) tags.push("Aire libre");
    if (/familia|niños/i.test(descripcion)) tags.push("Familiar");
    if (/deporte|correr|bicicleta/i.test(descripcion)) tags.push("Deporte");
    if (/gastronomía|comida|restaurante/i.test(descripcion)) tags.push("Gastronomía");
  }
  return tags;
}

// Función para validar si un valor es válido (no vacío, no NA, N/A, etc.)
function esValido(valor?: string): boolean {
  if (!valor) return false;
  const valorLimpio = valor.trim().toLowerCase();
  return valorLimpio !== '' && 
         valorLimpio !== 'na' && 
         valorLimpio !== 'n/a' && 
         valorLimpio !== 'no disponible' && 
         valorLimpio !== 'no aplica' &&
         valorLimpio !== 'sin información' &&
         valorLimpio !== 'pendiente';
}

// Función para validar si una URL es válida - Comentada: no se utiliza actualmente
// function isValidUrl(url: string): boolean {
//   try {
//     // Si la URL está vacía o es solo espacios, no es válida
//     if (!url || url.trim() === '') return false;
//
//     // Limpiar la URL de espacios adicionales
//     const cleanUrl = url.trim();
//
//     // Si no tiene un protocolo, asumimos que es una URL relativa o de dominio
//     // pero aún así intentamos construirla para validar
//     const urlToTest = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
//
//     // Probar si la URL es válida
//     const urlObj = new URL(urlToTest);
//
//     // Verificar que el protocolo sea http o https
//     if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
//       return false;
//     }
//
//     // Verificar que tenga un hostname válido
//     if (!urlObj.hostname || urlObj.hostname === '') {
//       return false;
//     }
//
//     // Verificar que no sea una URL de localhost o IP local para producción
//     if (urlObj.hostname === 'localhost' || urlObj.hostname.startsWith('192.168.') || urlObj.hostname.startsWith('10.')) {
//       return false;
//     }
//
//     return true;
//   } catch (error) {
//     // Si la URL no es válida, capturamos el error y devolvemos false
//     console.warn('URL inválida detectada:', url, error);
//     return false;
//   }
// };

const LugarCard: React.FC<LugarCardProps> = ({ nombre, imagen, descripcion, direccion, website, telefono, whatsapp, precios, horario, mapa, onWebClick, onMapClick, onWhatsAppClick, rating, onImageClick }) => {
  const categoria = getCategoriaHorario(horario);
  const tags = extraerTags(descripcion, horario);
  
  // Validar si cada campo tiene información válida
  const websiteValido = esValido(website);
  const telefonoValido = esValido(telefono);
  const whatsappValido = esValido(whatsapp);
  const mapaValido = esValido(mapa);
  return (
    <div className="glass-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-[#181C20]/80 border border-[var(--glass-border-light)] dark:border-[var(--glass-border-dark)] flex flex-col h-full">
      <div className="relative w-full h-56 md:h-64 rounded-t-2xl overflow-hidden cursor-pointer group">
        {/* Ícono de lightbox */}
        {onImageClick && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onImageClick(); }}
            className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-[#181C20]/80 text-primary-600 dark:text-primary-400 shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all"
            aria-label="Ver imagen en grande"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        )}
        {(() => {
          try {
            // Debug: Log de la URL de imagen
            console.log(`[LugarCard] Procesando imagen para ${nombre}:`, imagen);
            
            if (imagen && typeof imagen === 'string' && imagen.trim() !== '' && !imagen.includes('NA') && imagen.startsWith('http')) {
              return (
                <Image
                  src={imagen}
                  alt={nombre}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 border-4 border-[rgba(255,255,255,0.25)] dark:border-[#181C20]/80 rounded-t-2xl cursor-pointer"
                  onClick={onImageClick}
                  onError={(e) => {
                    console.log(`[LugarCard] Error al cargar imagen para ${nombre}:`, imagen);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.alt = 'Imagen no disponible';
                  }}
                  style={{ objectFit: 'cover' }}
                />
              );
            } else {
              console.log(`[LugarCard] Imagen no disponible para ${nombre}:`, imagen);
              return (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-2xl">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Imagen no disponible</span>
                </div>
              );
            }
          } catch (error) {
            console.error(`[LugarCard] Error al renderizar imagen para ${nombre}:`, error);
            return (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-2xl">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Error al cargar imagen</span>
              </div>
            );
          }
        })()}
        {/* Precios sobre la imagen */}
        {precios && precios.trim().toLowerCase() !== 'na' && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {precios.toLowerCase().includes('gratuito') || precios.toLowerCase().includes('gratis')
              ? 'Gratuito'
              : `Desde $${precios.replace(/[^\d\-]+/g, '')}`}
          </span>
        )}
        {(!precios || precios.trim().toLowerCase() === 'na') && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            $
          </span>
        )}
        {/* Badge de rating en la esquina superior derecha */}
        {typeof rating === 'number' && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col p-4 min-h-[220px] md:min-h-[260px]">
        {/* Badge de categoría solo si hay información */}
        {categoria && (
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                categoria === 'abierto'
                  ? 'bg-[#3DFFAB]/10 text-[#3DFFAB]'
                  : 'bg-red-500/10 text-red-500'
              }`}
            >
              <FiMapPin className="mr-1" /> {categoria === 'abierto' ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
        )}
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white truncate">{nombre}</h3>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-2 text-justify">{descripcion}</p>
        {/* Horario destacado en color especial si aplica */}
        {horario && !/NA|cerrado/i.test(horario) && (
          <p className="text-sm font-semibold mb-2" style={{ color: '#00FFFB' }}>{horario}</p>
        )}
        {/* Tags de horario y actividades (sin repetir horario) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.filter(tag => tag !== horario).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-lg text-xs font-medium bg-[#C5FF3D] text-[#2E3237]"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 break-words font-semibold"><span className="font-semibold">Dirección:</span> {direccion}</p>
        {/* Botones de acción */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          {/* Fila 1 */}
          {mapaValido ? (
            <button type="button" onClick={() => onMapClick && mapa && onMapClick(mapa)} className="btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg hover:bg-[#FF004F] hover:text-white dark:hover:bg-[#FF004F] transition-all">
              <FiMapPin /> Mapa
            </button>
          ) : (
            <button
              type="button"
              className="btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg transition-all"
              disabled={true}
              title="Mapa no disponible"
            >
              <FiMapPin /> Mapa
            </button>
          )}
          <button className="btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg hover:bg-[#FF004F] hover:text-white dark:hover:bg-[#FF004F] transition-all">
            <FiHeart /> Fav
          </button>
          <button className="btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg hover:bg-[#00FFFB] hover:text-[#2E3237] dark:hover:bg-[#00FFFB] dark:hover:text-[#2E3237] transition-all">
            <FiStar /> Itinerario
          </button>
          {/* Fila 2 */}
          <button
            type="button"
            onClick={() => websiteValido && website && onWebClick && onWebClick(website)}
            className={`btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg transition-all ${websiteValido ? 'hover:bg-[#FF004F] hover:text-white dark:hover:bg-[#FF004F]' : ''}`}
            disabled={!websiteValido}
            title={websiteValido ? 'Visitar sitio web' : 'Sitio web no disponible'}
          >
            <FiGlobe /> Web
          </button>
          <a
            href={telefonoValido ? `tel:${telefono}` : undefined}
            className={`btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg transition-all ${telefonoValido ? 'hover:bg-[#FF004F] hover:text-white dark:hover:bg-[#FF004F]' : ''} ${!telefonoValido ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-disabled={!telefonoValido}
            title={telefonoValido ? `Llamar a ${telefono}` : 'Teléfono no disponible'}
          >
            <FiPhone /> Tel
          </a>
          <button
            type="button"
            onClick={() => whatsappValido && whatsapp && onWhatsAppClick && onWhatsAppClick(whatsapp)}
            className={`btn-secondary flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg transition-all ${whatsappValido ? 'hover:bg-[#3DFFAB] hover:text-[#2E3237] dark:hover:bg-[#3DFFAB] dark:hover:text-[#2E3237]' : ''}`}
            disabled={!whatsappValido}
            title={whatsappValido ? 'Enviar WhatsApp' : 'WhatsApp no disponible'}
          >
            <FiMessageCircle /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LugarCard;