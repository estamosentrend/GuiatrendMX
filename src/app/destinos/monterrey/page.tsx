import React from 'react';
import CiudadDestacada from '@/components/sections/CiudadDestacada';

export default function DestinoMonterreyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Monterrey</h1>
      <CiudadDestacada ciudad="monterrey" />
    </div>
  );
}