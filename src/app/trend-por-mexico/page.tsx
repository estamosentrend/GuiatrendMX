// src/app/trend-por-mexico/page.tsx
import React from 'react';

const TrendPorMexicoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181C20] to-[#2E3237] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF004F] to-[#FF7A00]">
          Trend por México
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Descubre las tendencias y los lugares más populares de México a través de nuestra seccion especial.
        </p>
        <div className="bg-white/10 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-[rgba(255,255,255,0.1)]">
          <p className="text-gray-400">
            Esta sección está en construcción. Pronto te mostraremos los destinos y experiencias más trending del momento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendPorMexicoPage;