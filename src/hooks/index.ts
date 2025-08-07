import { useState, useEffect } from 'react';
import { Business, SearchFilters } from '@/types';
import { sampleBusinesses } from '@/data/config';

// Hook para búsqueda de negocios
import { useCallback } from 'react';

export function useBusinessSearch(initialFilters: SearchFilters = {}) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const searchBusinesses = useCallback(async (newFilters: SearchFilters) => {
    setLoading(true);
    setError(null);
    setFilters(newFilters);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredBusinesses = [...sampleBusinesses];

      if (newFilters.query) {
        const query = newFilters.query.toLowerCase();
        filteredBusinesses = filteredBusinesses.filter(
          business =>
            business.name.toLowerCase().includes(query) ||
            business.description.toLowerCase().includes(query) ||
            business.features.some(feature => feature.toLowerCase().includes(query))
        );
      }

      if (newFilters.city) {
        filteredBusinesses = filteredBusinesses.filter(
          business => business.cityId === newFilters.city
        );
      }

      if (newFilters.category) {
        filteredBusinesses = filteredBusinesses.filter(
          business => business.category === newFilters.category
        );
      }

      if (newFilters.rating) {
        filteredBusinesses = filteredBusinesses.filter(
          business => business.rating >= newFilters.rating!
        );
      }

      if (newFilters.priceRange && newFilters.priceRange.length === 2) {
        filteredBusinesses = filteredBusinesses.filter(
          business =>
            business.priceRange >= newFilters.priceRange![0] &&
            business.priceRange <= newFilters.priceRange![1]
        );
      }

      if (newFilters.sortBy) {
        switch (newFilters.sortBy) {
          case 'rating':
            filteredBusinesses.sort((a, b) => b.rating - a.rating);
            break;
          case 'price':
            filteredBusinesses.sort((a, b) => a.priceRange - b.priceRange);
            break;
          case 'newest':
            filteredBusinesses.sort((a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
          default:
            break;
        }
      }

      setBusinesses(filteredBusinesses);
      setTotal(filteredBusinesses.length);
    } catch (err) {
      setError('Error al buscar negocios');
      console.error('Error searching businesses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setBusinesses([]);
    setFilters({});
    setError(null);
    setTotal(0);
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length) {
      searchBusinesses(filters);
    }
  }, [filters, searchBusinesses]);

  return {
    businesses,
    loading,
    error,
    total,
    searchBusinesses,
    clearSearch,
    filters
  };
}

// Hook para obtener un negocio por ID
export function useBusiness(id: string) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulación de API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundBusiness = sampleBusinesses.find(b => b.id === id) as Business | undefined;
        
        if (foundBusiness) {
          setBusiness(foundBusiness);
        } else {
          setError('Negocio no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el negocio');
        console.error('Error fetching business:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  return { business, loading, error };
}

// Hook para favoritos
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Cargar favoritos del localStorage
    const savedFavorites = localStorage.getItem('guiatrend_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }
  }, []);

  const addFavorite = (businessId: string) => {
    const newFavorites = [...favorites, businessId];
    setFavorites(newFavorites);
    localStorage.setItem('guiatrend_favorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (businessId: string) => {
    const newFavorites = favorites.filter(id => id !== businessId);
    setFavorites(newFavorites);
    localStorage.setItem('guiatrend_favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (businessId: string) => {
    if (favorites.includes(businessId)) {
      removeFavorite(businessId);
    } else {
      addFavorite(businessId);
    }
  };

  const isFavorite = (businessId: string) => favorites.includes(businessId);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
}

// Hook para geolocalización
export function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        setError('Error al obtener ubicación');
        setLoading(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutos
      }
    );
  };

  return {
    location,
    loading,
    error,
    getCurrentLocation
  };
}

// Hook para manejo de formularios
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: unknown) => string | null>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = (name: keyof T, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Validar campo si hay reglas
    if (validationRules && validationRules[name]) {
      const error = validationRules[name]!(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validate = (): boolean => {
    if (!validationRules) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(key => {
      const fieldName = key as keyof T;
      const validator = validationRules[fieldName];
      if (validator) {
        const error = validator(values[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    validate,
    reset
  };
}

// Hook para debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err);
    }
  };

  return [storedValue, setValue] as const;
}