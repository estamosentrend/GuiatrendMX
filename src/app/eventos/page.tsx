'use client';

import React, { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  city: string;
  category: string;
}

const sampleEvents: Event[] = [
  // ... (puedes dejar algunos datos de ejemplo aquí)
];

export default function EventosPage() {
  const [events] = useState<Event[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(sampleEvents);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [events, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Eventos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar evento..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="border rounded p-4 shadow bg-white dark:bg-[var(--color-bg-dark)]">
            <h3 className="font-bold text-lg mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
            <div className="text-xs text-gray-400 mb-1">{event.category}</div>
            <div className="text-xs text-gray-400">Ciudad: {event.city}</div>
            <div className="text-xs text-gray-400">Fecha: {event.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}