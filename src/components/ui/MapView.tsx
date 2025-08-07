import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icono personalizado para el marcador
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  onExpand?: () => void;
  showExpandButton?: boolean;
  cityName?: string;
}

const MapView: React.FC<MapViewProps> = ({
  lat,
  lng,
  zoom = 13,
  height = "250px",
  onExpand,
  showExpandButton = false,
  cityName,
}) => {
  const tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div className="relative w-full" style={{ height }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "1rem", zIndex: 1 }}
        dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
      >
        <TileLayer
          url={tileUrl}
          attribution={tileAttribution}
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          {cityName && <Popup>{cityName}</Popup>}
        </Marker>
      </MapContainer>
      {showExpandButton && onExpand && (
        <button
          className="absolute bottom-3 right-3 bg-white/80 dark:bg-[#181C20]/80 rounded-full p-2 shadow-lg hover:bg-primary hover:text-white transition-colors z-10"
          onClick={onExpand}
          aria-label="Ampliar mapa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9V5.25A2.25 2.25 0 016 3h3.75m10.5 6V5.25A2.25 2.25 0 0018 3h-3.75m0 18H18a2.25 2.25 0 002.25-2.25V15m-16.5 0v3.75A2.25 2.25 0 006 21h3.75" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MapView;