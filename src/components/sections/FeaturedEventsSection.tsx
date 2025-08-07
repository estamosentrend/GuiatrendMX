'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiMapPin, FiStar, FiTrendingUp, FiCheckCircle, FiXCircle, FiArrowRight } from 'react-icons/fi';

const featuredEvents = [
  {
    id: 1,
    title: 'Tecate Pa’l Norte 2025',
    location: 'Monterrey, NL',
    image: '/images/Palnorte2025.webp',
    rating: 4.9,
    reviews: 2340,
    date: '21-23 Marzo 2025',
    status: 'finished',
    category: 'Festival',
    description: 'El festival más grande del norte de México con artistas internacionales y experiencias únicas.',
    highlights: ['Lineup internacional', 'Zona VIP', 'Experiencias gastronómicas']
  },
  {
    id: 2,
    title: 'Corona Capital 2025',
    location: 'CDMX',
    image: '/images/coronacapital2025.webp',
    rating: 4.8,
    reviews: 1890,
    date: '14-16 Noviembre 2025',
    status: 'upcoming',
    category: 'Festival',
    description: 'El festival de música alternativa más importante de la Ciudad de México.',
    highlights: ['Bandas internacionales', 'Zona de food trucks', 'Activaciones de marcas']
  },
  {
    id: 3,
    title: 'Vive Latino 2025',
    location: 'CDMX',
    image: '/images/VL2025.webp',
    rating: 4.7,
    reviews: 1560,
    date: '16-17 Marzo 2025',
    status: 'finished',
    category: 'Festival',
    description: 'El festival de rock latino más emblemático de México, con los mejores exponentes del género.',
    highlights: ['Rock en español', 'Zona de arte', 'Mercado musical']
  },
  {
    id: 4,
    title: 'Mundial 2026',
    location: 'Estados Unidos, México y Canadá',
    image: '/images/Mundial2026.webp',
    rating: 5.0,
    reviews: 10000,
    date: '11 de junio - 19 de julio 2026',
    status: 'upcoming',
    category: 'Fútbol',
    description: 'La Copa Mundial de la FIFA 2026 reunirá a las mejores selecciones del mundo en una edición histórica celebrada en Norteamérica.',
    highlights: ['Partidos en México, USA y Canadá', 'Nuevos estadios', 'Más equipos que nunca']
  }
];

export default function FeaturedEventsSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FiTrendingUp className="w-5 h-5 text-primary-600" />
          <Badge variant="primary">
            Eventos Destacados
          </Badge>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Los eventos más esperados y memorables
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubre los festivales y conciertos más importantes de México. ¡No te pierdas la próxima gran experiencia!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {featuredEvents.map((event) => (
          <Card key={event.id} variant="glass" className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <div className="relative">
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={300}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Estado del evento */}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="primary" size="sm">
                  {event.category}
                </Badge>
                {event.status === 'finished' ? (
                  <Badge variant="danger" size="sm" className="flex items-center gap-1">
                    <FiXCircle className="w-4 h-4" /> Finalizado
                  </Badge>
                ) : (
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <FiCheckCircle className="w-4 h-4" /> Próximo
                  </Badge>
                )}
              </div>
              {/* Rating */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{event.rating}</span>
                  <span className="text-white/80 text-sm">({event.reviews})</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="outline" size="sm" className="mb-2">
                    {event.date}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <FiMapPin className="inline-block w-4 h-4 mr-1" /> {event.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {event.description}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {event.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full"
                    >
                      ✓ {highlight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/eventos" className="flex-1">
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
        <Link href="/eventos">
          <Button size="lg" className="bg-primary hover:bg-[#3DFFAB] hover:text-[#2E3237] text-white group">
            Ver más Eventos por Zona
            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}