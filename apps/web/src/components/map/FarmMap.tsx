import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface FarmMapProps {
  latitude?: number;
  longitude?: number;
}

export const FarmMap: React.FC<FarmMapProps> = ({ latitude = -6.369028, longitude = 34.888822 }) => {
  return (
    <div className="h-[400px] w-full rounded-[var(--radius-card)] overflow-hidden">
      <MapContainer center={[latitude, longitude]} zoom={6} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Selected Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
