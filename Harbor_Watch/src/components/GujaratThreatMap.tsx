import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  MapPin,
  Waves,
  Eye,
  Zap,
  Wind,
} from "lucide-react";

// Gujarat coastal locations → tuned pixel positions (x,y)
const gujaratLocations = [
  { name: "Varvala", coordinates: [110, 370], type: "coastal_town" },
  { name: "Shivrajpur", coordinates: [210, 160], type: "coastal_town" },
  { name: "Dwarka", coordinates: [200, 220], type: "coastal_town" },
  { name: "Okha", coordinates: [250, 100], type: "cityport" },
  { name: "Beyt Dwarka", coordinates: [280, 130], type: "fishing_harbor" },
  { name: "Positra", coordinates: [490, 120], type: "coastal_town" },
  { name: "Surajkaradi", coordinates: [330, 300], type: "fishing_harbor" },
];

// Color codes for different types
const typeColors: Record<string, string> = {
  coastal_town: "bg-blue-500",
  cityport: "bg-green-500",
  fishing_harbor: "bg-yellow-500",
};

// Already pixel mapped → no projection needed
const coordToSVG = (coords: [number, number]): [number, number] => coords;

export default function GujaratThreatMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Card className="w-[800px] h-[600px] p-2 relative">
        {/* Background Map */}
        <img
          src="/map1.png"
          alt="Gujarat Coastal Map"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Fixed Gujarat Location Markers */}
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {gujaratLocations.map((loc, idx) => {
            const [x, y] = coordToSVG(loc.coordinates);
            return (
              <g
                key={idx}
                transform={`translate(${x}, ${y})`}
                className="pointer-events-auto cursor-pointer"
                onClick={() => setSelectedLocation(loc.name)}
              >
                {/* Circle marker */}
                <circle
                  r={8}
                  className={`${typeColors[loc.type] || "bg-gray-500"} opacity-80`}
                />
                {/* Label */}
                <text
                  x={12}
                  y={4}
                  className="text-xs fill-white font-semibold drop-shadow"
                >
                  {loc.name}
                </text>
              </g>
            );
          })}
        </svg>
      </Card>

      {/* Info Panel */}
      {selectedLocation && (
        <div className="mt-4 p-3 border rounded-lg bg-white shadow">
          <h2 className="font-bold text-lg">{selectedLocation}</h2>
          <p className="text-sm text-gray-600">
            Type:{" "}
            {
              gujaratLocations.find((loc) => loc.name === selectedLocation)?.type
            }
          </p>
        </div>
      )}
    </div>
  );
}
