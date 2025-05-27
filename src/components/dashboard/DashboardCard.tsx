"use client";
import {
  Thermometer,
  Droplets,
  Gauge,
  ChartNoAxesCombined,
  Wind,
  Compass,
} from "lucide-react";
import { useEffect, useState } from "react";

type DashboardCardProps = {
  title: string;
  icon: string;
  apiEndpoint: string;
  dataKey: string;
  unit?: string;
};

export default function DashboardCard({
  title,
  icon,
  apiEndpoint,
  dataKey,
  unit = "",
}: DashboardCardProps) {
  const [value, setValue] = useState<string | number>("Loading...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <Thermometer/>;
      case "humidity":
        return <Droplets/>;
      case "barometric":
        return <Gauge />;
      case "windSpeed":
        return <Wind />;
      case "windDirection":
        return <Compass />;
      default:
        return <ChartNoAxesCombined/>;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Get the latest data point (assuming array is sorted by timestamp)
        const latestData = Array.isArray(data) ? data[data.length - 1] : data;

        if (latestData && latestData[dataKey] !== undefined) {
          const formattedValue =
            typeof latestData[dataKey] === "number"
              ? latestData[dataKey].toFixed(1)
              : latestData[dataKey];
          setValue(`${formattedValue}${unit}`);
        } else {
          setValue("N/A");
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setValue("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Polling every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [apiEndpoint, dataKey, unit]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{getIcon()}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {loading && (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          )}
          {!loading && (
            <p
              className={`text-2xl font-bold ${
                error ? "text-red-500" : "text-gray-900"
              }`}
            >
              {value}
            </p>
          )}
          {error && !loading && (
            <span className="ml-2 text-xs text-red-400">({error})</span>
          )}
        </div>
      </div>
    </div>
  );
}
