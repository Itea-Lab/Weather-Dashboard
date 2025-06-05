import useSWR from "swr";
import { cardData, WindData, RainData } from "@/types/sensorData";
import { Dataset } from "@/types/dataset";

const fetcher = async (url: string) => {
  try {
    // Get tokens from localStorage
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
    const csrfToken =
      typeof window !== "undefined" ? localStorage.getItem("csrf-token") : null;

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Include CSRF token if available
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }

    // Include Auth token if available (as backup)
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Make the request (with credentials to include cookies)
    const res = await fetch(url, {
      headers,
      credentials: "include", // Important: Send cookies with request
    });

    // Handle HTTP errors
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (_error) {
        errorData = { error: res.statusText || "Unknown error" };
      }
      // if (res.status === 401) {
      //   console.log("Authentication required, redirecting to login");
      // }
      const error = new Error(
        errorData.error || "API request failed"
      );
      (error as any).status = res.status;
      (error as any).info = errorData;
      throw error;
    }

    // Parse the JSON response
    return await res.json();;
  } catch (error) {
    // Handle network errors
    if (error instanceof Error && error.message.includes("Failed to fetch")) {
      const networkError = new Error("Cannot connect to server");
      (networkError as any).isNetworkError = true;
      throw networkError;
    }

    throw error;
  }
};

export function useLatestWeatherData() {
  const { data, error, isLoading } = useSWR<cardData>(
    "/api/weather/latest",
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    data,
    error: error
      ? error instanceof Error
        ? error
        : new Error(String(error))
      : null,
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
    error: error
      ? error instanceof Error
        ? error
        : new Error(String(error))
      : null,
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
    error: error
      ? error instanceof Error
        ? error
        : new Error(String(error))
      : null,
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
    fallbackData: [],
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Don't retry on 404s or bad data format errors
      if (
        error.status === 404 ||
        error.message.includes("Invalid data format") ||
        retryCount >= 3
      )
        return;

      // Retry after 5 seconds
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  return {
    datasets: Array.isArray(data) ? data : [],
    error,
    isLoading,
    mutate,
  };
}

export async function deleteDatapoint(timestamp: any) {
  try {
    const token = localStorage.getItem("auth-token");
    const csrfToken = localStorage.getItem("csrf-token");
    if (!token || !csrfToken) {
      throw new Error("Authentication required");
    }

    const formattedTimestamp =
      timestamp instanceof Date ? timestamp.toISOString() : timestamp;

    // console.log("Deleting datapoint with timestamp:", formattedTimestamp);

    const response = await fetch("/api/weather/deleteData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRF-Token": csrfToken, // Add the CSRF token
      },
      body: JSON.stringify({ timestamp: formattedTimestamp }),
      credentials: "include", // Include cookies
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
