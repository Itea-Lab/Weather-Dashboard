import useSWR from "swr";
import { cardData, WindData, RainData } from "@/types/sensorData";
import { Dataset } from "@/types/dataset";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLatestWeatherData() {
  const { data, error, isLoading } = useSWR<cardData>(
    "/api/weather/latest",
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    data,
    error,
    isLoading,
  };
}

export function useWindData(timeRange: string = "-24h") {
  const { data, error, isLoading } = useSWR<WindData[]>(
    `/api/weather/wind?range=${timeRange}`,
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    windData: data,
    error,
    isLoading,
  };
}

export function useRainData(timeRange: string = "-24h") {
  const { data, error, isLoading } = useSWR<RainData[]>(
    `/api/weather/rain?range=${timeRange}`,
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    rainData: data,
    error,
    isLoading,
  };
}

export function useDatasetData(
  filters: {
    search?: string;
    sortOrder?: "asc" | "desc";
    range?: string;
  } = {}
) {
  const { search = "", sortOrder = "desc", range = "-30d" } = filters;

  // Build URL with query params
  const queryString = new URLSearchParams();
  if (sortOrder) queryString.append("sortOrder", sortOrder);
  if (search) queryString.append("search", search);
  if (range) queryString.append("range", range);

  const url = `/api/weather/dataset?${queryString.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<Dataset[]>(url, fetcher, {
    refreshInterval: 30000,
  });

  return {
    datasets: data || [],
    error,
    isLoading,
    mutate,
  };
}

export async function deleteDatapoint(timestamp: string) {
  try {
    const response = await fetch("/api/weather/deleteData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp, location }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting datapoint:", error);
    throw error;
  }
}