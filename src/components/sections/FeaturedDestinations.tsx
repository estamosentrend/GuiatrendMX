'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiMapPin, FiStar, FiArrowRight } from 'react-icons/fi';

const featuredDestinations = [
  {
    id: 1,
    name: 'Cancún',
    description: 'Playas paradisíacas y vida nocturna vibrante',
    image: '/images/cancun.webp',
    rating: 4.8,
    reviews: 2847,
    category: 'Playa',
    price: 'Desde $2,500',
    highlights: ['Playa del Carmen', 'Chichen Itzá', 'Xcaret']
  },
  {
    id: 2,
    name: 'Ciudad de México',
    description: 'Historia, cultura y gastronomía excepcional',
    image: '/images/cdmx.webp',
    rating: 4.7,
    reviews: 1923,
    category: 'Cultural',
    price: 'Desde $1,800',
    highlights: ['Centro Histórico', 'Xochimilco', 'Teotihuacán']
  },
  {
    id: 3,
    name: 'Puerto Vallarta',
    description: 'Encanto colonial frente al Pacífico',
    image: '/images/puerto-vallarta.webp',
    rating: 4.6,
    reviews: 1456,
    category: 'Playa',
    price: 'Desde $2,200',
    highlights: ['Malecón', 'Zona Romántica', 'Islas Marietas']
  },
  {
    id: 4,
    name: 'Guadalajara',
    description: 'Tradición mexicana y arquitectura colonial',
    image: '/images/guadalajara.webp',
    rating: 4.5,
    reviews: 987,
    category: 'Cultural',
    price: 'Desde $1,600',
    highlights: ['Centro Histórico', 'Tlaquepaque', 'Tequila']
  }
];

export default function FeaturedDestinations() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="primary" className="mb-4">
          Destinos Destacados
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Descubre México
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explora los destinos más populares de México, desde playas paradisíacas hasta ciudades llenas de historia y cultura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDestinations.map((destination) => (
          <Card key={destination.id} variant="glass" className="group hover:scale-105 transition-all duration-300" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={destination.image}
                alt={destination.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" size="sm">
                  {destination.category}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">{destination.rating}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-white">
                  {destination.name}
                </h3>
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {destination.price}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {destination.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {destination.reviews} reseñas
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {destination.highlights.slice(0, 2).map((highlight, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium bg-gradient-to-r from-primary to-primary-light text-white shadow-primary px-2 py-1 rounded-full transition-all duration-300 hover:from-primary-dark hover:to-primary hover:shadow-primary-hover hover:scale-105"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="text-xs text-gray-400">
                      +{destination.highlights.length - 2} más
                    </span>
                  )}
                </div>
              </div>
              
              <Link href={`/destinos/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="outline" size="sm" className="w-full group dark:bg-white/10 dark:hover:bg-white/20">
                  Explorar
                  <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/destinos">
          <Button size="lg" className="group">
            Ver Todos los Destinos
            <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}