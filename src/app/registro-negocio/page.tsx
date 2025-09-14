'use client';

import React, { useState } from 'react';
import { FiMapPin, FiGlobe, FiClock, FiDollarSign, FiUser, FiSave, FiCheckCircle, FiAlertCircle, FiHome } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface BusinessFormData {
  // Información básica del negocio
  nombreNegocio: string;
  categoria: string;
  descripcion: string;
  
  // Información de contacto
  contactoNombre: string;
  contactoEmail: string;
  contactoTelefono: string;
  
  // Dirección
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  
  // Información adicional
  horario: string;
  rangoPrecios: string;
  website: string;
  redesSociales: string;
  
  // Archivos
  logo?: File;
  imagenes: File[];
}

const categorias = [
  'Restaurantes',
  'Hoteles',
  'Atracciones Turísticas',
  'Centros Comerciales',
  'Entretenimiento',
  'Gastronomía',
  'Arte y Cultura',
  'Deportes',
  'Salud y Bienestar',
  'Educación',
  'Servicios',
  'Otros'
];

const ciudades = [
  'Monterrey',
  'Guadalajara',
  'Ciudad de México',
  'Cancún',
  'Puerto Vallarta',
  'Veracruz',
  'Palenque',
  'Otras'
];

export default function RegistroNegocio() {
  const [formData, setFormData] = useState<BusinessFormData>({
    nombreNegocio: '',
    categoria: '',
    descripcion: '',
    contactoNombre: '',
    contactoEmail: '',
    contactoTelefono: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    ciudad: '',
    estado: 'Nuevo León',
    codigoPostal: '',
    horario: '',
    rangoPrecios: '',
    website: '',
    redesSociales: '',
    imagenes: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nombreNegocio.trim()) newErrors.nombreNegocio = 'El nombre del negocio es requerido';
      if (!formData.categoria) newErrors.categoria = 'Selecciona una categoría';
      if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
      if (formData.descripcion.trim().length < 50) newErrors.descripcion = 'La descripción debe tener al menos 50 caracteres';
    }

    if (step === 2) {
      if (!formData.contactoNombre.trim()) newErrors.contactoNombre = 'El nombre de contacto es requerido';
      if (!formData.contactoEmail.trim()) {
        newErrors.contactoEmail = 'El email es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactoEmail)) {
        newErrors.contactoEmail = 'El formato del email no es válido';
      }
      if (!formData.contactoTelefono.trim()) newErrors.contactoTelefono = 'El teléfono es requerido';
    }

    if (step === 3) {
      if (!formData.calle.trim()) newErrors.calle = 'La calle es requerida';
      if (!formData.colonia.trim()) newErrors.colonia = 'La colonia es requerida';
      if (!formData.ciudad) newErrors.ciudad = 'Selecciona una ciudad';
      if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es requerido';
    }

    if (step === 4) {
      if (!formData.horario.trim()) newErrors.horario = 'El horario es requerido';
      if (!formData.rangoPrecios) newErrors.rangoPrecios = 'Selecciona un rango de precios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, imagenes: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'imagenes') {
          // Para arrays de archivos, necesitamos agregar cada archivo individualmente
          const imagenes = formData.imagenes;
          imagenes.forEach((file: File, index: number) => {
            formDataToSend.append(`${key}[${index}]`, file);
          });
        } else {
          formDataToSend.append(key, formData[key as keyof BusinessFormData] as string);
        }
      });

      const response = await fetch('/api/registro-negocio', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          setFormData({
            nombreNegocio: '',
            categoria: '',
            descripcion: '',
            contactoNombre: '',
            contactoEmail: '',
            contactoTelefono: '',
            calle: '',
            numeroExterior: '',
            numeroInterior: '',
            colonia: '',
            ciudad: '',
            estado: 'Nuevo León',
            codigoPostal: '',
            horario: '',
            rangoPrecios: '',
            website: '',
            redesSociales: '',
            imagenes: []
          });
          setCurrentStep(1);
          setErrors({});
        }, 3000);
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-4">
              <FiHome className="inline mr-2" /> Información del Negocio
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Nombre del Negocio *
              </label>
              <input
                type="text"
                name="nombreNegocio"
                value={formData.nombreNegocio}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.nombreNegocio ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="Ej: Restaurante El Rincón Mexicano"
              />
              {errors.nombreNegocio && (
                <p className="text-red-500 text-sm mt-1">{errors.nombreNegocio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.categoria ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              {errors.categoria && (
                <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.descripcion ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="Describe tu negocio, servicios, especialidades, etc. (mínimo 50 caracteres)"
              />
              {errors.descripcion && (
                <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {formData.descripcion.length}/50 caracteres mínimos
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-4">
              <FiUser className="inline mr-2" /> Información de Contacto
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Nombre de Contacto *
              </label>
              <input
                type="text"
                name="contactoNombre"
                value={formData.contactoNombre}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.contactoNombre ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="Nombre completo de la persona de contacto"
              />
              {errors.contactoNombre && (
                <p className="text-red-500 text-sm mt-1">{errors.contactoNombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Email de Contacto *
              </label>
              <input
                type="email"
                name="contactoEmail"
                value={formData.contactoEmail}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.contactoEmail ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="correo@ejemplo.com"
              />
              {errors.contactoEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.contactoEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Teléfono de Contacto *
              </label>
              <input
                type="tel"
                name="contactoTelefono"
                value={formData.contactoTelefono}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.contactoTelefono ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="+52 81 1234 5678"
              />
              {errors.contactoTelefono && (
                <p className="text-red-500 text-sm mt-1">{errors.contactoTelefono}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-4">
              <FiMapPin className="inline mr-2" /> Dirección
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Calle *
                </label>
                <input
                  type="text"
                  name="calle"
                  value={formData.calle}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.calle ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                  placeholder="Av. Principal"
                />
                {errors.calle && (
                  <p className="text-red-500 text-sm mt-1">{errors.calle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Número Exterior
                </label>
                <input
                  type="text"
                  name="numeroExterior"
                  value={formData.numeroExterior}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
                  placeholder="123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Número Interior
                </label>
                <input
                  type="text"
                  name="numeroInterior"
                  value={formData.numeroInterior}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
                  placeholder="Apto 101"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Colonia *
                </label>
                <input
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.colonia ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                  placeholder="Centro"
                />
                {errors.colonia && (
                  <p className="text-red-500 text-sm mt-1">{errors.colonia}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Ciudad *
                </label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.ciudad ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map(ciudad => (
                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                  ))}
                </select>
                {errors.ciudad && (
                  <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
                >
                  <option value="Nuevo León">Nuevo León</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Ciudad de México">Ciudad de México</option>
                  <option value="Quintana Roo">Quintana Roo</option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Chiapas">Chiapas</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                  Código Postal *
                </label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    errors.codigoPostal ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                  placeholder="64000"
                />
                {errors.codigoPostal && (
                  <p className="text-red-500 text-sm mt-1">{errors.codigoPostal}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[var(--color-text-dark)] dark:text-white mb-4">
              <FiClock className="inline mr-2" /> Información Adicional
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Horario de Atención *
              </label>
              <input
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.horario ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
                placeholder="Lun-Vie: 9:00-18:00, Sáb: 10:00-15:00"
              />
              {errors.horario && (
                <p className="text-red-500 text-sm mt-1">{errors.horario}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Rango de Precios *
              </label>
              <select
                name="rangoPrecios"
                value={formData.rangoPrecios}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  errors.rangoPrecios ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white`}
              >
                <option value="">Selecciona un rango de precios</option>
                <option value="$">Bajo ($ - $$)</option>
                <option value="$$">Medio ($$ - $$$)</option>
                <option value="$$$">Alto ($$$ - $$$$)</option>
                <option value="$$$$">Premium ($$$$+)</option>
              </select>
              {errors.rangoPrecios && (
                <p className="text-red-500 text-sm mt-1">{errors.rangoPrecios}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Sitio Web
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
                placeholder="https://www.ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Redes Sociales
              </label>
              <textarea
                name="redesSociales"
                value={formData.redesSociales}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
                placeholder="Facebook: @pagina\nInstagram: @usuario\nTwitter: @usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Logo del Negocio
              </label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
              />
              <p className="text-sm text-gray-500 mt-1">Formato: JPG, PNG, WebP (Máx. 5MB)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-dark)] dark:text-gray-300 mb-2">
                Imágenes del Negocio
              </label>
              <input
                type="file"
                name="imagenes"
                accept="image/*"
                multiple
                onChange={handleMultipleFileChange}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[var(--color-text-dark)] dark:text-white"
              />
              <p className="text-sm text-gray-500 mt-1">Puedes subir varias imágenes (Máx. 5MB cada una)</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E3237] to-[#1a1a1a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            Registro de Negocio
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            Registra tu Negocio en Guía Trend
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Únete a nuestra comunidad y llega a más clientes. El registro es gratuito y solo toma unos minutos.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {step}
                </div>
                <span className={`ml-3 text-sm ${
                  step <= currentStep ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {step === 1 && 'Información'}
                  {step === 2 && 'Contacto'}
                  {step === 3 && 'Dirección'}
                  {step === 4 && 'Finalizar'}
                </span>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card variant="glass" className="w-full border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
          <CardContent className="p-8">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5" />
                  <span className="font-medium">¡Registro exitoso!</span>
                </div>
                <p className="text-sm mt-1">Tu negocio ha sido registrado correctamente. Nos pondremos en contacto contarte en las próximas 24 horas para validar la información.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200">
                <div className="flex items-center gap-2">
                  <FiAlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error en el registro</span>
                </div>
                <p className="text-sm mt-1">Por favor, intenta nuevamente más tarde.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1 || isSubmitting}
                  className="px-6 py-3"
                >
                  Anterior
                </Button>

                <div className="flex gap-4">
                  {currentStep < 4 ? (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-primary-600 hover:bg-primary-700"
                    >
                      {isSubmitting ? 'Procesando...' : 'Siguiente'}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <>
                          <FiSave className="w-4 h-4 mr-2 animate-spin" />
                          Registrando...
                        </>
                      ) : (
                        <>
                          <FiCheckCircle className="w-4 h-4 mr-2" />
                          Finalizar Registro
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" className="text-center p-6 border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Visibilidad Online</h3>
              <p className="text-gray-300">Llega a miles de clientes que buscan negocios como el tuyo.</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="text-center p-6 border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Registro Gratuito</h3>
              <p className="text-gray-300">No hay costo por registrarte. Solo pagas por publicidad opcional.</p>
            </CardContent>
          </Card>

          <Card variant="glass" className="text-center p-6 border-0" style={{boxShadow: '0 0 32px 8px #2E3237, 0 0 64px 16px #2E323799'}}>
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Soporte Personalizado</h3>
              <p className="text-gray-300">Te ayudaremos a optimizar tu perfil para mejores resultados.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}