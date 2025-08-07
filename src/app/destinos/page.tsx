'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui';
import CiudadDestacada from '@/components/sections/CiudadDestacada';

const ciudades = [
  { key: 'monterrey', label: 'Monterrey' },
  { key: 'guadalajara', label: 'Guadalajara' },
  { key: 'cdmx', label: 'CDMX' },
  { key: 'cancun', label: 'Cancún' },
  { key: 'palenque', label: 'Palenque' },
  { key: 'puertoVallarta', label: 'Puerto Vallarta' },
  { key: 'veracruz', label: 'Veracruz' },
];

export default function DestinosPage() {
  const [ciudad, setCiudad] = useState(ciudades[0].key);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Destinos</h1>
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
      <CiudadDestacada ciudad={ciudad} />
    </div>
  );
}
