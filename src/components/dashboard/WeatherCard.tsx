"use client";

import { useLatestWeatherData } from "@/lib/api";
import { format } from "date-fns";
import { cardData } from "@/types/sensorData";
import {
  Thermometer,
  Droplets,
  Gauge,
  ChartNoAxesCombined,
  Wind,
  Compass,
} from "lucide-react";

interface WeatherCardProps {
  title: string;
  dataKey: keyof cardData;
  unit: string;
  icon?: string;
}

export default function WeatherCard({
  title,
  dataKey,
  unit,
  icon,
}: WeatherCardProps) {
  const { data, error, isLoading } = useLatestWeatherData();

  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <Thermometer />;
      case "humidity":
        return <Droplets />;
      case "barometric":
        return <Gauge />;
      case "windSpeed":
        return <Wind />;
      case "windDirection":
        return <Compass />;
      default:
        return <ChartNoAxesCombined />;
    }
  };

  const getValue = () => {
    if (isLoading)
      return (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      );
    if (error) return <span className="ml-2 text-xs text-red-400">({error})</span>;
    if (!data) return "N/A";

    const value = data[dataKey];
    if (typeof value === "number") {
      return value.toFixed(1) + unit;
    }
    return value;
  };

  const getUpdateTime = () => {
    if (!data || !data.timestamp) return "Unknown";
    try {
      return format(new Date(data.timestamp), "HH:mm:ss");
    } catch {
      return "Invalid time";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            Last update: {getUpdateTime()}
          </p>
        </div>
        <div className="text-2xl">{getIcon()}</div>
      </div>
      <div className="mt-2 text-3xl font-semibold text-gray-900">{getValue()}</div>
    </div>
  );
}
