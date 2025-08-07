// src/components/ui/LinkExterno.tsx
import React, { useState } from "react";
import WebsiteModal from "./WebsiteModal";

interface LinkExternoProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const isExternal = (url: string) => /^https?:\/\//i.test(url);

const LinkExterno: React.FC<LinkExternoProps> = ({ href, children, className }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!isExternal(href)) {
    // Enlace interno, comportamiento normal
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={e => {
          e.preventDefault();
          setModalOpen(true);
        }}
      >
        {children}
      </button>
      <WebsiteModal open={modalOpen} url={href} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default LinkExterno; 