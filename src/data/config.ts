import { City, BusinessCategory, EventCategory, AppConfig, Business } from '@/types';

// Ciudades principales
export const cities: City[] = [
  {
    id: 'monterrey',
    name: 'Monterrey',
    slug: 'monterrey',
    description: 'La Sultana del Norte, centro industrial y cultural del noreste de México.',
    image: '/images/Monterrey.webp',
    coordinates: { lat: 25.6866, lng: -100.3161 },
    isActive: true,
    featured: true,
    metadata: {
      population: 1135512,
      timezone: 'America/Monterrey',
      currency: 'MXN'
    }
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    slug: 'guadalajara',
    description: 'La Perla de Occidente, cuna del mariachi y el tequila.',
    image: '/images/guadalajara.webp',
    coordinates: { lat: 20.6597, lng: -103.3496 },
    isActive: true,
    featured: true,
    metadata: {
      population: 1385629,
      timezone: 'America/Mexico_City',
      currency: 'MXN'
    }
  },
  {
    id: 'cdmx',
    name: 'Ciudad de México',
    slug: 'cdmx',
    description: 'La capital del país, centro político, cultural y económico de México.',
    image: '/images/cdmx.webp',
    coordinates: { lat: 19.4326, lng: -99.1332 },
    isActive: true,
    featured: true,
    metadata: {
      population: 8918653,
      timezone: 'America/Mexico_City',
      currency: 'MXN'
    }
  },
  {
    id: 'cancun',
    name: 'Cancún',
    slug: 'cancun',
    description: 'Paraíso tropical del Caribe mexicano, destino turístico mundial.',
    image: '/images/cancun.webp',
    coordinates: { lat: 21.1619, lng: -86.8515 },
    isActive: true,
    featured: true,
    metadata: {
      population: 628306,
      timezone: 'America/Cancun',
      currency: 'MXN'
    }
  },
  {
    id: 'palenque',
    name: 'Palenque',
    slug: 'palenque',
    description: 'Sitio arqueológico maya y puerta de entrada a la selva chiapaneca.',
    image: '/images/palenque.webp',
    coordinates: { lat: 17.5089, lng: -92.0465 },
    isActive: true,
    featured: true,
    metadata: {
      population: 42947,
      timezone: 'America/Mexico_City',
      currency: 'MXN'
    }
  },
  {
    id: 'puerto-vallarta',
    name: 'Puerto Vallarta',
    slug: 'puerto-vallarta',
    description: 'Destino de playa en el Pacífico mexicano, famoso por su malecón y vida nocturna.',
    image: '/images/puerto-vallarta.webp',
    coordinates: { lat: 20.6534, lng: -105.2253 },
    isActive: true,
    featured: true,
    metadata: {
      population: 275640,
      timezone: 'America/Mexico_City',
      currency: 'MXN'
    }
  },
  {
    id: 'veracruz',
    name: 'Veracruz',
    slug: 'veracruz',
    description: 'Puerto histórico del Golfo de México, cuna del son jarocho.',
    image: '/images/Veracruz.webp',
    coordinates: { lat: 19.1738, lng: -96.1342 },
    isActive: true,
    featured: true,
    metadata: {
      population: 607209,
      timezone: 'America/Mexico_City',
      currency: 'MXN'
    }
  }
];

// Categorías de negocios
export const businessCategories = [
  { id: 'restaurantes' as BusinessCategory, name: 'Restaurantes', icon: '🍽️' },
  { id: 'hoteles' as BusinessCategory, name: 'Hoteles', icon: '🏨' },
  { id: 'turismo' as BusinessCategory, name: 'Turismo', icon: '🗺️' },
  { id: 'bares' as BusinessCategory, name: 'Bares', icon: '🍸' },
  { id: 'servicios' as BusinessCategory, name: 'Servicios', icon: '🛎️' },
  { id: 'eventos' as BusinessCategory, name: 'Eventos', icon: '🎭' },
  { id: 'cartelera' as BusinessCategory, name: 'Cartelera', icon: '🎬' },
  { id: 'promociones' as BusinessCategory, name: 'Promociones', icon: '🎁' }
];

// Categorías de eventos
export const eventCategories = [
  { id: 'conciertos' as EventCategory, name: 'Conciertos', icon: '🎵' },
  { id: 'teatro' as EventCategory, name: 'Teatro', icon: '🎭' },
  { id: 'deportes' as EventCategory, name: 'Deportes', icon: '⚽' },
  { id: 'exposiciones' as EventCategory, name: 'Exposiciones', icon: '🖼️' },
  { id: 'festivales' as EventCategory, name: 'Festivales', icon: '🎪' },
  { id: 'conferencias' as EventCategory, name: 'Conferencias', icon: '🎤' },
  { id: 'gastronómicos' as EventCategory, name: 'Gastronómicos', icon: '👨‍🍳' },
  { id: 'culturales' as EventCategory, name: 'Culturales', icon: '🏛️' }
];

// Configuración de la aplicación
export const appConfig: AppConfig = {
  cities,
  categories: {
    business: businessCategories,
    events: eventCategories
  },
  features: {
    aiItineraries: true,
    payments: true,
    reviews: true,
    favorites: true,
    notifications: true
  }
};

// Funciones de utilidad
export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};

export const getCityBySlug = (slug: string): City | undefined => {
  return cities.find(city => city.slug === slug);
};

export const getBusinessCategoryById = (id: BusinessCategory) => {
  return businessCategories.find(cat => cat.id === id);
};

export const getEventCategoryById = (id: EventCategory) => {
  return eventCategories.find(cat => cat.id === id);
};

// Datos de ejemplo para desarrollo
export const sampleBusinesses: Business[] = [
  {
    id: 'rest-001',
    name: 'La Docena Providencia',
    slug: 'la-docena-providencia',
    description: 'Restaurante de mariscos y pescados frescos con ambiente casual y familiar.',
    shortDescription: 'Mariscos frescos en ambiente familiar',
    category: 'restaurantes' as BusinessCategory,
    subcategory: 'Mariscos',
    cityId: 'guadalajara',
    address: {
      street: 'Av. Providencia',
      number: '1234',
      colony: 'Providencia',
      city: 'Guadalajara',
      state: 'Jalisco',
      zipCode: '44630',
      coordinates: { lat: 20.6597, lng: -103.3496 }
    },
    contact: {
      phone: '+52 33 1234 5678',
      website: 'https://ladocena.com',
      socialMedia: {
        instagram: '@ladocena_gdl'
      }
    },
    images: ['/images/restaurants/la-docena-1.jpg'],
    rating: 4.5,
    reviewCount: 234,
    priceRange: 2 as const,
    features: ['Terraza', 'Estacionamiento', 'Pet Friendly'],
    schedule: {
      monday: { isOpen: true, openTime: '12:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '12:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '12:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '12:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '12:00', closeTime: '23:00' },
      saturday: { isOpen: true, openTime: '12:00', closeTime: '23:00' },
      sunday: { isOpen: true, openTime: '12:00', closeTime: '21:00' }
    },
    isActive: true,
    isFeatured: true,
    isPremium: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'hotel-001',
    name: 'Hotel Fiesta Americana Monterrey',
    slug: 'hotel-fiesta-americana-monterrey',
    description: 'Hotel de lujo en el corazón de Monterrey con todas las comodidades para viajeros de negocios y placer.',
    shortDescription: 'Hotel de lujo en el centro de Monterrey',
    category: 'hoteles' as BusinessCategory,
    subcategory: 'Hotel de Lujo',
    cityId: 'monterrey',
    address: {
      street: 'Av. Constitución',
      number: '300',
      colony: 'Centro',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64000',
      coordinates: { lat: 25.6866, lng: -100.3161 }
    },
    contact: {
      phone: '+52 81 8319 6000',
      website: 'https://fiestamericana.com',
      socialMedia: {
        instagram: '@fiestaamericana'
      }
    },
    images: ['/images/hotels/fiesta-americana-1.jpg'],
    rating: 4.3,
    reviewCount: 456,
    priceRange: 3 as const,
    features: ['WiFi gratuito', 'Piscina', 'Gimnasio', 'Spa', 'Restaurante'],
    schedule: {
      monday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      tuesday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      wednesday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      thursday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      friday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      saturday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      sunday: { isOpen: true, openTime: '00:00', closeTime: '23:59' }
    },
    isActive: true,
    isFeatured: true,
    isPremium: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'rest-002',
    name: 'Pujol',
    slug: 'pujol-cdmx',
    description: 'Restaurante de alta cocina mexicana contemporánea dirigido por el chef Enrique Olvera.',
    shortDescription: 'Alta cocina mexicana contemporánea',
    category: 'restaurantes' as BusinessCategory,
    subcategory: 'Alta Cocina',
    cityId: 'cdmx',
    address: {
      street: 'Tennyson',
      number: '133',
      colony: 'Polanco',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '11560',
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    contact: {
      phone: '+52 55 5545 4111',
      website: 'https://pujol.com.mx',
      socialMedia: {
        instagram: '@pujolrestaurant'
      }
    },
    images: ['/images/restaurants/pujol-1.jpg'],
    rating: 4.8,
    reviewCount: 892,
    priceRange: 4 as const,
    features: ['Reservación requerida', 'Menú degustación', 'Valet parking'],
    schedule: {
      monday: { isOpen: false },
      tuesday: { isOpen: true, openTime: '13:30', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '13:30', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '13:30', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '13:30', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '13:30', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '13:30', closeTime: '21:00' }
    },
    isActive: true,
    isFeatured: true,
    isPremium: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'hotel-002',
    name: 'Hotel Xcaret México',
    slug: 'hotel-xcaret-mexico',
    description: 'Resort todo incluido sustentable en la Riviera Maya con acceso a parques Xcaret.',
    shortDescription: 'Resort todo incluido sustentable',
    category: 'hoteles' as BusinessCategory,
    subcategory: 'Resort',
    cityId: 'cancun',
    address: {
      street: 'Carretera Chetumal-Puerto Juárez',
      number: 'Km 282',
      colony: 'Solidaridad',
      city: 'Playa del Carmen',
      state: 'Quintana Roo',
      zipCode: '77710',
      coordinates: { lat: 21.1619, lng: -86.8515 }
    },
    contact: {
      phone: '+52 984 206 3000',
      website: 'https://hotelxcaret.com',
      socialMedia: {
        instagram: '@hotelxcaretmexico'
      }
    },
    images: ['/images/hotels/xcaret-1.jpg'],
    rating: 4.7,
    reviewCount: 1234,
    priceRange: 4 as const,
    features: ['Todo incluido', 'Playa privada', 'Múltiples restaurantes', 'Spa', 'Actividades acuáticas'],
    schedule: {
      monday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      tuesday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      wednesday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      thursday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      friday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      saturday: { isOpen: true, openTime: '00:00', closeTime: '23:59' },
      sunday: { isOpen: true, openTime: '00:00', closeTime: '23:59' }
    },
    isActive: true,
    isFeatured: true,
    isPremium: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'rest-003',
    name: 'Tacos El Güero',
    slug: 'tacos-el-guero',
    description: 'Taquería tradicional con los mejores tacos al pastor de la ciudad.',
    shortDescription: 'Tacos al pastor tradicionales',
    category: 'restaurantes' as BusinessCategory,
    subcategory: 'Comida Rápida',
    cityId: 'monterrey',
    address: {
      street: 'Av. Universidad',
      number: '456',
      colony: 'Del Valle',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '64140',
      coordinates: { lat: 25.6866, lng: -100.3161 }
    },
    contact: {
      phone: '+52 81 8123 4567'
    },
    images: ['/images/restaurants/tacos-guero-1.jpg'],
    rating: 4.2,
    reviewCount: 156,
    priceRange: 1 as const,
    features: ['Para llevar', 'Servicio rápido', 'Económico'],
    schedule: {
      monday: { isOpen: true, openTime: '18:00', closeTime: '02:00' },
      tuesday: { isOpen: true, openTime: '18:00', closeTime: '02:00' },
      wednesday: { isOpen: true, openTime: '18:00', closeTime: '02:00' },
      thursday: { isOpen: true, openTime: '18:00', closeTime: '02:00' },
      friday: { isOpen: true, openTime: '18:00', closeTime: '03:00' },
      saturday: { isOpen: true, openTime: '18:00', closeTime: '03:00' },
      sunday: { isOpen: true, openTime: '18:00', closeTime: '01:00' }
    },
    isActive: true,
    isFeatured: false,
    isPremium: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export default appConfig;