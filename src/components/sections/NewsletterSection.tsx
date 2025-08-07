'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiMail, FiGift, FiTrendingUp, FiMapPin, FiCheck } from 'react-icons/fi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: FiGift,
      title: 'Ofertas Exclusivas',
      description: 'Descuentos especiales solo para suscriptores'
    },
    {
      icon: FiTrendingUp,
      title: 'Tendencias de Viaje',
      description: 'Las últimas tendencias y destinos populares'
    },
    {
      icon: FiMapPin,
      title: 'Destinos Secretos',
      description: 'Lugares únicos que no encontrarás en otros sitios'
    }
  ];

  if (isSubscribed) {
    return (
      <div className="container mx-auto px-4">
        <Card variant="glass" className="max-w-2xl mx-auto text-center">
          <CardContent className="p-8 lg:p-12">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
              ¡Bienvenido a la Familia GuiaTrend! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Te has suscrito exitosamente. Pronto recibirás nuestras mejores ofertas y recomendaciones de viaje.
            </p>
            <Badge variant="success">
              Suscripción Confirmada
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <Card variant="glass" className="overflow-hidden" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12">
                <Badge variant="primary" className="mb-4">
                  Newsletter Exclusivo
                </Badge>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
                  No Te Pierdas Nada
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Sé el primero en conocer los mejores destinos, ofertas exclusivas y experiencias únicas en México.
                </p>

                {/* Newsletter Form */}
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        required
                        suppressHydrationWarning
                      />
                    </div>
                    <Button 
                      type="submit" 
                      loading={isLoading}
                      className="px-8 py-3 whitespace-nowrap"
                    >
                      {isLoading ? 'Suscribiendo...' : 'Suscribirse'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Al suscribirte, aceptas recibir emails promocionales. Puedes cancelar en cualquier momento.
                  </p>
                </form>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      15K+
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Suscriptores activos
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      4.9★
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Calificación promedio
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Benefits */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-6">
                  ¿Qué Recibirás?
                </h3>
                
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-text-dark)] dark:text-white mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Special Offer */}
                <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-primary-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FiGift className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      Oferta Especial
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Los primeros 100 suscriptores reciben un <strong>20% de descuento</strong> en su primera experiencia.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}