'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FiSearch, FiCompass, FiEdit, FiSmile } from 'react-icons/fi';

const steps = [
  {
    id: 1,
    name: 'Busca',
    description: 'Encuentra destinos, experiencias o servicios que te interesen.',
    icon: FiSearch,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    name: 'Explora',
    description: 'Descubre detalles, fotos, reseñas y recomendaciones.',
    icon: FiCompass,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    name: 'Registra',
    description: 'Crea tu cuenta o inicia sesión para guardar tus favoritos.',
    icon: FiEdit,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: 4,
    name: 'Disfruta',
    description: 'Vive la experiencia y comparte tu opinión con la comunidad.',
    icon: FiSmile,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400'
  }
];

export default function HowItWorksSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="primary" className="mb-4">
          ¿Cómo Funciona?
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Descubre cómo usar la plataforma en 4 pasos
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Es muy fácil comenzar a explorar, registrar y disfrutar todo lo que tenemos para ti.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <Card 
              key={step.id}
              variant="glass" 
              className="h-full hover:scale-105 transition-all duration-300 cursor-pointer border-0 hover:shadow-lg"
              style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}
            >
              <CardContent className="p-4 lg:p-6 text-center">
                <div className={`${step.bgColor} w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 lg:w-10 lg:h-10 ${step.textColor}`} />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-2">
                  {step.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 