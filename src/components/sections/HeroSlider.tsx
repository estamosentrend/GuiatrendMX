'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaStar, FaPlay } from 'react-icons/fa';
import VideoLightbox from '@/components/ui/VideoLightbox';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    href: string;
  };
  location: string;
  rating: number;
  category: string;
  video?: string; // Nuevo campo opcional para video
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Descubre Monterrey',
    subtitle: 'La Sultana del Norte',
    description: 'Explora la vibrante ciudad de Monterrey con sus montañas majestuosas, arquitectura moderna y rica cultura gastronómica.',
    image: '/images/monterrey.webp',
    cta: {
      text: 'Explorar Monterrey',
      href: '/destinos/monterrey'
    },
    location: 'Nuevo León, México',
    rating: 4.8,
    category: 'Destino Urbano',
    video: 'https://www.youtube.com/watch?v=GSYIvAUp11I', // Video para Monterrey
  },
  {
    id: '2',
    title: 'Guadalajara Mágica',
    subtitle: 'Cuna del Mariachi',
    description: 'Sumérgete en la tradición mexicana en Guadalajara, donde el tequila, el mariachi y la hospitalidad tapatía te esperan.',
    image: '/images/guadalajara.webp',
    cta: {
      text: 'Descubrir Guadalajara',
      href: '/destinos/guadalajara'
    },
    location: 'Jalisco, México',
    rating: 4.9,
    category: 'Cultura y Tradición',
    video: 'https://www.youtube.com/watch?v=VeIKoszHyvI', // Video para Guadalajara
  },
  {
    id: '3',
    title: 'Cancún Paradisíaco',
    subtitle: 'Caribe Mexicano',
    description: 'Relájate en las playas de arena blanca y aguas turquesas de Cancún, el destino tropical perfecto.',
    image: '/images/cancun.webp',
    cta: {
      text: 'Visitar Cancún',
      href: '/destinos/cancun'
    },
    location: 'Quintana Roo, México',
    rating: 4.7,
    category: 'Playa y Resort',
    video: 'https://www.youtube.com/watch?v=OoqNoNQeoPo', // Video para Cancún
  },
  {
    id: '4',
    title: 'CDMX Cosmopolita',
    subtitle: 'Capital Cultural',
    description: 'Vive la energía de la Ciudad de México, con sus museos de clase mundial, gastronomía excepcional y vida nocturna vibrante.',
    image: '/images/cdmx.webp',
    cta: {
      text: 'Explorar CDMX',
      href: '/destinos/cdmx'
    },
    location: 'Ciudad de México',
    rating: 4.6,
    category: 'Metrópoli',
    video: 'https://www.youtube.com/watch?v=jvTAPzS8glw', // Video para CDMX
  },
  {
    id: '5',
    title: 'Misterios de Palenque',
    subtitle: 'Corazón Maya',
    description: 'Descubre la magia ancestral de Palenque, sus ruinas mayas y la exuberante selva chiapaneca.',
    image: '/images/palenque.webp',
    cta: {
      text: 'Explorar Palenque',
      href: '/destinos/palenque'
    },
    location: 'Chiapas, México',
    rating: 4.8,
    category: 'Cultura y Naturaleza',
    video: 'https://www.youtube.com/watch?v=py2Sq9hpROc', // Video para Palenque
  },
  {
    id: '6',
    title: 'Puerto Vallarta Esencial',
    subtitle: 'Encanto del Pacífico',
    description: 'Vive la calidez de Puerto Vallarta, su malecón, playas doradas y vibrante vida nocturna.',
    image: '/images/puerto-vallarta.webp',
    cta: {
      text: 'Descubrir Puerto Vallarta',
      href: '/destinos/puerto-vallarta'
    },
    location: 'Jalisco, México',
    rating: 4.7,
    category: 'Playa y Romance',
    video: 'https://www.youtube.com/watch?v=DD1Ek1Kn4OI', // Video para Puerto Vallarta
  },
  {
    id: '7',
    title: 'Veracruz Infinito',
    subtitle: 'Sabor y Tradición',
    description: 'Sumérgete en la historia, gastronomía y alegría de Veracruz, puerto emblemático de México.',
    image: '/images/Veracruz.webp',
    cta: {
      text: 'Explorar Veracruz',
      href: '/destinos/veracruz'
    },
    location: 'Veracruz, México',
    rating: 4.6,
    category: 'Cultura y Playa',
    video: 'https://www.youtube.com/watch?v=xouaxlKky1U', // Video para Veracruz
  },
  {
    id: '8',
    title: 'Otras Regiones',
    subtitle: 'México Sorprendente',
    description: 'Explora destinos únicos y poco conocidos que te sorprenderán en cada rincón del país.',
    image: '/images/otras regiones.webp',
    cta: {
      text: 'Ver Más Regiones',
      href: '/destinos/otras'
    },
    location: 'México',
    rating: 4.5,
    category: 'Aventura y Descubrimiento',
    video: 'https://www.youtube.com/watch?v=vrwoIZtQSuI&t=21s', // Video para Otras Regiones
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);

  // Auto-play del slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 pointer-events-auto' 
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Category Badge */}
                  <div className="mb-4 animate-slide-in">
                    <span className="inline-flex items-center px-4 py-2 rounded-full glass text-white/90 text-sm font-medium backdrop-blur-md">
                      <FaMapMarkerAlt className="mr-2" />
                      {slide.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-slide-in">
                    <span className="block text-2xl md:text-3xl font-normal text-white/80 mb-2">
                      {slide.subtitle}
                    </span>
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-white/90 mb-6 max-w-lg leading-relaxed animate-slide-in">
                    {slide.description}
                  </p>

                  {/* Location and Rating */}
                  <div className="flex items-center space-x-6 mb-8 animate-slide-in">
                    <div className="flex items-center text-white/80">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{slide.location}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <FaStar className="mr-2 text-yellow-400" />
                      <span>{slide.rating}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 animate-slide-in">
                    <Link href={slide.cta.href}>
                      <Button className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-[#3DFFAB] hover:text-[#2E3237] transition-colors duration-300">
                        {slide.cta.text}
                      </Button>
                    </Link>
                    {slide.video && (
                      <Button 
                        variant="secondary" 
                        className="glass-button px-8 py-4 text-lg font-semibold text-white border-white/20 hover:bg-white/10"
                        onClick={() => setVideoOpen(true)}
                        type="button"
                      >
                        <FaPlay className="mr-2" />
                        Ver Video
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full glass-hover text-white/80 hover:text-white transition-all duration-300 backdrop-blur-md"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-20">
        <button
          onClick={nextSlide}
          className="p-3 rounded-full glass-hover text-white/80 hover:text-white transition-all duration-300 backdrop-blur-md"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary scale-125 shadow-glow'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="glass-card p-6 max-w-sm animate-float">
          <h3 className="text-white font-semibold text-lg mb-2">
            {currentSlideData.title}
          </h3>
          <p className="text-white/80 text-sm mb-4">
            {currentSlideData.description.substring(0, 100)}...
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white/70 text-sm">
              <FaMapMarkerAlt className="mr-1" />
              <span>{currentSlideData.location}</span>
            </div>
            <div className="flex items-center text-white/70 text-sm">
              <FaStar className="mr-1 text-yellow-400" />
              <span>{currentSlideData.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play Control */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`p-3 rounded-full glass-hover transition-all duration-300 backdrop-blur-md ${
            isAutoPlaying 
              ? 'text-primary bg-white/10' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          <FaPlay className={`w-4 h-4 ${isAutoPlaying ? '' : 'opacity-50'}`} />
        </button>
      </div>

      {/* VideoLightbox global para el slide activo */}
      {currentSlideData.video && (
        <VideoLightbox
          open={videoOpen}
          url={currentSlideData.video}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </section>
  );
};

export default HeroSlider;