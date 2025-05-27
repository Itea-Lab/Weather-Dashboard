"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { RainData } from "@/types/sensorData";

export default function RainChart() {
  const [sensorData, setSensorData] = useState<RainData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/rainFallData");
        if (!response.ok) {
          throw new Error("Failed to fetch sensor data");
        }
        const data: RainData[] = await response.json();
        // Format timestamp for display
        const formattedData = data.map((item) => ({
          ...item,
          time: new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date(item.timestamp).toLocaleDateString(),
        }));
        setSensorData(formattedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();

    // Polling every 10 seconds for real-time updates
    const interval = setInterval(fetchSensorData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading rainfall data...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          Error: {error}
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetch("/api/rainFallData")
                .then((response) => response.json())
                .then((data: RainData[]) => {
                  const formattedData = data.map((item) => ({
                    ...item,
                    time: new Date(item.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    date: new Date(item.timestamp).toLocaleDateString(),
                  }));
                  setSensorData(formattedData);
                  setLoading(false);
                })
                .catch((err) => {
                  setError(
                    err instanceof Error ? err.message : "An error occurred"
                  );
                  setLoading(false);
                });
            }}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Rainfall Data
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sensorData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            label={{
              value: "Rainfall (mm)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              `${value} mm`,
              name === "rainFallbyHour"
                ? "Hourly Rainfall"
                : name === "rainFallbyDay"
                ? "Daily Rainfall"
                : name,
            ]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="rainFallbyDay"
            fill="#3b82f6"
            radius={4}
            name="Daily Rainfall"
          />
          <Bar
            dataKey="rainFallbyHour"
            fill="#10b981"
            radius={4}
            name="Hourly Rainfall"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
