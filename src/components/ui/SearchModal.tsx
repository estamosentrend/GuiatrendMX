'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiSearch, FiX, FiMapPin, FiStar, FiCalendar, FiTag, FiExternalLink } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import LugarCard from './LugarCard';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'business' | 'category' | 'destination' | 'event';
  href: string;
  category?: string;
  city?: string;
  rating?: number;
  imagen?: string;
  direccion?: string;
  telefono?: string;
  whatsapp?: string;
  horario?: string;
  precios?: string;
  website?: string;
  mapa?: string;
}

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const staticSearchData = useMemo<SearchResult[]>(() => [
    { id: '1', title: 'Inicio', description: 'Página principal de la guía turística', type: 'page', href: '/' },
    { id: '2', title: 'Categorías', description: 'Explora todas las categorías disponibles', type: 'page', href: '/directorio' },
    { id: '3', title: 'Destinos', description: 'Descubre todos los destinos disponibles', type: 'page', href: '/destinos' },
    { id: '4', title: 'Experiencias', description: 'Experiencias únicas y actividades', type: 'page', href: '/experiencias' },
    { id: '5', title: 'Eventos', description: 'Eventos y actividades en tu ciudad', type: 'page', href: '/eventos' },
    { id: '6', title: 'Cartelera', description: 'Cartelera de películas y eventos', type: 'page', href: '/cartelera' },
    { id: '7', title: 'Blog', description: 'Artículos y noticias sobre turismo', type: 'page', href: '/blog' },
    { id: '8', title: 'Contacto', description: 'Contacta con nuestro equipo', type: 'page', href: '/contacto' },
    { id: '16', title: 'Restaurantes', description: 'Mejores restaurantes y gastronomía', type: 'category', href: '/restaurantes', category: 'Gastronomía' },
    { id: '17', title: 'Hoteles', description: 'Alojamientos y hospedaje', type: 'category', href: '/hoteles', category: 'Hospedaje' },
    { id: '18', title: 'Tours', description: 'Tours y experiencias guiadas', type: 'category', href: '/tours', category: 'Experiencias' },
    { id: '19', title: 'Gastronomía', description: 'Comida y restaurantes locales', type: 'category', href: '/gastronomia', category: 'Gastronomía' },
    { id: '20', title: 'Hospedaje', description: 'Hoteles, hostales y opciones de alojamiento', type: 'category', href: '/hospedaje', category: 'Hospedaje' },
    { id: '21', title: 'Itinerarios VIP', description: 'Experiencias exclusivas y personalizadas', type: 'page', href: '/itinerarios-vip' },
    { id: '22', title: 'Trend Por México', description: 'Blog sobre tendencias y turismo', type: 'page', href: '/trend-por-mexico' },
    { id: '23', title: 'Revista Estamosentrend', description: 'Revista digital sobre cultura y turismo', type: 'page', href: 'https://revistaestamosentrend.com/' },
  ], []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);
    
    const timer = setTimeout(async () => {
      const staticResults = staticSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.city?.toLowerCase().includes(query.toLowerCase())
      );

      let apiResults: SearchResult[] = [];
      try {
        const ciudades = ['monterrey', 'guadalajara', 'cdmx', 'cancun', 'palenque', 'puerto-vallarta', 'veracruz'];
        const allResults: SearchResult[] = [];
        const exactMatches: SearchResult[] = [];
        
        for (const ciudad of ciudades) {
          const response = await fetch(`/api/lugares?categoria=Destinos&ciudad=${encodeURIComponent(ciudad)}`);
          if (response.ok) {
            const lugares = await response.json();
            if (Array.isArray(lugares)) {
              lugares.forEach((lugar: { nombre?: string; descripcion?: string; categoria?: string; direccion?: string; imagen?: string; telefono?: string; whatsapp?: string; horario?: string; precios?: string; website?: string; mapa?: string }, index: number) => {
                const exactMatch = lugar.nombre?.toLowerCase().trim() === query.toLowerCase().trim();
                const partialMatch = lugar.nombre?.toLowerCase().includes(query.toLowerCase()) ||
                  lugar.descripcion?.toLowerCase().includes(query.toLowerCase()) ||
                  lugar.categoria?.toLowerCase().includes(query.toLowerCase()) ||
                  lugar.direccion?.toLowerCase().includes(query.toLowerCase());
                
                if (exactMatch) {
                  exactMatches.push({
                    id: `${ciudad}-${lugar.nombre || 'sin-nombre'}-${index}`,
                    title: lugar.nombre || 'Sin nombre',
                    description: lugar.descripcion || '',
                    type: 'business',
                    href: `/destinos/${ciudad}#${(lugar.nombre || 'sin-nombre').toLowerCase().replace(/\s+/g, '-')}`,
                    city: ciudad.charAt(0).toUpperCase() + ciudad.slice(1).replace('-', ' '),
                    category: lugar.categoria,
                    rating: 4.5,
                    imagen: lugar.imagen || '',
                    direccion: lugar.direccion || '',
                    telefono: lugar.telefono || '',
                    whatsapp: lugar.whatsapp || '',
                    horario: lugar.horario || '',
                    precios: lugar.precios || '',
                    website: lugar.website || '',
                    mapa: lugar.mapa || ''
                  });
                } else if (partialMatch) {
                  allResults.push({
                    id: `${ciudad}-${lugar.nombre || 'sin-nombre'}-${index}`,
                    title: lugar.nombre || 'Sin nombre',
                    description: lugar.descripcion || '',
                    type: 'business',
                    href: `/destinos/${ciudad}#${(lugar.nombre || 'sin-nombre').toLowerCase().replace(/\s+/g, '-')}`,
                    city: ciudad.charAt(0).toUpperCase() + ciudad.slice(1).replace('-', ' '),
                    category: lugar.categoria,
                    rating: 4.5,
                    imagen: lugar.imagen || '',
                    direccion: lugar.direccion || '',
                    telefono: lugar.telefono || '',
                    whatsapp: lugar.whatsapp || '',
                    horario: lugar.horario || '',
                    precios: lugar.precios || '',
                    website: lugar.website || '',
                    mapa: lugar.mapa || ''
                  });
                }
              });
            }
          }
        }
        
        if (exactMatches.length > 0) {
          apiResults = exactMatches.slice(0, 3);
        } else {
          apiResults = allResults.slice(0, 5);
        }
      } catch (error) {
        console.error('Error al buscar en API:', error);
      }
      
      const combinedResults = [...staticResults, ...apiResults];
      
      if (query.length > 3 && combinedResults.length > 6) {
        const prioritizedResults = [
          ...staticResults.filter(r =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.category?.toLowerCase().includes(query.toLowerCase())
          ),
          ...apiResults.slice(0, 3)
        ];
        setResults(prioritizedResults.slice(0, 6));
      } else {
        setResults(combinedResults.slice(0, 8));
      }
      
      setLoading(false);
      setSelectedIndex(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, staticSearchData]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.href.startsWith('http')) {
      window.open(result.href, '_blank');
    } else {
      router.push(result.href);
    }
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <FiExternalLink className="w-4 h-4" />;
      case 'business':
        return <FiMapPin className="w-4 h-4" />;
      case 'category':
        return <FiTag className="w-4 h-4" />;
      case 'destination':
        return <FiStar className="w-4 h-4" />;
      case 'event':
        return <FiCalendar className="w-4 h-4" />;
      default:
        return <FiSearch className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'text-blue-400';
      case 'business':
        return 'text-green-400';
      case 'category':
        return 'text-purple-400';
      case 'destination':
        return 'text-yellow-400';
      case 'event':
        return 'text-pink-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div
        ref={resultsRef}
        className="relative w-full max-w-2xl glass-card overflow-hidden animate-fade-in"
        style={{
          background: 'rgba(10, 15, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.45)'
        }}
      >
        <form onSubmit={handleSearchSubmit} className="p-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar destinos, negocios, categorías..."
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white font-semibold placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  setSelectedIndex(0);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {query && (
          <div className="border-t border-white/10 dark:border-gray-700/30 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-white/60">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 font-medium">Buscando...</p>
              </div>
            ) : results.length > 0 ? (
              results.some((r) => r.type === 'business' && r.imagen) ? (
                <div className="p-4">
                  <h4 className="text-white/80 font-medium mb-3">Resultados exactos:</h4>
                  <div className="space-y-4">
                    {results
                      .filter(r => r.type === 'business' && r.imagen)
                      .slice(0, 2)
                      .map((result, index) => (
                        <div
                          key={result.id}
                          className={`rounded-xl overflow-hidden transition-all duration-200 ${
                            index === selectedIndex ? 'ring-2 ring-primary' : ''
                          }`}
                        >
                          <LugarCard
                            nombre={result.title}
                            imagen={result.imagen || ''}
                            descripcion={result.description || ''}
                            direccion={result.direccion || ''}
                            website={result.website}
                            telefono={result.telefono}
                            whatsapp={result.whatsapp}
                            precios={result.precios || ''}
                            horario={result.horario || ''}
                            mapa={result.mapa}
                            onWebClick={() => handleResultClick(result)}
                            onMapClick={() => handleResultClick(result)}
                            onImageClick={() => handleResultClick(result)}
                          />
                        </div>
                      ))}
                  </div>
                  
                  {results.some(r => r.type !== 'business' || !r.imagen) && (
                    <>
                      <h4 className="text-white/80 font-medium mt-4 mb-3">Otros resultados:</h4>
                      <div className="p-2">
                        {results
                          .filter(r => r.type !== 'business' || !r.imagen)
                          .map((result, index) => (
                            <button
                              key={result.id}
                              onClick={() => handleResultClick(result)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                                index === selectedIndex ? 'bg-white/10 border-l-4 border-primary' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`mt-1 ${getTypeColor(result.type)}`}>
                                  {getTypeIcon(result.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-white truncate">
                                      {result.title}
                                    </h3>
                                    {result.rating && (
                                      <div className="flex items-center text-yellow-400 text-xs">
                                        <FiStar className="w-3 h-3 fill-current" />
                                        <span className="ml-1 font-bold text-white">{result.rating}</span>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-white/80 text-xs mt-1 truncate">
                                    {result.description}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    {result.city && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/30 text-blue-200 font-medium">
                                        <FiMapPin className="w-3 h-3 mr-1" />
                                        {result.city}
                                      </span>
                                    )}
                                    {result.category && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/30 text-purple-200 font-medium">
                                        <FiTag className="w-3 h-3 mr-1" />
                                        {result.category}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 hover:bg-white/10 ${
                        index === selectedIndex ? 'bg-white/10 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white truncate">
                              {result.title}
                            </h3>
                            {result.rating && (
                              <div className="flex items-center text-yellow-400 text-sm">
                                <FiStar className="w-3 h-3 fill-current" />
                                <span className="ml-1 font-bold text-white">{result.rating}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-white/80 text-sm mt-1 truncate">
                            {result.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            {result.city && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/30 text-blue-200 font-medium">
                                <FiMapPin className="w-3 h-3 mr-1" />
                                {result.city}
                              </span>
                            )}
                            {result.category && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/30 text-purple-200 font-medium">
                                <FiTag className="w-3 h-3 mr-1" />
                                {result.category}
                              </span>
                            )}
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-500/30 text-gray-200 font-medium">
                              {result.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )
            ) : (
              <div className="p-6 text-center text-white/60">
                <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-bold">No se encontraron resultados</p>
                <p className="text-sm mt-1 font-medium">Intenta con diferentes palabras clave</p>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="p-6 text-center text-white/60">
            <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-bold">¿Qué estás buscando?</p>
            <p className="text-sm mt-1 font-medium">Busca destinos, negocios, categorías y más</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Monterrey', 'Restaurantes', 'Hoteles', 'Tours', 'Eventos'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 font-medium hover:bg-white/20 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;