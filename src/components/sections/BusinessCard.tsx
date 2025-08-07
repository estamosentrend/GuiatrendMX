'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FaStar, FaMapMarkerAlt, FaClock, FaHeart, FaShare, FaPhone } from 'react-icons/fa';

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  priceRange: number;
  address: string;
  city: string;
  phone: string;
  website?: string;
  hours: {
    [key: string]: string;
  };
  images: string[];
  amenities: string[];
  tags: string[];
  isOpen?: boolean;
  isFeatured?: boolean;
}

interface BusinessCardProps {
  business: Business;
  onFavorite?: (businessId: string) => void;
  onShare?: (business: Business) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ 
  business, 
  onFavorite, 
  onShare 
}) => {
  const isBusinessOpen = (hours: { [key: string]: string }) => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayHours = hours[currentDay];
    if (!todayHours || todayHours === 'Cerrado') return false;
    
    const [open, close] = todayHours.split(' - ');
    const openTime = parseInt(open.replace(':', ''));
    const closeTime = parseInt(close.replace(':', ''));
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const getPriceRangeText = (priceRange: number) => {
    const ranges = ['$', '$$', '$$$', '$$$$'];
    return ranges[priceRange - 1] || '$';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-yellow-500';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <Card className="glass-card glass-hover overflow-hidden group">
      {/* Business Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={business.images[0] || '/images/placeholder-business.jpg'}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {business.isFeatured && (
            <Badge className="bg-primary text-white">
              Destacado
            </Badge>
          )}
          <Badge variant="outline" className="bg-black/50 text-white border-white/20">
            {business.category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={() => onFavorite?.(business.id)}
            className="p-2 rounded-full glass-hover text-white/80 hover:text-red-500 transition-colors duration-300"
          >
            <FaHeart className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onShare?.(business)}
            className="p-2 rounded-full glass-hover text-white/80 hover:text-white transition-colors duration-300"
          >
            <FaShare className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <Link href={`/business/${business.id}`}>
              <Button className="btn-primary dark:bg-white dark:text-[var(--color-text-dark)] dark:hover:bg-gray-100">
                Ver Detalles
              </Button>
            </Link>
            {business.phone && (
              <Link href={`tel:${business.phone}`}>
                <Button className="glass-button text-white">
                  <FaPhone className="mr-2" />
                  Llamar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Business Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1 flex-1 mr-2">
            {business.name}
          </h3>
          <div className="flex items-center space-x-1">
            <FaStar className={`w-4 h-4 ${getRatingColor(business.rating)}`} />
            <span className="text-sm font-medium">{business.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({business.reviewCount})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>

        {/* Location and Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="mr-1 text-primary" />
            <span className="line-clamp-1">{business.address}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {getPriceRangeText(business.priceRange)}
          </div>
        </div>

        {/* Hours and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <FaClock className="mr-2 text-primary" />
            <span className={`font-medium ${
              isBusinessOpen(business.hours) 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {isBusinessOpen(business.hours) ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
          {business.subcategory && (
            <Badge variant="secondary" className="text-xs">
              {business.subcategory}
            </Badge>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/business/${business.id}`} className="flex-1">
            <Button className="btn-primary w-full">
              Ver Detalles
            </Button>
          </Link>
          {business.phone && (
            <Link href={`tel:${business.phone}`}>
              <Button variant="secondary" className="glass-button">
                <FaPhone />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;