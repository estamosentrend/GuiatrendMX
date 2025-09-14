// src/components/ui/ImageLightbox.tsx
import React from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

interface ImageLightboxProps {
  open: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ open, src, alt, onClose }) => {
  if (!open) return null;
  if (!src || typeof src !== 'string' || src.trim() === '' || src.includes('NA') || !src.startsWith('http')) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(25,30,35,0.75)] dark:bg-[rgba(10,15,20,0.85)] transition-all duration-300 animate-fade-in">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 z-10 p-3 rounded-full bg-white/90 dark:bg-[#181C20]/90 text-gray-900 dark:text-white shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all text-2xl"
          aria-label="Cerrar"
        >
          <FiX />
        </button>
        {/* Imagen */}
        <Image
          src={src}
          alt={alt || "Imagen"}
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl bg-white dark:bg-[#181C20] transition-all duration-300 object-contain"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default ImageLightbox;