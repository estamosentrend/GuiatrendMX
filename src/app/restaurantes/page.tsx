'use client';
import React, { useState } from 'react';
import { useDirectorioData, DirectorioItem } from '@/hooks/useDirectorioData';
import { Card, CardContent, Modal, Button } from '@/components/ui';

const ciudades = [
  { key: 'monterrey', label: 'Monterrey' },
  { key: 'guadalajara', label: 'Guadalajara' },
  { key: 'cdmx', label: 'CDMX' },
  { key: 'cancun', label: 'Cancún' },
  { key: 'palenque', label: 'Palenque' },
  { key: 'puertoVallarta', label: 'Puerto Vallarta' },
  { key: 'veracruz', label: 'Veracruz' },
];

export default function RestaurantesPage() {
  const [ciudad, setCiudad] = useState(ciudades[0].key);
  const [selected, setSelected] = useState<DirectorioItem | null>(null);
  const { data, loading, error } = useDirectorioData(ciudad, 'Restaurante');

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Restaurantes</h1>
      <div className="flex gap-2 mb-8 flex-wrap">
        {ciudades.map((c) => (
          <Button
            key={c.key}
            variant={ciudad === c.key ? 'primary' : 'secondary'}
            onClick={() => setCiudad(c.key)}
          >
            {c.label}
          </Button>
        ))}
      </div>
      {loading && <div className="text-center text-gray-500">Cargando...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:shadow-xl transition" onClick={() => setSelected(item)}>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.nombre}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.descripcion}</p>
              <div className="text-xs text-gray-400 mb-1">{item.categoria}</div>
              <div className="text-xs text-gray-400">{item.direccion}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.nombre}>
        {selected && (
          <div>
            <p className="mb-2 text-gray-700">{selected.descripcion}</p>
            <div className="mb-2 text-sm text-gray-500">Categoría: {selected.categoria}</div>
            <div className="mb-2 text-sm text-gray-500">Dirección: {selected.direccion}</div>
            <div className="mb-2 text-sm text-gray-500">Teléfono: {selected.telefono}</div>
            {selected.website && selected.website !== 'NA' && (
              <div className="mb-2 text-sm"><a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">Sitio web</a></div>
            )}
            <div className="mb-2 text-sm text-gray-500">Horario: {selected.horario}</div>
            <div className="mb-2 text-sm text-gray-500">Estado: {selected.estado}</div>
          </div>
        )}
      </Modal>
    </div>
  );
} 