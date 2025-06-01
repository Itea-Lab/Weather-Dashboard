"use client";

import { useState } from "react";
import { useWindData } from "@/lib/api";
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
import { format, parseISO } from "date-fns";

export default function LatestWindChart() {
  const [timeRange, setTimeRange] = useState("-1h");
  const { windData, error, isLoading } = useWindData(timeRange);

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
        <div className="text-gray-500">Loading wind data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 h-80 flex items-center justify-center">
        <div className="text-red-500">Failed to load wind data</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Wind Speed</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="timeRange" className="text-sm text-gray-500">
            Time Range:
          </label>
          <select
            id="timeRange"
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

      {windData && windData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={windData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Wind Speed (m/s)",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip labelFormatter={(value) => `Time: ${formatDate(value)}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgWindSpeed"
              name="Average Wind Speed"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="maxWindSpeed"
              name="Max Wind Speed"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-500">No wind data available</div>
        </div>
      )}
    </div>
  );
}
