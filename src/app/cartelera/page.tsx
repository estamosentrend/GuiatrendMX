'use client';

import React, { useState, useEffect } from 'react';

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration: number;
  rating: number;
  classification: string;
  releaseDate: string;
  director: string;
  cast: string[];
  poster: string;
  isNewRelease: boolean;
  isComingSoon: boolean;
  cinemas: { city: string; prices: { regular: number } }[];
}

const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'Guardianes de la Galaxia Vol. 3',
    description: 'Peter Quill debe reunir a su equipo para defender el universo y proteger a uno de los suyos.',
    genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
    duration: 150,
    rating: 8.2,
    classification: 'B',
    releaseDate: '2024-05-05',
    director: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista'],
    poster: '/images/movies/guardians-3.jpg',
    isNewRelease: true,
    isComingSoon: false,
    cinemas: [
      {
        city: 'monterrey',
        prices: { regular: 85 }
      },
      {
        city: 'guadalajara',
        prices: { regular: 80 }
      }
    ]
  },
  {
    id: '2',
    title: 'Spider-Man: A Través del Spider-Verso',
    description: 'Miles Morales regresa para la próxima aventura del Spider-Verso.',
    genre: ['Animación', 'Acción', 'Aventura'],
    duration: 140,
    rating: 9.1,
    classification: 'A',
    releaseDate: '2024-06-02',
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
    poster: '/images/movies/spiderverse.jpg',
    isNewRelease: true,
    isComingSoon: false,
    cinemas: [
      {
        city: 'cdmx',
        prices: { regular: 90 }
      }
    ]
  },
  {
    id: '3',
    title: 'Indiana Jones y el Dial del Destino',
    description: 'La última aventura del arqueólogo más famoso del cine.',
    genre: ['Aventura', 'Acción'],
    duration: 154,
    rating: 7.8,
    classification: 'B',
    releaseDate: '2024-06-30',
    director: 'James Mangold',
    cast: ['Harrison Ford', 'Phoebe Waller-Bridge', 'Mads Mikkelsen'],
    poster: '/images/movies/indiana-jones.jpg',
    isNewRelease: false,
    isComingSoon: true,
    cinemas: []
  }
];

export default function CarteleraPage() {
  const [movies] = useState<Movie[]>(sampleMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(sampleMovies);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = movies;
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredMovies(filtered);
  }, [movies, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Cartelera</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="border rounded p-4 shadow bg-white dark:bg-[var(--color-bg-dark)]">
            <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{movie.description}</p>
            <div className="text-xs text-gray-400 mb-1">{movie.genre.join(', ')}</div>
            <div className="text-xs text-gray-400">Duración: {movie.duration} min</div>
            <div className="text-xs text-gray-400">Clasificación: {movie.classification}</div>
            <div className="text-xs text-gray-400">Director: {movie.director}</div>
          </div>
        ))}
      </div>
    </div>
  );
}