'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FiMapPin, FiCoffee, FiHome, FiAlertCircle, FiBookOpen, FiTool, FiHome as FiBuilding, FiTag } from 'react-icons/fi';
import DestinosModal from './DestinosModal';
import CategoriaModal from './CategoriaModal';

const directorioCategories = [
  {
    id: 1,
    name: 'Destinos',
    description: 'Explora los mejores destinos turísticos',
    icon: FiMapPin,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    href: '/destinos',
  },
  {
    id: 2,
    name: 'Gastronomia',
    description: 'Descubre la mejor comida y restaurantes',
    icon: FiCoffee,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    href: '/gastronomia',
  },
  {
    id: 3,
    name: 'Hospedaje',
    description: 'Encuentra hoteles y alojamientos',
    icon: FiHome,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    href: '/hospedaje',
  },
  {
    id: 4,
    name: 'Emergencias',
    description: 'Contactos y servicios de emergencia',
    icon: FiAlertCircle,
    color: 'from-red-400 to-pink-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600 dark:text-red-400',
    href: '/emergencias',
  },
  {
    id: 5,
    name: 'Directorio',
    description: 'Directorio general de servicios',
    icon: FiBookOpen,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    href: '/directorio',
  },
  {
    id: 6,
    name: 'Servicios',
    description: 'Servicios útiles para tu viaje',
    icon: FiTool,
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-600 dark:text-teal-400',
    href: '/servicios',
  },
  {
    id: 7,
    name: 'Inmuebles',
    description: 'Renta y venta de inmuebles',
    icon: FiBuilding,
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    href: '/inmuebles',
  },
  {
    id: 8,
    name: 'Promociones',
    description: 'Ofertas y promociones exclusivas',
    icon: FiTag,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    textColor: 'text-pink-600 dark:text-pink-400',
    href: '/promociones',
  },
];

export default function DirectorioSection() {
  const [openDestinosModal, setOpenDestinosModal] = React.useState(false);
  const [openCategoriaModal, setOpenCategoriaModal] = React.useState(false);
  const [categoriaActiva, setCategoriaActiva] = React.useState('');
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="primary" className="mb-4">
          Categorías
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
          Acceso rápido a categorías clave
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Encuentra fácilmente la información y servicios más importantes para tu viaje o estancia.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
        {directorioCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.id} className="group">
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
                  <div className="flex">
                    <button 
                      className="flex-1 py-1.5 px-3 rounded-xl text-sm font-medium transition-all duration-300
                        bg-gradient-to-r from-primary to-primary-light text-white hover:from-[#3DFFAB] hover:to-[#3DFFAB] hover:text-[#2E3237]
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                        transform hover:scale-105 active:scale-95"
                      onClick={() => {
                        if (category.name === 'Destinos') {
                          setOpenDestinosModal(true);
                        } else {
                          setCategoriaActiva(category.name);
                          setOpenCategoriaModal(true);
                        }
                      }}
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
      <DestinosModal open={openDestinosModal} onClose={() => setOpenDestinosModal(false)} />
      <CategoriaModal 
        open={openCategoriaModal} 
        onClose={() => setOpenCategoriaModal(false)} 
        categoria={categoriaActiva}
      />
    </div>
  );
}
