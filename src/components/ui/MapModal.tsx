// src/components/ui/MapModal.tsx
import React from "react";
import { FiX } from "react-icons/fi";

interface MapModalProps {
  open: boolean;
  url: string;
  onClose: () => void;
  title?: string;
}

const MapModal: React.FC<MapModalProps> = ({ open, url, onClose, title }) => {
  if (!open || !url) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(25,30,35,0.95)] dark:bg-[rgba(10,15,20,0.98)] transition-all duration-300 animate-fade-in">
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title || 'Mapa'}</h3>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/90 dark:bg-[#181C20]/90 text-gray-900 dark:text-white shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all text-2xl"
            aria-label="Cerrar"
          >
            <FiX />
          </button>
        </div>
        <iframe
          src={url}
          title={title || "Mapa"}
          className="w-full h-[80vh] rounded-2xl border-0 shadow-xl bg-white dark:bg-[#181C20] transition-all duration-300"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MapModal;