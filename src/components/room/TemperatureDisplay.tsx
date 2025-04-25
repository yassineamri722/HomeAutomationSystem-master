// src/components/TemperatureDisplay.tsx
import React from "react";
import { ThermometerSun } from "lucide-react";

// Typage des props
interface TemperatureDisplayProps {
  temperature: number;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ temperature }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow">
      <ThermometerSun className="w-8 h-8 text-red-500" />
      <div>
        <p className="text-sm text-gray-500">Current Temperature</p>
        <p className="text-xl font-bold">{temperature}°C</p>
      </div>
    </div>
  );
};

export default TemperatureDisplay;
