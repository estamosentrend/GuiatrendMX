'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiHeart } from 'react-icons/fi';
import WebsiteModal from '../ui/WebsiteModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Destinos',
      links: [
        { name: 'Monterrey', href: '/destinos/monterrey' },
        { name: 'Guadalajara', href: '/destinos/guadalajara' },
        { name: 'Ciudad de México', href: '/destinos/cdmx' },
        { name: 'Cancún', href: '/destinos/cancun' },
        { name: 'Puerto Vallarta', href: '/destinos/puerto-vallarta' },
        { name: 'Veracruz', href: '/destinos/veracruz' },
      ]
    },
    {
      title: 'Servicios',
      links: [
        { name: 'Restaurantes', href: '/restaurantes' },
        { name: 'Hoteles', href: '/hoteles' },
        { name: 'Eventos', href: '/eventos' },
        { name: 'Tours', href: '/tours' },
        { name: 'Guías Locales', href: '/guias' },
        { name: 'Experiencias', href: '/experiencias' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Acerca de', href: '/acerca' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contacto', href: '/contacto' },
        { name: 'Trabaja con nosotros', href: '/carreras' },
        { name: 'Prensa', href: '/prensa' },
        { name: 'Socios', href: '/socios' },
      ]
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Centro de Ayuda', href: '/ayuda' },
        { name: 'Términos de Servicio', href: '/terminos' },
        { name: 'Política de Privacidad', href: '/privacidad' },
        { name: 'Cookies', href: '/cookies' },
        { name: 'Reportar Problema', href: '/reportar' },
        { name: 'FAQ', href: '/faq' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: FiInstagram, href: 'https://instagram.com/estamosentrend' },
    { name: 'Facebook', icon: FiFacebook, href: 'https://www.facebook.com/Revistaestamosentrend/' },
    { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/estamosentrend' },
    { name: 'YouTube', icon: FiYoutube, href: 'https://youtube.com/estamosentrend' },
  ];

  const [isWebModalOpen, setIsWebModalOpen] = useState(false);

  return (
    <footer className="bg-gradient-to-br from-[#0f1419] via-[#191e23] to-[#0f1419] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-primary-hover transition-all duration-300 group-hover:scale-110">
                <FiMapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-white">GUIA</span>
                  <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">TREND</span>
                </h2>
                <p className="text-sm text-gray-400 -mt-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-[180px] max-w-full">
                  Guía Turística & Comercial
                </p>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Descubre los mejores destinos, restaurantes, hoteles y experiencias en las principales ciudades de México con nuestra guía turística integral.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <FiMail className="w-4 h-4 text-primary" />
                <span>estamosentrend@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <FiPhone className="w-4 h-4 text-primary" />
                <span>+52 (56) 6582 8832</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-gray-700/50 bg-[#090B0D]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span> {currentYear} GUIATREND. Todos los derechos reservados by 
                <button
                  type="button"
                  className="font-bold text-[#FF004F] underline hover:opacity-80 focus:outline-none ml-1 mr-1"
                  onClick={() => setIsWebModalOpen(true)}
                >
                  Estamosentrend
                </button>
                . Hecho con
              </span>
              <FiHeart className="w-4 h-4 text-primary" />
              <span>en México</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary hover:bg-[#3DFFAB] border border-primary hover:border-[#3DFFAB] rounded-lg flex items-center justify-center text-white hover:text-[#2E3237] transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <WebsiteModal open={isWebModalOpen} url="https://revistaestamosentrend.com/" onClose={() => setIsWebModalOpen(false)} />
    </footer>
  );
};

export default Footer;