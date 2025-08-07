import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#181C20] rounded-2xl shadow-xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-primary text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-bold text-center mt-6 mb-4 text-[var(--color-text-dark)] dark:text-white">{title}</h2>}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 