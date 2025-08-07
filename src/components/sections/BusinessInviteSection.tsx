'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiBriefcase, FiMail, FiEdit2 } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function BusinessInviteSection() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            ¿Tienes un Negocio?
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
            Anúnciate en GUIATREND y haz crecer tu comercio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Si tienes un negocio, restaurante, hotel, agencia o cualquier comercio, regístrate para aparecer en la guía y llegar a miles de viajeros y clientes potenciales.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Card variant="glass" className="overflow-hidden" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Columna Izquierda - Contenido */}
                <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                  <div className="flex items-center justify-center mb-6">
                    <FiBriefcase className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-2">
                    Registra tu Negocio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Da de alta tu comercio y forma parte de la comunidad GUIATREND.
                  </p>
                  <div className="flex flex-col gap-4">
                    <Link href="/registro-negocio">
                      <Button variant="primary" size="lg" className="w-full group">
                        <FiEdit2 className="w-5 h-5 mr-2" /> Registrar Negocio
                      </Button>
                    </Link>
                    <a href="mailto:contacto@guiatrend.com" target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full group bg-white text-[#FF004F] dark:text-[#FF004F] border-2 border-gray-200 hover:bg-[#3DFFAB] hover:text-[#2E3237] hover:border-[#3DFFAB] focus:bg-[#3DFFAB] focus:text-[#2E3237] focus:border-[#3DFFAB] transition-colors"
                      >
                        <FiMail className="w-5 h-5 mr-2" /> Enviar Correo
                      </Button>
                    </a>
                    <Link href="/contacto">
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="w-full group bg-[#2E3237] dark:bg-[#2E3237] text-white hover:bg-[#00FFFB] hover:text-[#2E3237] focus:bg-[#00FFFB] focus:text-[#2E3237] transition-colors"
                      >
                        <FiBriefcase className="w-5 h-5 mr-2" /> Ver Formulario de Contacto
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Columna Derecha - Imagen/Fondo decorativo */}
                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 h-full rounded-r-2xl overflow-hidden p-8">
                  <Image 
                    src="/images/Open.webp" 
                    alt="Negocio abierto" 
                    width={500}
                    height={500}
                    className="max-w-full max-h-full object-contain rounded-2xl" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}