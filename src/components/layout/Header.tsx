'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { FiSun, FiMoon, FiMenu, FiX, FiSearch, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface MenuItem {
  name: string;
  href: string;
  submenu?: Array<{
    name: string;
    href: string;
    icon?: ReactNode;
  }>;
}

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const navigation: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Categorías', href: '/directorio' },
    { 
      name: 'Destinos', 
      href: '/destinos',
      submenu: [
        { name: 'Monterrey', href: '/destinos/monterrey' },
        { name: 'Guadalajara', href: '/destinos/guadalajara' },
        { name: 'CDMX', href: '/destinos/cdmx' },
        { name: 'Cancún', href: '/destinos/cancun' },
        { name: 'Puerto Vallarta', href: '/destinos/puerto-vallarta' },
        { name: 'Veracruz', href: '/destinos/veracruz' },
        { name: 'Ver todos...', href: '/destinos' }
      ]
    },
    { 
      name: 'Experiencias', 
      href: '/experiencias',
      submenu: [
        { 
          name: 'Itinerarios VIP', 
          href: '/itinerarios-vip',
          icon: (
            <svg className="w-4 h-4 inline-block mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )
        }
      ]
    },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Cartelera', href: '/cartelera' },
    { 
      name: 'Blog', 
      href: '/blog',
      submenu: [
        { name: 'Trend Por México', href: '/trend-por-mexico' },
        { name: 'Revista Estamosentrend', href: 'https://revistaestamosentrend.com/' }
      ]
    },
    { name: 'Contacto', href: '/contacto' },
  ];
  
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };
  
  const closeAllMenus = () => {
    setOpenSubmenu(null);
  };
  
  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => closeAllMenus();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Función para scroll a la sección de categorías
  const handleCategoriasClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('categorias');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#categorias');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Función para scroll a la sección de destinos destacados
  const handleDestinosClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('destinos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#destinos');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Función para scroll a la sección de experiencias trending
  const handleExperienciasClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('experiencias');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#experiencias');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Función para scroll a la sección de eventos destacados
  const handleEventosClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('eventos');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#eventos');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Función para scroll a la sección de cartelera destacada
  const handleCarteleraClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('cartelera');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#cartelera');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Función para scroll a la sección de contacto
  const handleContactoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      const section = document.getElementById('contacto');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#contacto');
    }
    setIsMenuOpen(false);
    closeAllMenus();
  };
  
  // Estilos para el efecto burbuja y submenús
  const bubbleStyle = `
    .bubble-hover {
      position: relative;
      overflow: hidden;
    }
    .bubble-hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #FF004F, #3DFFAB);
      border-radius: 50px;
      transition: all 0.3s ease-in-out;
    }
    .bubble-hover:hover::after {
      width: 60%;
    }
    .bubble-hover.active::after {
      width: 60%;
      background: linear-gradient(90deg, #FF004F, #3DFFAB);
    }
    
    /* Estilos para el submenú */
    .submenu-enter {
      opacity: 0;
      transform: translateY(-10px);
    }
    .submenu-enter-active {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 200ms, transform 200ms;
    }
    .submenu-exit {
      opacity: 1;
    }
    .submenu-exit-active {
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 200ms, transform 200ms;
    }
  `;

  return (
    <>
      <style jsx global>{bubbleStyle}</style>
      <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/60 dark:bg-[var(--color-bg-dark)] backdrop-blur-lg shadow-lg border-b border-gray-200/30 dark:border-[#181C20]' 
          : 'bg-white/40 dark:bg-transparent backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-primary-hover transition-all duration-300 group-hover:scale-110">
              <FiMapPin className="w-5 h-5 text-white" />
            </div>
            <div className="block">
              <h1 className="text-lg sm:text-2xl font-bold">
                <span className="text-[var(--color-text-dark)] dark:text-white">GUIA</span>
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">TREND</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-800 dark:text-white -mt-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-[120px] sm:min-w-[180px] max-w-full">
                Guía Turística & Comercial
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
            <motion.div 
              key={item.name}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
              onMouseLeave={() => item.submenu && openSubmenu === item.name && setOpenSubmenu(null)}
            >
              <div className="flex items-center">
                {item.name === 'Categorías' ? (
                  <a
                    href="#categorias"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleCategoriasClick}
                  >
                    {item.name}
                  </a>
                ) : item.name === 'Destinos' ? (
                  <a
                    href="#destinos"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleDestinosClick}
                  >
                    {item.name}
                  </a>
                ) : item.name === 'Experiencias' ? (
                  <a
                    href="#experiencias"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleExperienciasClick}
                  >
                    {item.name}
                  </a>
                ) : item.name === 'Eventos' ? (
                  <a
                    href="#eventos"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleEventosClick}
                  >
                    {item.name}
                  </a>
                ) : item.name === 'Cartelera' ? (
                  <a
                    href="#cartelera"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleCarteleraClick}
                  >
                    {item.name}
                  </a>
                ) : item.name === 'Contacto' ? (
                  <a
                    href="#contacto"
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === '/' ? '' : ''}`}
                    onClick={handleContactoClick}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg dark:text-white text-gray-800 hover:text-primary transition-all duration-200 font-medium bubble-hover ${pathname === item.href ? 'active' : ''}`}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        toggleSubmenu(item.name);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && (
                  <svg 
                    className={`w-4 h-4 ml-1 text-white transition-transform duration-200 ${openSubmenu === item.name ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              
              {/* Submenú desplegable */}
              {item.submenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: openSubmenu === item.name ? 1 : 0,
                    y: openSubmenu === item.name ? 0 : 10,
                    display: openSubmenu === item.name ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-1 w-56 rounded-2xl backdrop-blur-lg bg-white/80 dark:bg-[#1A1F24]/90 border border-white/10 dark:border-white/10 z-50 overflow-hidden shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm font-medium text-[var(--color-text-dark)] dark:text-white/90 hover:bg-[#FF004F] hover:text-white hover:rounded-lg transform hover:translate-x-1 transition-all duration-300"
                        onClick={closeAllMenus}
                      >
                        {subItem.icon || null}{subItem.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50"
            >
              <FiSearch className="w-4 h-4" />
              <span className="hidden md:inline text-sm">Buscar...</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50"
            >
              {theme === 'dark' ? (
                <FiSun className="w-4 h-4 text-yellow-400" />
              ) : (
                <FiMoon className="w-4 h-4 text-blue-500" />
              )}
            </Button>

            {/* CTA Button */}
            <div className="hidden sm:block">
              <Button variant="primary" size="sm" className="dark:bg-white dark:text-[var(--color-text-dark)] dark:hover:bg-gray-100">
                Explorar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#2E3237] backdrop-blur-md border-b border-gray-700/20 shadow-xl">
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.name === 'Categorías' ? (
                    <a
                      href="#categorias"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleCategoriasClick}
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Destinos' ? (
                    <a
                      href="#destinos"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleDestinosClick}
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Experiencias' ? (
                    <a
                      href="#experiencias"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleExperienciasClick}
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Eventos' ? (
                    <a
                      href="#eventos"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleEventosClick}
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Cartelera' ? (
                    <a
                      href="#cartelera"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleCarteleraClick}
                    >
                      {item.name}
                    </a>
                  ) : item.name === 'Contacto' ? (
                    <a
                      href="#contacto"
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium`}
                      onClick={handleContactoClick}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-lg text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200 font-medium ${
                        pathname === item.href ? 'bg-[#FF004F] text-white' : ''
                      }`}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleSubmenu(item.name);
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Submenús móviles */}
                  {item.submenu && openSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 mt-1 overflow-hidden rounded-lg bg-[#3A3F45] border border-gray-600"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-[#FF004F] hover:text-white transition-all duration-200"
                          onClick={() => {
                            setIsMenuOpen(false);
                            closeAllMenus();
                          }}
                        >
                          {subItem.icon || null} {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <Button
                  variant="secondary"
                  className="w-full justify-start space-x-2 bg-[#3A3F45] hover:bg-[#454B52] text-white"
                >
                  <FiSearch className="w-4 h-4" />
                  <span>Buscar destinos...</span>
                </Button>
              </div>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Button variant="primary" className="w-full">
                  Explorar Destinos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      </header>
    </>
  );
};

export default Header;
