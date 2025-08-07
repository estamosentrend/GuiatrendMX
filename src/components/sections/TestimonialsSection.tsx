'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Monterrey, México',
    avatar: '/images/monterrey.webp',
    rating: 5,
    experience: 'Tour Gastronómico CDMX',
    date: 'Hace 2 semanas',
    comment: 'Una experiencia increíble. El tour gastronómico superó todas mis expectativas. Los restaurantes seleccionados fueron excepcionales y nuestro guía tenía un conocimiento impresionante de la gastronomía mexicana.',
    verified: true
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    location: 'Guadalajara, México',
    avatar: '/images/guadalajara.webp',
    rating: 5,
    experience: 'Cenotes Secretos Tulum',
    date: 'Hace 1 mes',
    comment: 'Los cenotes que visitamos eran absolutamente mágicos. Lejos de las multitudes turísticas, pudimos disfrutar de la naturaleza en su estado más puro. El equipo fue muy profesional y la comida deliciosa.',
    verified: true
  },
  {
    id: 3,
    name: 'Ana Martínez',
    location: 'Puebla, México',
    avatar: '/images/palenque.webp',
    rating: 5,
    experience: 'Experiencia Tequila Premium',
    date: 'Hace 3 semanas',
    comment: 'Como amante del tequila, esta experiencia fue perfecta. Aprendí mucho sobre el proceso de elaboración y la cata fue excepcional. El sommelier era muy conocedor y la destilería histórica impresionante.',
    verified: true
  },
  {
    id: 4,
    name: 'Roberto Silva',
    location: 'Veracruz, México',
    avatar: '/images/Veracruz.webp',
    rating: 5,
    experience: 'Sunset Sailing Vallarta',
    date: 'Hace 2 meses',
    comment: 'El atardecer más romántico que he visto. La cena a bordo fue exquisita y el servicio impecable. Mi esposa y yo vivimos una noche inolvidable. Definitivamente lo recomiendo para parejas.',
    verified: true
  },
  {
    id: 5,
    name: 'Lucía Hernández',
    location: 'Cancún, México',
    avatar: '/images/cancun.webp',
    rating: 5,
    experience: 'Tour Cultural Palenque',
    date: 'Hace 1 semana',
    comment: 'Una inmersión total en la cultura maya. El guía arqueólogo nos explicó cada detalle con pasión. Las ruinas de Palenque son impresionantes y la experiencia fue muy educativa y emocionante.',
    verified: true
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <Badge variant="primary" className="mb-3 sm:mb-4">
          Testimonios
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-3 sm:mb-4">
          Lo Que Dicen Nuestros Viajeros
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
          Experiencias reales de personas que han vivido aventuras inolvidables con GuiaTrend.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Testimonial */}
        <Card variant="glass" className="mb-6 sm:mb-8" style={{boxShadow: '0 0 16px 4px rgba(46, 50, 55, 0.5), 0 0 32px 8px rgba(46, 50, 55, 0.3)'}}>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="hidden sm:flex flex-shrink-0">
                <FiMessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-primary-400 opacity-50" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  &ldquo;{testimonials[currentIndex].comment}&rdquo;
                </blockquote>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 40px, 48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <h4 className="text-sm sm:text-base font-semibold text-[var(--color-text-dark)] dark:text-white truncate">
                          {testimonials[currentIndex].name}
                        </h4>
                        {testimonials[currentIndex].verified && (
                          <Badge variant="success" size="sm" className="text-xs">
                            ✓ Verificado
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right sm:text-left mt-2 sm:mt-0">
                    <Badge variant="outline" size="sm" className="text-xs mb-1">
                      {testimonials[currentIndex].experience}
                    </Badge>
                    <p className="text-xs text-gray-400">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={prevTestimonial}
            className="p-1.5 sm:p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Testimonio anterior"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex gap-1.5 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-300'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-1.5 sm:p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Siguiente testimonio"
          >
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center">
          <div className="p-2 sm:p-3 bg-white/5 dark:bg-white/5 rounded-lg">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-500 dark:text-primary-400 mb-1 sm:mb-2">
              4.8/5
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Calificación
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-white/5 dark:bg-white/5 rounded-lg">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-500 dark:text-primary-400 mb-1 sm:mb-2">
              2,500+
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Reseñas
            </p>
          </div>
          <div className="p-2 sm:p-3 bg-white/5 dark:bg-white/5 rounded-lg">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-500 dark:text-primary-400 mb-1 sm:mb-2">
              98%
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Satisfacción
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}