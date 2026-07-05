/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MudarFoco({ centro }) {
  const map = useMap();
  useEffect(() => {
    if (centro) {
      map.setView(centro, 16);
    }
  }, [centro, map]);
  return null;
}

export default function MapaChamados({ chamados, localizacaoAtiva }) {
const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-gray-100">Carregando...</div>;

  const getCorPrioridade = (p) => {
    switch (p) {
      case 'Alta': return '#A30000';
      case 'Média': return '#FF6A00';
      case 'Baixa': return '#2A638F';
      default: return '#ccc';
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer 
        center={[-23.6200, -45.4200]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        
        {localizacaoAtiva && <MudarFoco centro={localizacaoAtiva} />}

        {chamados.map((c) => (
          <CircleMarker 
            key={c.id} 
            center={[c.lat, c.lng]} 
            radius={8} 
            fillColor={getCorPrioridade(c.prioridade)}
            color="#fff"
            weight={2}
            fillOpacity={0.8}
          >
            <Tooltip>
              <div className="p-2">
                <p className="font-bold">{c.escola}</p>
                <p className="text-xs">{c.local}</p>
                <p className="text-azul-escuro font-semibold">{c.categoria}</p>
                <p className="font-bold">{c.status}</p>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}