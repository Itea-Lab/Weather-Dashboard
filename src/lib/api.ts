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

export function useDatasetData() {
  const { data, error, isLoading } = useSWR<Dataset[]>(
    `/api/dataset`,
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    datasetData: data,
    error,
    isLoading,
  };
}
