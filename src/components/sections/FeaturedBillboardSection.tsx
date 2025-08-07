'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiFilm, FiCalendar, FiArrowRight } from 'react-icons/fi';

const billboardItems = [
  // Películas
  {
    id: 1,
    type: 'movie',
    title: 'El Conjuro 4: Últimos Ritos',
    image: '/images/Elconjuro4.webp',
    releaseDate: '4 de septiembre 2025',
    genre: 'Terror, Sobrenatural',
    synopsis: 'La familia Warren enfrenta su caso más aterrador cuando una serie de rituales oscuros desatan fuerzas malignas nunca antes vistas.',
    status: 'upcoming',
  },
  {
    id: 2,
    type: 'movie',
    title: 'Avengers: Secret Wars',
    image: '/images/SECRETWARS.webp',
    releaseDate: 'mayo 2027',
    genre: 'Acción, Superhéroes',
    synopsis: 'Los héroes más poderosos del universo Marvel se enfrentan a una amenaza multiversal sin precedentes.',
    status: 'upcoming',
  },
  {
    id: 3,
    type: 'movie',
    title: 'Vengadores: Doomsday',
    image: '/images/DOOMSDAY.webp',
    releaseDate: 'mayo 2026',
    genre: 'Acción, Superhéroes',
    synopsis: 'Los Vengadores se reúnen una vez más para enfrentar el apocalipsis definitivo cuando un nuevo enemigo amenaza con destruir el universo.',
    status: 'upcoming',
  },
  {
    id: 4,
    type: 'movie',
    title: 'Spider-Man: Brand New Day',
    image: '/images/spiderman.webp',
    releaseDate: '31 de julio de 2026',
    genre: 'Acción, Superhéroes',
    synopsis: 'Peter Parker enfrenta nuevos desafíos cuando un misterioso villano amenaza con cambiar su vida y la de sus seres queridos para siempre.',
    status: 'upcoming',
  },
  // Series
  {
    id: 5,
    type: 'series',
    title: 'Stranger Things 5 - Volumen 1',
    image: '/images/STRANGER5.jpg',
    releaseDate: '26 de noviembre de 2025',
    genre: 'Ciencia Ficción, Misterio',
    platform: 'Netflix',
    synopsis: 'La batalla final por Hawkins comienza con el primer volumen de la temporada final.',
    status: 'upcoming',
  },
  {
    id: 5.1,
    type: 'series',
    title: 'Stranger Things 5 - Volumen 2',
    image: '/images/STRANGER5.jpg',
    releaseDate: '25 de diciembre de 2025',
    genre: 'Ciencia Ficción, Misterio',
    platform: 'Netflix',
    synopsis: 'El segundo volumen revela nuevos secretos del Upside Down y prepara el desenlace.',
    status: 'upcoming',
  },
  {
    id: 5.2,
    type: 'series',
    title: 'Stranger Things 5 - Capítulo final',
    image: '/images/STRANGER5.jpg',
    releaseDate: '31 de diciembre de 2025',
    genre: 'Ciencia Ficción, Misterio',
    platform: 'Netflix',
    synopsis: 'El capítulo final cierra la historia de Hawkins y sus protagonistas en una épica conclusión.',
    status: 'upcoming',
  },
  {
    id: 6,
    type: 'series',
    title: 'One Piece: Temporada 2',
    image: '/images/ONE2.jpg',
    releaseDate: 'diciembre 2025',
    genre: 'Aventura, Fantasía',
    platform: 'Netflix',
    synopsis: 'Luffy y la tripulación del Sombrero de Paja continúan su viaje por Grand Line enfrentando nuevos enemigos y descubriendo misterios legendarios.',
    status: 'upcoming',
  },
  {
    id: 7,
    type: 'series',
    title: 'La Casa de los Famosos México 2025',
    image: '/images/Famosos.webp',
    releaseDate: '27 de julio de 2025',
    genre: 'Reality, Entretenimiento',
    platform: 'VIX',
    synopsis: 'La nueva edición del reality más polémico de México, con celebridades compitiendo por la fama y el premio mayor.',
    status: 'upcoming',
  },
  {
    id: 8,
    type: 'series',
    title: '¿Quién es la Máscara? 2025',
    image: '/images/lamascara2025.webp',
    releaseDate: '2025',
    genre: 'Reality, Entretenimiento',
    platform: 'Televisa/ViX',
    synopsis: 'El show de misterio donde celebridades enmascaradas sorprenden al público y al panel de investigadores. ¿Quién será la próxima gran revelación?',
    status: 'upcoming',
  },
];

export default function FeaturedBillboardSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FiFilm className="w-5 h-5 text-primary-600" />
          <Badge variant="primary">
            Cartelera Destacada
          </Badge>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Estrenos de Cine y Series 2025-2026
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubre las películas y series más esperadas de la temporada. ¡No te pierdas ningún estreno!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {billboardItems.map((item) => (
          <Card key={item.id} variant="glass" className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={300}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="primary" size="sm">
                  {item.type === 'movie' ? 'CINE' : 'SERIE'}
                </Badge>
                {item.platform && (
                  <Badge 
                    variant="info" 
                    size="sm" 
                    className={item.platform === 'Netflix' || item.platform === 'VIX' ? 'text-[#FF004F]' : ''}
                  >
                    {item.platform}
                  </Badge>
                )}
                {item.status === 'upcoming' && (
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    Próximo
                  </Badge>
                )}
                {item.status === 'finished' && (
                  <Badge variant="danger" size="sm" className="flex items-center gap-1">
                    Finalizado
                  </Badge>
                )}
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="outline" size="sm" className="mb-2">
                    <FiCalendar className="inline-block w-4 h-4 mr-1" /> {item.releaseDate}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                    {item.genre}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {item.synopsis}
              </p>
              <div className="flex gap-3">
                <Link href="/cartelera" className="flex-1">
                  <Button variant="primary" size="sm" className="w-full group">
                    Ver más detalles
                    <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/cartelera">
          <Button size="lg" className="bg-primary hover:bg-[#3DFFAB] hover:text-[#2E3237] text-white group">
            Ver más Cartelera
            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}