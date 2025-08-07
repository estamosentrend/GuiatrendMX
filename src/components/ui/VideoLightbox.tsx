import React from 'react';

interface VideoLightboxProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  // VMvideo (ejemplo genérico, ajustar si hay formato específico)
  const vmMatch = url.match(/vmvideo\.com\/([\w-]+)/);
  if (vmMatch) {
    return `https://www.vmvideo.com/embed/${vmMatch[1]}`;
  }
  return null;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({ open, url, onClose }) => {
  if (!open) return null;
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(25,30,35,0.95)] dark:bg-[rgba(10,15,20,0.98)] transition-all duration-300 animate-fade-in">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 z-10 p-3 rounded-full bg-white/90 dark:bg-[#181C20]/90 text-gray-900 dark:text-white shadow-lg hover:bg-[#3DFFAB] hover:text-[#181C20] dark:hover:bg-[#3DFFAB] dark:hover:text-[#181C20] transition-all text-2xl"
          aria-label="Cerrar"
        >
          ×
        </button>
        {/* Iframe del video */}
        <iframe
          src={embedUrl}
          title="Video"
          className="w-full h-full rounded-2xl border-0 shadow-xl bg-black/90 transition-all duration-300"
          style={{ minHeight: '80vh', minWidth: '80vw' }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoLightbox; 