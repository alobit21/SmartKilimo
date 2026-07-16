import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationPickerMapProps {
  latitude: number | '';
  longitude: number | '';
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker = ({ position, onLocationSelect }: { position: L.LatLng | null, onLocationSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const MapUpdater = ({ center }: { center: L.LatLng }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

const AutoLocateControl = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    map.on('locationfound', (e) => {
      setLocating(false);
      map.flyTo(e.latlng, 15);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    });
    
    map.on('locationerror', (e) => {
      setLocating(false);
      alert('Imeshindwa kupata eneo lako. Tafadhali hakikisha umeruhusu matumizi ya Location (GPS).');
    });
  }, [map, onLocationSelect]);

  const handleLocate = () => {
    setLocating(true);
    map.locate();
  };

  return (
    <div className="leaflet-top leaflet-right mt-16 mr-2 z-[400] absolute right-2 top-16">
      <div className="leaflet-control leaflet-bar border-none shadow-md rounded-lg overflow-hidden">
        <button 
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="bg-surface hover:bg-surface-container flex items-center justify-center w-10 h-10 text-primary focus:outline-none transition-colors"
          title="Tafuta Eneo Langu (Auto-locate)"
        >
          {locating ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined">my_location</span>
          )}
        </button>
      </div>
    </div>
  );
};

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ latitude, longitude, onLocationSelect }) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    latitude && longitude ? new L.LatLng(Number(latitude), Number(longitude)) : null
  );
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (latitude && longitude) {
      setPosition(new L.LatLng(Number(latitude), Number(longitude)));
    } else {
      setPosition(null);
    }
  }, [latitude, longitude]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    onLocationSelect(lat, lon);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Default to Dodoma roughly if no position is selected
  const center = position || new L.LatLng(-6.163, 35.751);

  return (
    <div className="w-full h-full relative z-0 flex flex-col">
      {/* Search Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] w-full max-w-md px-4">
        <form onSubmit={handleSearch} className="relative flex shadow-lg rounded-xl overflow-hidden">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tafuta mahali (Mf. Morogoro)" 
            className="w-full p-4 pl-12 bg-surface text-on-surface border-none outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <button type="submit" disabled={isSearching} className="bg-primary text-on-primary px-6 font-bold disabled:opacity-70 transition-colors hover:opacity-90">
            {isSearching ? '...' : 'Tafuta'}
          </button>
        </form>
        
        {searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-surface rounded-xl shadow-xl border border-outline-variant overflow-hidden max-h-64 overflow-y-auto">
            {searchResults.map((result, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => handleSelectResult(result)}
                className="w-full text-left p-4 border-b border-outline-variant/50 hover:bg-surface-container transition-colors last:border-0 flex items-start gap-3 text-sm text-on-surface"
              >
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                {result.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <MapContainer center={center} zoom={position ? 12 : 6} style={{ height: '100%', width: '100%', flex: 1, zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} />
        <AutoLocateControl onLocationSelect={(lat, lng) => {
          onLocationSelect(lat, lng);
          setSearchResults([]);
        }} />
        <LocationMarker 
          position={position} 
          onLocationSelect={(lat, lng) => {
            onLocationSelect(lat, lng);
            setSearchResults([]); // Hide results on map click
          }} 
        />
      </MapContainer>
      
      {!position && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] pointer-events-none">
          <span className="bg-primary text-on-primary text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined">touch_app</span> Bofya kwenye ramani kuchagua eneo
          </span>
        </div>
      )}
    </div>
  );
};
