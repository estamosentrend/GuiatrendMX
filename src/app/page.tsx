'use client';

import React from 'react';
import HeroSlider from '@/components/sections/HeroSlider';
import FeaturedDestinations from '@/components/sections/FeaturedDestinations';
import PopularCategories from '@/components/sections/PopularCategories';
import DirectorioSection from '@/components/sections/DirectorioSection';
import TrendingExperiences from '@/components/sections/TrendingExperiences';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FeaturedEventsSection from '@/components/sections/FeaturedEventsSection';
import FeaturedBillboardSection from '@/components/sections/FeaturedBillboardSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import BusinessInviteSection from '@/components/sections/BusinessInviteSection';
import ContactSection from '@/components/sections/ContactSection';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import WebsiteModal from '@/components/ui/WebsiteModal';
import CategoriaModal from '@/components/sections/CategoriaModal';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const tpscrRef = useRef<HTMLDivElement>(null);
  const tpscrRef2 = useRef<HTMLDivElement>(null);
  const tpscrRef3 = useRef<HTMLDivElement>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCategoryModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Evitar múltiples inserciones
    if (!window.document.getElementById('tpscr-script')) {
      const script = document.createElement('script');
      script.id = 'tpscr-script';
      script.async = true;
      script.src = 'https://tpscr.com/content?currency=mxn&trs=440875&shmarker=655337&show_hotels=false&powered_by=true&locale=es&searchUrl=www.aviasales.es%2Fsearch&primary_override=%23FD0156&color_button=%23FD0156&color_icons=%23FD0156&dark=%23262626&light=%23FAF9F6&secondary=%232E3237&special=%23C4C4C4&color_focused=%23FD0156&border_radius=30&no_labels=&plain=true&promo_id=7879&campaign_id=100';
      script.charset = 'utf-8';
      // Insertar el script dentro del div
      if (tpscrRef.current) {
        tpscrRef.current.appendChild(script);
      }
    }
  }, []);

  // Nuevo widget tpscr.com debajo del anterior
  useEffect(() => {
    if (!window.document.getElementById('tpscr-script-2')) {
      const script2 = document.createElement('script');
      script2.id = 'tpscr-script-2';
      script2.async = true;
      script2.src = 'https://tpscr.com/content?currency=mxn&trs=440875&shmarker=655337&lat=19.4270499&lng=-99.1275711&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=MEX&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233DFFABff&secondary=%23FD0156ff&light=%23060400ff&width=1500&height=500&zoom=4&promo_id=4054&campaign_id=100';
      script2.charset = 'utf-8';
      if (tpscrRef2.current) {
        tpscrRef2.current.appendChild(script2);
      }
    }
  }, []);

  // Interceptar clics en los enlaces del widget y el submit del formulario de búsqueda
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).href;
        if (href && href.startsWith('http')) {
          e.preventDefault();
          setModalUrl(href);
        }
      }
    };
    const widgetDiv = tpscrRef.current;
    if (widgetDiv) {
      widgetDiv.addEventListener('click', handler, true);
    }

    // Interceptar el submit del formulario de búsqueda
    let form: HTMLFormElement | null = null;
    const findAndAttachFormListener = () => {
      if (!widgetDiv) return;
      form = widgetDiv.querySelector('form');
      if (form) {
        form.addEventListener('submit', onFormSubmit, true);
      }
    };
    // Handler para el submit
    const onFormSubmit = (e: Event) => {
      e.preventDefault();
      if (!form) return;
      // Buscar el input con el destino de búsqueda
      const input = form.querySelector('input[type="text"], input[type="search"]') as HTMLInputElement;
      let url = '';
      // Buscar el primer botón submit con href o el action del form
      if (form.action) {
        url = form.action;
      }
      // Si el input tiene valor, agregarlo como query param (si aplica)
      if (input && input.value) {
        // Si la url ya tiene ?, agregar &
        url += (url.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(input.value);
      }
      if (url) {
        setModalUrl(url);
      }
    };
    // Esperar a que el widget cargue el formulario
    const interval = setInterval(findAndAttachFormListener, 500);
    // Limpiar listeners
    return () => {
      if (widgetDiv) {
        widgetDiv.removeEventListener('click', handler, true);
      }
      if (form) {
        form.removeEventListener('submit', onFormSubmit, true);
      }
      clearInterval(interval);
    };
  }, []);

  // Tercer widget tpscr.com debajo de los anteriores
  useEffect(() => {
    if (!window.document.getElementById('tpscr-script-3')) {
      const script3 = document.createElement('script');
      script3.id = 'tpscr-script-3';
      script3.async = true;
      script3.src = 'https://tpscr.com/content?currency=mxn&trs=440875&shmarker=655337&search_host=search.hotellook.com&locale=en&powered_by=true&draggable=true&disable_zoom=false&show_logo=true&scrollwheel=false&color=%23FD0156ff&contrast_color=%23ffffff&width=1000&height=500&lat=21.172209&lng=-86.830595&zoom=12&radius=83&stars=0&rating_from=0&rating_to=10&promo_id=4285&campaign_id=101';
      script3.charset = 'utf-8';
      if (tpscrRef3.current) {
        tpscrRef3.current.appendChild(script3);
      }
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          <HeroSlider />
        </section>
        {/* Título Vuelos y hoteles */}
        <div className="container mx-auto px-4 text-center pt-16 lg:pt-24 pb-6 lg:pb-8">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <span className="inline-flex items-center font-medium rounded-full transition-all duration-200 hover:scale-105 bg-[#3DFFAB] text-[#2E3237] shadow-neon-green px-3 py-1 text-sm">
                Vuelos y hoteles
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2 transition-colors duration-200 hover:text-[#FD0156] dark:hover:text-[#3DFFAB]">
              Vuelos y hoteles
            </h2>
          </div>
        </div>
        {/* Widget Hoteles tpscr.com */}
        <div id="tpscr-hoteles" ref={tpscrRef} className="flex justify-center py-8" />
        {/* Nuevo Widget tpscr.com (mapa/vuelos) */}
        <div id="tpscr-vuelos" ref={tpscrRef2} className="flex justify-center py-8" />
        {/* Tercer Widget tpscr.com (hoteles) */}
        <div id="tpscr-hoteles-extra" ref={tpscrRef3} className="flex justify-center py-8" />
        {/* WebsiteModal para enlaces del widget */}
        <WebsiteModal open={!!modalUrl} url={modalUrl || ''} onClose={() => setModalUrl(null)} />
        {/* Directorio Section */}
        <section id="categorias" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#090B0D]/50 dark:to-transparent">
          <DirectorioSection />
        </section>
        {/* Popular Categories */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#090B0D]/50">
          <PopularCategories onCategoryClick={handleCategoryClick} />
        </section>
        {/* Featured Destinations */}
        <section id="destinos" className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#090B0D]/50">
          <FeaturedDestinations />
        </section>
        {/* Trending Experiences */}
        <section id="experiencias" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#090B0D]/50 dark:to-transparent">
          <TrendingExperiences />
        </section>
        {/* Featured Events Section */}
        <section id="eventos" className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#090B0D]/50">
          <FeaturedEventsSection />
        </section>
        {/* Featured Billboard Section */}
        <section id="cartelera" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#090B0D]/50 dark:to-transparent">
          <FeaturedBillboardSection />
        </section>
        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#090B0D]/50">
          <HowItWorksSection />
        </section>
        {/* Testimonials */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-[#090B0D]/50">
          <TestimonialsSection />
        </section>
        {/* Newsletter */}
        <section className="py-16 lg:py-24">
          <NewsletterSection />
        </section>
        {/* Business Invite Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#090B0D]/50 dark:to-transparent">
          <BusinessInviteSection />
        </section>
        {/* Contact Section */}
        <section id="contacto" className="py-16 lg:py-24">
          <ContactSection />
        </section>
      </div>
      {/* Botón flotante scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#FF004F] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 group"
          aria-label="Ir al inicio"
        >
          <FiArrowUp className="w-7 h-7 text-white group-hover:-translate-y-1 transition-transform duration-200" />
        </button>
      )}
      <CategoriaModal
        open={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categoria={selectedCategory}
      />
    </>
  );
}
