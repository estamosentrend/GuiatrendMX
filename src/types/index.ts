// Tipos básicos del sistema
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  type: 'standard' | 'logged' | 'subscriber' | 'business';
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
  subscription?: Subscription;
}

export interface UserPreferences {
  language: 'es' | 'en';
  theme: 'light' | 'dark';
  notifications: boolean;
  favoriteCategories: string[];
  favoriteCities: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  type: 'free_trial' | 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  stripeSubscriptionId?: string;
}

// Tipos de ubicación
export interface City {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  featured: boolean;
  metadata: {
    population?: number;
    timezone: string;
    currency: string;
  };
}

export interface Colony {
  id: string;
  name: string;
  cityId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

// Tipos de negocio/lugar
export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: BusinessCategory;
  subcategory?: string;
  cityId: string;
  colonyId?: string;
  address: {
    street: string;
    number: string;
    colony: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      tiktok?: string;
    };
  };
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4; // $ $$ $$$ $$$$
  features: string[];
  schedule: BusinessSchedule;
  isActive: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  subscription?: BusinessSubscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessSchedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "22:00"
  breaks?: {
    startTime: string;
    endTime: string;
  }[];
}

export interface BusinessSubscription {
  id: string;
  businessId: string;
  type: 'free_trial' | 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  features: string[];
  stripeSubscriptionId?: string;
}

// Categorías de negocio
export type BusinessCategory = 
  | 'restaurantes'
  | 'hoteles'
  | 'turismo'
  | 'bares'
  | 'servicios'
  | 'eventos'
  | 'cartelera'
  | 'promociones';

// Tipos de eventos
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  cityId: string;
  venueId?: string; // ID del negocio donde se realiza
  images: string[];
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  price: {
    min: number;
    max?: number;
    currency: string;
    isFree: boolean;
  };
  ticketUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EventCategory = 
  | 'conciertos'
  | 'teatro'
  | 'deportes'
  | 'exposiciones'
  | 'festivales'
  | 'conferencias'
  | 'gastronómicos'
  | 'culturales';

// Tipos de cartelera (cine)
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  genre: string[];
  duration: number; // en minutos
  rating: string; // "A", "B", "C", etc.
  director: string;
  cast: string[];
  poster: string;
  trailer?: string;
  releaseDate: Date;
  isActive: boolean;
  showtimes: Showtime[];
}

export interface Cinema {
  id: string;
  name: string;
  cityId: string;
  address: {
    street: string;
    colony: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    website?: string;
  };
  isActive: boolean;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  date: Date;
  time: string;
  price: number;
  format: '2D' | '3D' | 'IMAX' | '4DX';
  language: 'español' | 'subtitulada' | 'doblada';
  availableSeats: number;
  totalSeats: number;
}

// Tipos de reseñas
export interface Review {
  id: string;
  userId: string;
  businessId?: string;
  eventId?: string;
  movieId?: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

// Tipos de favoritos
export interface Favorite {
  id: string;
  userId: string;
  type: 'business' | 'event' | 'movie';
  itemId: string;
  createdAt: Date;
}

// Tipos de búsqueda
export interface SearchFilters {
  query?: string;
  city?: string;
  category?: BusinessCategory | EventCategory;
  priceRange?: number[];
  rating?: number;
  features?: string[];
  isOpen?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
    radius: number; // en km
  };
  sortBy?: 'relevance' | 'rating' | 'distance' | 'price' | 'newest';
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Tipos de itinerarios (IA)
export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  description: string;
  cityId: string;
  duration: number; // días
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  preferences: {
    categories: BusinessCategory[];
    priceRange: number;
    groupSize: number;
    interests: string[];
  };
  days: ItineraryDay[];
  isPublic: boolean;
  isAIGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: ItineraryActivity[];
  estimatedCost: number;
}

export interface ItineraryActivity {
  id: string;
  businessId?: string;
  eventId?: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  estimatedCost: number;
  notes?: string;
  audioUrl?: string; // Para audio interactivo
}

// Tipos de API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

// Tipos de configuración
export interface AppConfig {
  cities: City[];
  categories: {
    business: { id: BusinessCategory; name: string; icon: string }[];
    events: { id: EventCategory; name: string; icon: string }[];
  };
  features: {
    aiItineraries: boolean;
    payments: boolean;
    reviews: boolean;
    favorites: boolean;
    notifications: boolean;
  };
}