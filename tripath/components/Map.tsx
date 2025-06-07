'use client';

import { useEffect, useRef } from 'react';

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aquí inicializaremos el mapa con Mapbox o Google Maps
    // Por ahora solo mostramos un placeholder
  }, []);

  return (
    <div className="sticky top-4">
      <div 
        ref={mapRef}
        className="w-full h-[calc(100vh-2rem)] bg-gray-100 rounded-lg"
      >
        <div className="flex items-center justify-center h-full text-gray-500">
          Mapa interactivo
        </div>
      </div>
    </div>
  );
} 