// src/components/ui/WebsiteModal.tsx
import React from "react";
import { FiX } from "react-icons/fi";

interface WebsiteModalProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

const isValidHttpUrl = (url: string) => /^https:\/\//i.test(url) || /^http:\/\//i.test(url);

const WebsiteModal: React.FC<WebsiteModalProps> = ({ open, url, onClose }) => {
  if (!open) return null;
  if (!url || url.trim() === '' || url.trim().toUpperCase() === 'NA' || !isValidHttpUrl(url)) {
    // Si la URL no es válida, se podría mostrar un mensaje en lugar de no renderizar nada.
    // Por ahora, mantenemos el comportamiento de no renderizar.
    console.warn(`URL no válida o no segura para WebsiteModal: ${url}`);
    return null;
  }
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(25,30,35,0.95)] dark:bg-[rgba(10,15,20,0.98)] transition-all duration-300 animate-fade-in">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 z-10 p-3 rounded-full bg-white/90 dark:bg-[#181C20]/90 text-gray-900 dark:text-white shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all text-2xl"
          aria-label="Cerrar"
        >
          <FiX />
        </button>
        {/* Iframe del sitio web */}
        <iframe
          src={url}
          title="Sitio web externo"
          className="w-full h-full rounded-2xl border-0 shadow-xl bg-white dark:bg-[#181C20] transition-all duration-300"
          style={{ minHeight: '90vh', minWidth: '90vw' }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default WebsiteModal; 