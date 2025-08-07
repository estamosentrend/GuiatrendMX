'use client';

import React, { useState, useEffect } from 'react';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  city: string;
  category: string;
}

const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Casa de Toño',
    description: 'Auténtica cocina mexicana con más de 50 años de tradición familiar.',
    city: 'guadalajara',
    category: 'Gastronomía',
  },
  {
    id: '2',
    name: 'Pujol Monterrey',
    description: 'Alta cocina mexicana contemporánea del chef Enrique Olvera.',
    city: 'monterrey',
    category: 'Gastronomía',
  }
];

export default function GastronomiaPage() {
  const [restaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = restaurants;
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRestaurants(filtered);
  }, [restaurants, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Gastronomía</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar restaurante..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="border rounded p-4 shadow bg-white dark:bg-[var(--color-bg-dark)]">
            <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{restaurant.description}</p>
            <div className="text-xs text-gray-400 mb-1">{restaurant.category}</div>
            <div className="text-xs text-gray-400">Ciudad: {restaurant.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}