'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiMail, FiPhone, FiClock, FiMapPin, FiMessageCircle, FiChevronDown, FiUser, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const faqs = [
  {
    question: '¿Cómo puedo agregar mi negocio a GuiaTrend?',
    answer: 'Puedes registrar tu negocio desde la sección “¿Tienes un Negocio?” o en el formulario de registro. Solo necesitas llenar tus datos y nuestro equipo validará la información antes de publicarla.'
  },
  {
    question: '¿GuiaTrend cobra por aparecer en la plataforma?',
    answer: 'No, la inclusión básica de tu negocio en GuiaTrend es gratuita. Ofrecemos opciones premium y publicidad para mayor visibilidad, pero no es obligatorio.'
  },
  {
    question: '¿Cómo funcionan las calificaciones y reseñas?',
    answer: 'Los usuarios pueden dejar calificaciones y reseñas después de visitar un negocio. Todas las opiniones son verificadas para mantener la calidad y confianza en la plataforma.'
  },
  {
    question: '¿En qué ciudades está disponible GuiaTrend?',
    answer: 'Actualmente estamos presentes en las principales ciudades de México y seguimos expandiéndonos. Puedes consultar la lista completa en la sección de destinos.'
  },
  {
    question: '¿Cómo puedo reportar información incorrecta?',
    answer: 'Si encuentras información incorrecta, puedes reportarla desde la página del negocio o enviarnos un mensaje a través del formulario de contacto.'
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
        
        // Si es modo desarrollo, mostrar los datos en la consola del navegador
        if (data.message.includes('modo desarrollo')) {
          console.log('=== DATOS DE CONTACTO RECIBIDOS ===');
          console.log('Nombre:', formData.name);
          console.log('Email:', formData.email);
          console.log('Mensaje:', formData.message);
          console.log('=====================================');
        }
      } else {
        setSubmitStatus('error');
        console.error('Error del servidor:', data.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error de red:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            Contacto
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] dark:text-white mb-4">
            Estamos aquí para ayudarte. Contáctanos por cualquier medio
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de Contacto */}
          <Card variant="glass" className="w-full h-full border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-6 flex items-center gap-2">
                <FiMail className="text-primary-600 dark:text-primary-400" /> Información de Contacto
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">Correo:</span>
                  <a href="mailto:estamosentrend@gmail.com" className="text-[#FF004F] hover:underline">estamosentrend@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">Teléfono:</span>
                  <a href="tel:+525665828832" className="text-[#FF004F] hover:underline">+52 56 6582 8832</a>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium">Horarios de atención:</span>
                  <span>Lun-Vie 9:00 a 18:00</span>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="font-semibold text-[var(--color-text-dark)] dark:text-white mb-2 flex items-center gap-2">
                  <FiMessageCircle className="text-primary-600 dark:text-primary-400" /> Chat WhatsApp
                </h4>
                <a href="https://wa.me/525665828832" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="group">
                    <FiMessageCircle className="w-5 h-5 mr-2" /> Chatear ahora
                  </Button>
                </a>
              </div>
              <div className="mb-8">
                <h4 className="font-semibold text-[var(--color-text-dark)] dark:text-white mb-2 flex items-center gap-2">
                  <FiMapPin className="text-primary-600 dark:text-primary-400" /> Nuestras Oficinas
                </h4>
                <div className="mb-2">
                  <span className="font-medium">Oficina Principal:</span><br />
                  <span>Av Diego Díaz de Berlanga 400, San Nicolás de los Garza, Nuevo León, México</span>
                </div>
                <div>
                  <span className="font-medium">Oficina de Operaciones:</span><br />
                  <span>Azucena 265 Col San Carlos, Guadalajara, JAL, México</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--color-text-dark)] dark:text-white mb-2 flex items-center gap-2">
                  <FiChevronDown className="text-primary-600 dark:text-primary-400" /> Preguntas Frecuentes
                </h4>
                <ul className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-left font-medium text-[var(--color-text-dark)] dark:text-gray-200 transition-colors ${openFaq === idx ? 'ring-2 ring-primary-400' : ''}`}
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        aria-expanded={openFaq === idx}
                        aria-controls={`faq-panel-${idx}`}
                      >
                        <span>{faq.question}</span>
                        <FiChevronDown className={`ml-2 transition-transform ${openFaq === idx ? 'rotate-180 text-primary-600 dark:text-primary-400' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div
                          id={`faq-panel-${idx}`}
                          className="px-4 py-3 bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-gray-300 border-l-4 border-primary-400"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Formulario de Contacto */}
          <Card variant="glass" className="w-full h-full border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-6 flex items-center gap-2">
                <FiSend className="text-primary-600 dark:text-primary-400" /> Envíanos un mensaje
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mensaje de éxito */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="w-5 h-5" />
                      <span className="font-medium">¡Mensaje enviado con éxito!</span>
                    </div>
                    <p className="text-sm mt-1">Gracias por contactarnos. Te responderemos lo antes posible.</p>
                  </div>
                )}

                {/* Mensaje de error */}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="w-5 h-5" />
                      <span className="font-medium">Error al enviar el mensaje</span>
                    </div>
                    <p className="text-sm mt-1">Por favor, intenta nuevamente más tarde.</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-1" htmlFor="name">
                    Tu nombre *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tu nombre"
                      required
                      // Atributos para prevenir modificaciones de extensiones de navegador
                      data-temp-mail-org="false"
                      data-temp-mail="false"
                      data-disposable="false"
                      autoComplete="name"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-1" htmlFor="email">
                    Tu email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="tu@email.com"
                      required
                      // Atributos para prevenir modificaciones de extensiones de navegador
                      data-temp-mail-org="false"
                      data-temp-mail="false"
                      data-disposable="false"
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-1" htmlFor="message">
                    Tu mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                    // Atributos para prevenir modificaciones de extensiones de navegador
                    data-temp-mail-org="false"
                    data-temp-mail="false"
                    data-disposable="false"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-white text-primary-600 border-2 border-gray-200 hover:bg-[#3DFFAB] hover:text-[#2E3237] hover:border-[#3DFFAB] focus:bg-[#3DFFAB] focus:text-[#2E3237] focus:border-[#3DFFAB] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-5 h-5 mr-2" />
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}