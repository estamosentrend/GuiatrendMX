'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiClock, FiUsers, FiStar, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const trendingExperiences = [
  {
    id: 1,
    title: 'Tour Gastronómico por Polanco',
    location: 'Ciudad de México',
    image: '/images/cdmx.webp',
    rating: 4.9,
    reviews: 234,
    duration: '4 horas',
    groupSize: '8-12 personas',
    price: '$850',
    originalPrice: '$1,200',
    discount: '29%',
    category: 'Gastronomía',
    trending: true,
    description: 'Descubre los sabores más exclusivos de la capital mexicana',
    highlights: ['Restaurantes premiados', 'Chef profesional', 'Degustación de mezcal']
  },
  {
    id: 2,
    title: 'Cenotes Secretos de Tulum',
    location: 'Quintana Roo',
    image: '/images/cancun.webp',
    rating: 4.8,
    reviews: 189,
    duration: '6 horas',
    groupSize: '6-10 personas',
    price: '$1,450',
    originalPrice: '$1,800',
    discount: '19%',
    category: 'Aventura',
    trending: true,
    description: 'Explora cenotes vírgenes lejos de las multitudes',
    highlights: ['Cenotes privados', 'Equipo incluido', 'Almuerzo tradicional']
  },
  {
    id: 3,
    title: 'Experiencia Tequila Premium',
    location: 'Guadalajara',
    image: '/images/guadalajara.webp',
    rating: 4.7,
    reviews: 156,
    duration: '5 horas',
    groupSize: '4-8 personas',
    price: '$1,200',
    originalPrice: '$1,500',
    discount: '20%',
    category: 'Cultural',
    trending: true,
    description: 'Conoce el proceso artesanal del tequila más fino',
    highlights: ['Destilería histórica', 'Cata profesional', 'Certificado sommelier']
  },
  {
    id: 4,
    title: 'Sunset Sailing Vallarta',
    location: 'Puerto Vallarta',
    image: '/images/puerto-vallarta.webp',
    rating: 4.6,
    reviews: 298,
    duration: '3 horas',
    groupSize: '12-20 personas',
    price: '$750',
    originalPrice: '$950',
    discount: '21%',
    category: 'Romance',
    trending: true,
    description: 'Navega hacia el atardecer más romántico del Pacífico',
    highlights: ['Cena gourmet', 'Barra libre', 'Música en vivo']
  }
];

export default function TrendingExperiences() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FiTrendingUp className="w-5 h-5 text-primary-600" />
          <Badge variant="primary">
            Experiencias Trending
          </Badge>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Lo Más Popular Ahora
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experiencias únicas que están causando sensación. Reserva ahora y vive momentos inolvidables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {trendingExperiences.map((experience) => (
          <Card key={experience.id} variant="glass" className="group hover:scale-[1.02] transition-all duration-300 overflow-hidden" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <div className="relative">
              <Image
                src={experience.image}
                alt={experience.title}
                width={600}
                height={300}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Trending Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="primary" size="sm" className="bg-red-500 text-white">
                  🔥 Trending
                </Badge>
              </div>
              
              {/* Discount Badge */}
              <div className="absolute top-3 right-3">
                <Badge variant="success" size="sm">
                  -{experience.discount} OFF
                </Badge>
              </div>
              
              {/* Rating */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{experience.rating}</span>
                  <span className="text-white/80 text-sm">({experience.reviews})</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="outline" size="sm" className="mb-2">
                    {experience.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    📍 {experience.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {experience.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {experience.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">por persona</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {experience.description}
              </p>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiUsers className="w-4 h-4" />
                  <span>{experience.groupSize}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {experience.highlights.map((highlight, index) => (
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
                <Link href={`/experiencias/${experience.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full group">
                    Reservar Ahora
                    <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="dark:bg-white/10 dark:hover:bg-white/20">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/experiencias">
          <Button size="lg" className="bg-primary hover:bg-[#3DFFAB] hover:text-[#2E3237] text-white group">
            Ver Todas las Experiencias
            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}