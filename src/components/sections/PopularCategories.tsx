'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  FiMapPin, 
  FiCamera, 
  FiCoffee, 
  FiSun, 
  FiCompass,
  FiMusic,
  FiShoppingBag,
  FiHeart
} from 'react-icons/fi';

const categories = [
  {
    id: 1,
    name: 'Playas',
    description: 'Destinos costeros paradisíacos',
    icon: FiSun,
    count: 45,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    name: 'Cultura',
    description: 'Sitios históricos y museos',
    icon: FiCamera,
    count: 32,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    name: 'Familiar',
    description: 'Lugares y actividades ideales para disfrutar en familia',
    icon: FiCoffee,
    count: 28,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: 4,
    name: 'Aventura',
    description: 'Actividades extremas y naturaleza',
    icon: FiCompass,
    count: 23,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 5,
    name: 'Vida Nocturna',
    description: 'Bares, clubs y entretenimiento',
    icon: FiMusic,
    count: 19,
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 6,
    name: 'Shopping',
    description: 'Centros comerciales y mercados',
    icon: FiShoppingBag,
    count: 15,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 7,
    name: 'Romance',
    description: 'Lugares perfectos para parejas',
    icon: FiHeart,
    count: 12,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    textColor: 'text-rose-600 dark:text-rose-400'
  },
  {
    id: 8,
    name: 'Turismo',
    description: 'Sitios turísticos populares',
    icon: FiMapPin,
    count: 38,
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400'
  }
];

interface PopularCategoriesProps {
  onCategoryClick: (categoryName: string) => void;
}

export default function PopularCategories({ onCategoryClick }: PopularCategoriesProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="primary" className="mb-4">
          Lugares Temáticos
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Explora lugares temáticos
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubre espacios únicos y temáticos para todos los gustos y estilos de viaje.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className="group"
            >
              <Card 
                variant="glass" 
                className="h-full hover:scale-105 transition-all duration-300 cursor-pointer border-0 hover:shadow-lg"
                style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}
              >
                <CardContent className="p-4 lg:p-6 text-center">
                  <div className={`${category.bgColor} w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 lg:w-10 lg:h-10 ${category.textColor}`} />
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="primary" size="sm">
                        {category.count} lugares
                      </Badge>
                    </div>
                    <button 
                      className="w-full py-1.5 px-3 rounded-xl text-sm font-medium transition-all duration-300
                        bg-gradient-to-r from-primary to-primary-light text-white hover:from-[#3DFFAB] hover:to-[#3DFFAB] hover:text-[#2E3237]
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                        transform hover:scale-105 active:scale-95"
                      onClick={() => onCategoryClick(category.name)}
                    >
                      Ver más
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              200+
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Lugares únicos
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              50+
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Ciudades cubiertas
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              10K+
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Reseñas verificadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
