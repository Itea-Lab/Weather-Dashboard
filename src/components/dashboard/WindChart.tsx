"use client";

import { useEffect, useState } from "react";
import { WindData } from "@/types/sensorData";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


export default function WindChart() {
  const [sensorData, setSensorData] = useState<WindData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/sensorData");
        if (!response.ok) {
          throw new Error("Failed to fetch sensor data");
        }
        const data: WindData[] = await response.json();
        // Format timestamp for display if needed
        const formattedData = data.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleTimeString(), // Format timestamp
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
        <div className="text-gray-500">Loading sensor data...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-white flex justify-center items-center h-64">
        <div className="text-red-500">
          Error: {error}
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetch("/api/sensorData/windData")
                .then((response) => response.json())
                .then((data: WindData[]) => {
                  const formattedData = data.map((item) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleTimeString(),
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
            className="ml-4 text-blue-600 hover:text-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Wind Speed Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={sensorData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            label={{ value: "Time", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Wind Speed (m/s)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="avgWindSpeed"
            name="Average Wind Speed"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="maxWindSpeed"
            name="Max Wind Speed"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
