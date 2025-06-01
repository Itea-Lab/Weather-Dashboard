"use client";

import { useState } from "react";
import { useRainData } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function RainChart() {
  const [timeRange, setTimeRange] = useState("-1h");
  const { rainData, error, isLoading } = useRainData(timeRange);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "HH:mm");
    } catch {
      return dateString;
    }
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="text-gray-500">Loading rainfall data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="text-red-500">Failed to load rainfall data</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Rainfall Data</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="rainTimeRange" className="text-sm text-gray-500">
            Time Range:
          </label>
          <select
            id="rainTimeRange"
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="-1h">Last Hour</option>
            <option value="-6h">Last 6 Hours</option>
            <option value="-12h">Last 12 Hours</option>
            <option value="-24h">Last 24 Hours</option>
          </select>
        </div>
      </div>

      {rainData && rainData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={rainData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Rainfall (mm)",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              labelFormatter={(value) => `Time: ${formatDate(value)}`}
              formatter={(value: number, name: string) => [
                `${value.toFixed(2)} mm`,
                name === "rainFallbyHour"
                  ? "Hourly Rainfall"
                  : name === "rainFallbyDay"
                  ? "Daily Rainfall"
                  : name,
              ]}
            />
            <Legend />
            <Bar
              dataKey="rainFallbyHour"
              name="Hourly Rainfall"
              fill="#3b82f6"
            />
            <Bar dataKey="rainFallbyDay" name="Daily Rainfall" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-500">No rainfall data available</div>
        </div>
      )}
    </div>
  );
}
