'use client';

import React, { useState, useEffect } from 'react';

interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  category: string;
}

const sampleHotels: Hotel[] = [
  // ... (puedes dejar algunos datos de ejemplo aquí)
];

export default function HospedajePage() {
  const [hotels] = useState<Hotel[]>(sampleHotels);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(sampleHotels);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = hotels;
    if (searchQuery) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredHotels(filtered);
  }, [hotels, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Hospedaje</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar hotel..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="border rounded p-4 shadow bg-white dark:bg-[var(--color-bg-dark)]">
            <h3 className="font-bold text-lg mb-2">{hotel.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{hotel.description}</p>
            <div className="text-xs text-gray-400 mb-1">{hotel.category}</div>
            <div className="text-xs text-gray-400">Ciudad: {hotel.city}</div>
          </div>
        ))}
      </div>
    </div>
  );
}