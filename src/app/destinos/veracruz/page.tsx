import React from 'react';
import CiudadDestacada from '@/components/sections/CiudadDestacada';

export default function DestinoVeracruzPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Veracruz</h1>
      <CiudadDestacada ciudad="veracruz" />
    </div>
  );
}