'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiMapPin } from 'react-icons/fi';
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../ui/MapView"), { ssr: false });
import Modal from "../ui/Modal";
import LugarCard from "../ui/LugarCard";
import WebsiteModal from "../ui/WebsiteModal";
import ImageLightbox from "../ui/ImageLightbox";
import Image from "next/image";
import useSWR from 'swr';

interface Lugar {
  nombre: string;
  ciudad: string;
  imagen: string;
  categoria?: string;
  descripcion?: string;
  direccion?: string;
  horario?: string;
  precios?: string;
  telefono?: string;
  whatsapp?: string;
  website?: string;
  mapa?: string;
}

interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
}

const ciudades = [
  {
    key: 'monterrey',
    nombre: 'Monterrey',
    imagen: '/images/Monterrey.webp',
    descripcion: 'Monterrey, la tercera ciudad más grande de México, es un vibrante centro industrial y cultural rodeado de majestuosas montañas. Destaca por su moderna infraestructura, museos, parques urbanos, gastronomía norteña y una animada vida nocturna. Es ideal para el turismo de aventura, negocios y cultura.'
  },
  {
    key: 'guadalajara',
    nombre: 'Guadalajara',
    imagen: '/images/guadalajara.webp',
    descripcion: 'Guadalajara, la Perla Tapatía, es famosa por su cultura, mariachi, tequila y arquitectura colonial. Es un destino vibrante con museos, plazas, gastronomía y tradiciones únicas.'
  },
  {
    key: 'cdmx',
    nombre: 'CDMX',
    imagen: '/images/cdmx.webp',
    descripcion: 'La Ciudad de México, capital del país, es un mosaico de historia, cultura, gastronomía y modernidad. Destacan sus museos, barrios tradicionales, parques y una vibrante vida urbana.'
  },
  {
    key: 'cancun',
    nombre: 'Cancún',
    imagen: '/images/cancun.webp',
    descripcion: 'Cancún es el paraíso del Caribe mexicano, famoso por sus playas de arena blanca, aguas turquesa, vida nocturna, zonas arqueológicas y parques naturales únicos.'
  },
  {
    key: 'palenque',
    nombre: 'Palenque',
    imagen: '/images/palenque.webp',
    descripcion: 'Palenque es un destino mágico en Chiapas, famoso por su impresionante zona arqueológica maya, selva exuberante, cascadas y cultura ancestral.'
  },
  {
    key: 'puerto-vallarta',
    nombre: 'Puerto Vallarta',
    imagen: '/images/puerto-vallarta.webp',
    descripcion: 'Puerto Vallarta es un destino de playa icónico en la costa del Pacífico, famoso por su malecón, playas, vida nocturna, gastronomía y ambiente tradicional mexicano.'
  },
  {
    key: 'veracruz',
    nombre: 'Veracruz',
    imagen: '/images/Veracruz.webp',
    descripcion: 'Veracruz es un puerto histórico y alegre del Golfo de México, famoso por su malecón, tradiciones, gastronomía, playas y calidez de su gente.'
  },
  {
    key: 'otros',
    nombre: 'Otros',
    imagen: '',
    descripcion: '',
    disabled: true
  },
];

// Coordenadas para cada ciudad
const cityCoords: Record<string, { lat: number; lon: number }> = {
  monterrey: { lat: 25.6866, lon: -100.3161 },
  guadalajara: { lat: 20.6597, lon: -103.3496 },
  cdmx: { lat: 19.4326, lon: -99.1332 },
  cancun: { lat: 21.1619, lon: -86.8515 },
  palenque: { lat: 17.5094, lon: -91.9823 },
  'puerto-vallarta': { lat: 20.6534, lon: -105.2253 },
  veracruz: { lat: 19.1738, lon: -96.1342 },
};

function ClimaCiudad({ ciudadKey }: { ciudadKey: string }) {
  const coords = cityCoords[ciudadKey];
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_days=1&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo obtener el clima.');
        setLoading(false);
      });
  }, [ciudadKey, coords]);

  if (!coords) return null;

  return (
    <div className="mt-6 mb-4 rounded-2xl glass-card p-4 text-center">
      <h4 className="text-lg font-semibold mb-2 text-[var(--color-text-dark)] dark:text-white flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-[#3DFFAB]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 15h8M12 8v7" /></svg>
        Clima actual
      </h4>
      {loading && <div className="text-gray-500 dark:text-gray-400">Cargando clima...</div>}
      {error && <div className="text-red-500 dark:text-red-400">{error}</div>}
      {weather && weather.current && (
        <div className="flex flex-col md:flex-row md:justify-center md:gap-8 items-center text-base md:text-lg">
          <div className="mb-2 md:mb-0">
            <span className="font-bold text-primary-600 dark:text-primary-400">{weather.current.temperature_2m}°C</span> <span className="text-gray-500">Temperatura</span>
          </div>
          <div className="mb-2 md:mb-0">
            <span className="font-bold text-primary-600 dark:text-primary-400">{weather.current.relative_humidity_2m ?? '--'}%</span> <span className="text-gray-500">Humedad</span>
          </div>
          <div>
            <span className="font-bold text-primary-600 dark:text-primary-400">{weather.current.wind_speed_10m} km/h</span> <span className="text-gray-500">Viento</span>
          </div>
        </div>
      )}
      {weather && weather.hourly && (
        <div className="mt-4">
          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pronóstico por hora (hoy)</h5>
          <div className="flex overflow-x-auto gap-2 scrollbar-bubble py-1">
            {weather.hourly.time.slice(0, 12).map((t: string, idx: number) => (
              <div key={t} className="min-w-[70px] bg-white/60 dark:bg-[#181C20]/40 rounded-lg p-2 text-xs flex flex-col items-center">
                <span className="font-bold text-primary-600 dark:text-primary-400">{String(new Date(t).getHours()).padStart(2, '0')}:00</span>
                <span>{weather.hourly.temperature_2m[idx]}°C</span>
                <span className="text-[10px] text-gray-500">{weather.hourly.relative_humidity_2m[idx]}% hum</span>
                <span className="text-[10px] text-gray-500">{weather.hourly.wind_speed_10m[idx]} km/h</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Función fetcher para useSWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DestinosModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [ciudadActiva, setCiudadActiva] = useState(ciudades[0].key);
  const ciudad = ciudades.find(c => c.key === ciudadActiva);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [websiteModalUrl, setWebsiteModalUrl] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Construir la URL de la API para SWR
  const apiUrl = open ? `/api/lugares?ciudad=${encodeURIComponent(ciudadActiva)}&destacados=true` : null;

  // Usar useSWR para la carga de datos
  const { data: lugares, isLoading, error } = useSWR<Lugar[]>(apiUrl, fetcher);

  // Los lugares ya vienen filtrados por ciudad desde la API, no es necesario un filtro adicional aquí
  const lugaresFiltrados = Array.isArray(lugares) ? lugares : [];

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-all">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-5xl xl:max-w-6xl mx-auto my-8 mt-24 rounded-3xl shadow-2xl bg-white/70 dark:bg-[#181C20]/60 border border-white/30 dark:border-gray-800/60 backdrop-blur-lg overflow-hidden animate-fade-in">
            {/* Encabezado fijo */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-[#181C20]/90 border-b border-white/20 dark:border-gray-800/40">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary w-6 h-6" />
                <h2 className="text-xl font-bold text-[var(--color-text-dark)] dark:text-white">Destinos</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiX className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
            {/* Pestañas de ciudades */}
            <div className="px-2 py-3 grid grid-cols-2 gap-2 sm:grid-cols-4 border-b border-white/10 dark:border-gray-800/30 bg-transparent">
              {ciudades.map((c) => (
                <button
                  key={c.key}
                  onClick={() => !c.disabled && setCiudadActiva(c.key)}
                  disabled={c.disabled}
                  className={`px-3 py-2 min-w-[120px] rounded-full font-medium transition-all duration-200 text-sm whitespace-normal break-words text-center
                ${c.disabled
                  ? 'bg-gray-200 dark:bg-[#181C20] text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60'
                  : ciudadActiva === c.key
                    ? 'bg-[#FF004F] text-white shadow-md'
                    : 'bg-white/40 dark:bg-[#181C20]/30 text-gray-700 dark:text-gray-200 hover:bg-[#FF004F] hover:text-white'}
              `}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
            {/* Cuerpo del modal */}
            <div className="p-6 max-h-[70vh] overflow-y-auto hide-vertical-scrollbar">
              {/* Imagen de cabecera */}
              <div className="w-full h-40 md:h-96 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 relative">
                {/* Ícono de lightbox en la cabecera */}
                {ciudad?.imagen && (
                  <button
                    type="button"
                    onClick={() => setLightboxImg(ciudad.imagen)}
                    className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-[#181C20]/80 text-primary-600 dark:text-primary-400 shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all"
                    aria-label="Ver imagen en grande"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75 21 21m-6-6A6.75 6.75 0 1 0 8.25 8.25a6.75 6.75 0 0 0 6.75 6.75Z" />
                    </svg>
                  </button>
                )}
                <Image
                  src={ciudad?.imagen || ''}
                  alt={ciudad?.nombre || ''}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Descripción */}
              <p className="text-base text-gray-800 dark:text-gray-200 mb-6 text-justify">
                {ciudad?.descripcion}
              </p>
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="w-full lg:w-1/2">
                  <ClimaCiudad ciudadKey={ciudad?.key || ''} />
                </div>
                <div className="w-full lg:w-1/2 flex items-stretch">
                  <MapView
                    key={`${ciudadActiva}-${cityCoords[ciudadActiva]?.lat}-${cityCoords[ciudadActiva]?.lon}`}
                    lat={cityCoords[ciudadActiva]?.lat || 0}
                    lng={cityCoords[ciudadActiva]?.lon || 0}
                    cityName={ciudad?.nombre || ''}
                    showExpandButton={true}
                    onExpand={() => setIsMapOpen(true)}
                    height="100%"
                  />
                </div>
              </div>
              {/* Tarjetas de lugares dinámicas */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[var(--color-text-dark)] dark:text-white text-center">Lugares destacados en {ciudad?.nombre}</h3>
                {isLoading ? (
                  <div className="text-center text-gray-400 dark:text-gray-500 py-8">Cargando lugares...</div>
                ) : error ? (
                  <div className="text-center text-red-500 dark:text-red-400 py-8">Error al cargar lugares: {error.message}</div>
                ) : lugaresFiltrados.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-gray-500 py-8">No hay lugares registrados para esta ciudad.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lugaresFiltrados.map((lugar, idx) => (
                      <LugarCard
                        key={idx}
                        nombre={lugar.nombre}
                        imagen={lugar.imagen}
                        descripcion={lugar.descripcion || ''}
                        direccion={lugar.direccion || ''}
                        website={lugar.website}
                        telefono={lugar.telefono}
                        whatsapp={lugar.whatsapp}
                        precios={lugar.precios}
                        horario={lugar.horario}
                        mapa={lugar.mapa}
                        onWebClick={lugar.website ? () => setWebsiteModalUrl(lugar.website!) : undefined}
                        onMapClick={lugar.mapa ? () => setWebsiteModalUrl(lugar.mapa!) : undefined}
                        onImageClick={() => setLightboxImg(lugar.imagen)}
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* Pie de página con botones */}
              <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-800/40 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button className="w-full sm:flex-1 text-center px-6 py-2 rounded-full font-semibold text-white bg-[#FF004F] hover:bg-opacity-80 transition-all">
                  Ver Más
                </button>
                <button className="w-full sm:flex-1 text-center px-6 py-2 rounded-full font-semibold text-[#2E3237] bg-[#C5FF3D] hover:bg-opacity-80 transition-all">
                  Directorio
                </button>
                <button className="w-full sm:flex-1 text-center px-6 py-2 rounded-full font-semibold text-white bg-[#3DFFAB] text-[#181C20] hover:bg-opacity-80 transition-all">
                  Anúnciate Aquí
                </button>
                <button className="w-full sm:flex-1 text-center px-6 py-2 rounded-full font-semibold text-[#181C20] bg-[#00FFFB] hover:bg-opacity-80 transition-all">
                  Sugiere un lugar
                </button>
              </div>
              {/* Debug visual temporal */}
              {lugares && (
                <div className="mb-4 p-2 bg-yellow-100 text-yellow-900 rounded text-xs">
                  <div><b>Debug:</b> Total lugares recibidos: {lugares.length}</div>
                  <div>Ciudades en datos: [{lugares.map(l => l.ciudad).join(', ')}]</div>
                  <div>Ciudad activa: {ciudadActiva}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} title={`Mapa de ${ciudad?.nombre || ''}`}>
        <div className="w-full" style={{ height: "60vh", minHeight: 350 }}>
          <MapView
            key={`modal-${ciudadActiva}-${cityCoords[ciudadActiva]?.lat}-${cityCoords[ciudadActiva]?.lon}`}
            lat={cityCoords[ciudadActiva]?.lat || 0}
            lng={cityCoords[ciudadActiva]?.lon || 0}
            cityName={ciudad?.nombre || ''}
            zoom={13}
            height="100%"
          />
        </div>
      </Modal>
      {/* Modal de Website */}
      <WebsiteModal open={!!websiteModalUrl} url={websiteModalUrl || ''} onClose={() => setWebsiteModalUrl(null)} />
      <ImageLightbox open={!!lightboxImg} src={lightboxImg || ''} onClose={() => setLightboxImg(null)} />
      <style jsx>{`
        .hide-vertical-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .hide-vertical-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
} 