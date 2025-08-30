import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Waves, Eye, Zap, Wind } from 'lucide-react';

interface ThreatData {
  id: string;
  location: string;
  level: 'safe' | 'watch' | 'warning' | 'critical';
  type: 'erosion' | 'flood' | 'cyclone' | 'tsunami' | 'storm';
  coordinates: { x: number; y: number };
}

const threatLevels = {
  safe: 'bg-green-500',
  watch: 'bg-yellow-500',
  warning: 'bg-orange-500',
  critical: 'bg-red-600',
};

const threatIcons = {
  erosion: Waves,
  flood: AlertTriangle,
  cyclone: Wind,
  tsunami: Zap,
  storm: Eye,
};

export default function GujaratThreatMap() {
  const [threats] = useState<ThreatData[]>([
    {
      id: '1',
      location: 'Dwarka',
      level: 'warning',
      type: 'erosion',
      coordinates: { x: 20, y: 30 },
    },
    {
      id: '2',
      location: 'Somnath',
      level: 'critical',
      type: 'flood',
      coordinates: { x: 40, y: 60 },
    },
    {
      id: '3',
      location: 'Surat',
      level: 'watch',
      type: 'cyclone',
      coordinates: { x: 70, y: 40 },
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Gujarat Coastal Threat Map
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section inside Grid */}
        <Card className="relative overflow-hidden rounded-2xl shadow-md">
          <img
            src="/gujarat-map.png"
            alt="Gujarat Map"
            className="w-full h-full object-contain"
          />

          {threats.map((threat) => {
            const Icon = threatIcons[threat.type];
            return (
              <div
                key={threat.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${threatLevels[threat.level]}`}
                style={{
                  left: `${threat.coordinates.x}%`,
                  top: `${threat.coordinates.y}%`,
                }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            );
          })}
        </Card>

        {/* Threat Info Section */}
        <div className="space-y-4">
          {threats.map((threat) => {
            const Icon = threatIcons[threat.type];
            return (
              <Card
                key={threat.id}
                className="p-4 flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-lg">{threat.location}</h3>
                    <p className="text-sm text-gray-600 capitalize">{threat.type}</p>
                  </div>
                </div>
                <Badge
                  className={`${threatLevels[threat.level]} text-white px-3 py-1 rounded-full`}
                >
                  {threat.level}
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
