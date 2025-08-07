'use client';
import React, { useState } from 'react';
import { useDirectorioData, DirectorioItem } from '@/hooks/useDirectorioData';
import LugarCard from '@/components/ui/LugarCard';
import WebsiteModal from '@/components/ui/WebsiteModal';
import Modal from '@/components/ui/Modal';
import MapModal from '@/components/ui/MapModal';

interface CiudadDestacadaProps {
  ciudad: string;
}

export default function CiudadDestacada({ ciudad }: CiudadDestacadaProps) {
  const [selectedLugar, setSelectedLugar] = useState<DirectorioItem | null>(null);
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const { data, loading, error } = useDirectorioData(ciudad);

  const handleWebClick = (item: DirectorioItem) => {
    setSelectedLugar(item);
    setIsWebsiteModalOpen(true);
  };

  const handleMapClick = (item: DirectorioItem) => {
    setSelectedLugar(item);
    setIsMapModalOpen(true);
  };

  const handleWhatsAppClick = (whatsappNumber: string) => {
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      {loading && <div className="text-center text-gray-500">Cargando...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <LugarCard
            key={item.id || index}
            nombre={item.nombre}
            imagen={item.imagen}
            descripcion={item.descripcion}
            direccion={item.direccion}
            website={item.website}
            telefono={item.telefono}
            whatsapp={item.whatsapp}
            precios={item.precios}
            horario={item.horario}
            mapa={item.mapa}
            onWebClick={() => item.website && handleWebClick(item)}
            onMapClick={() => item.mapa && handleMapClick(item)}
            onWhatsAppClick={item.whatsapp ? () => handleWhatsAppClick(item.whatsapp!) : undefined}
            onImageClick={() => setSelectedLugar(item)}
          />
        ))}
      </div>

      {/* Modal para mostrar el sitio web */}
      {isWebsiteModalOpen && selectedLugar?.website && (
        <WebsiteModal
          open={isWebsiteModalOpen}
          url={selectedLugar.website}
          onClose={() => setIsWebsiteModalOpen(false)}
        />
      )}

      {/* Modal para mostrar el mapa */}
      {isMapModalOpen && selectedLugar?.mapa && (
        <MapModal
          open={isMapModalOpen}
          url={selectedLugar.mapa}
          onClose={() => setIsMapModalOpen(false)}
          title={`Mapa de ${selectedLugar.nombre}`}
        />
      )}

      {/* Modal para mostrar detalles del lugar al hacer clic en la imagen (si se desea) */}
      <Modal isOpen={!!selectedLugar && !isWebsiteModalOpen && !isMapModalOpen} onClose={() => setSelectedLugar(null)} title={selectedLugar?.nombre}>
        {selectedLugar && (
          <div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">{selectedLugar.descripcion}</p>
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Categoría: {selectedLugar.categoria}</div>
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Dirección: {selectedLugar.direccion}</div>
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Teléfono: {selectedLugar.telefono}</div>
            {selectedLugar.website && selectedLugar.website !== 'NA' && (
              <div className="mb-2 text-sm"><a href={selectedLugar.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">Sitio web</a></div>
            )}
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Horario: {selectedLugar.horario}</div>
            <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Estado: {selectedLugar.estado}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}