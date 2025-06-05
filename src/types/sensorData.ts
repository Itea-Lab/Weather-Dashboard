// Define the expected data structure
export interface WindData {
  id: string | number;
  timestamp: string | number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  windDirection: number;
}

export interface cardData {
  id: string | number;
  timestamp: string | number;
  temperature: number;
  humidity: number;
  pressure: number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  windDirection: number;
}

export interface RainData {
  id: string | number;
  timestamp: string | number;
  rainFallbyDay: number;
  rainFallbyHour: number;
}