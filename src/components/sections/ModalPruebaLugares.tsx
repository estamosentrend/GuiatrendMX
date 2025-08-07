// src/components/sections/ModalPruebaLugares.tsx
import React from "react";
import LugarCard from "../ui/LugarCard";

const lugaresPrueba = [
  {
    nombre: "Parque Fundidora",
    imagen: "/public/images/parque fundidora.webp",
    descripcion: "Un icónico parque urbano de Monterrey, ideal para paseos, conciertos y actividades al aire libre.",
    direccion: "Av. Fundidora y Adolfo Prieto S/N, Obrera, 64010 Monterrey, N.L.",
    website: "https://parquefundidora.org/",
    telefono: "+528183410000",
    whatsapp: "528183410000"
  },
  {
    nombre: "Museo de Historia Mexicana",
    imagen: "/public/images/Monterrey.webp",
    descripcion: "Museo interactivo con exposiciones sobre la historia y cultura de México, ubicado en el centro de Monterrey.",
    direccion: "Dr. Coss 445, Centro, 64000 Monterrey, N.L.",
    website: "https://www.3museos.com/",
    telefono: "+528183420000",
    whatsapp: "528183420000"
  }
];

interface ModalPruebaLugaresProps {
  open: boolean;
  onClose: () => void;
}

const ModalPruebaLugares: React.FC<ModalPruebaLugaresProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-3xl mx-auto my-8 rounded-3xl shadow-2xl bg-white/80 dark:bg-[#181C20]/80 border border-white/30 dark:border-gray-800/60 backdrop-blur-lg overflow-hidden animate-fade-in p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="text-2xl text-gray-700 dark:text-gray-200">×</span>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-dark)] dark:text-white text-center">Lugares destacados en Monterrey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lugaresPrueba.map((lugar, idx) => (
            <LugarCard key={idx} {...lugar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalPruebaLugares; 