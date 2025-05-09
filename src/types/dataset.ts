export interface Dataset {
  id: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  windDirection: number;
  rainFallbyDay: number;
  rainFallbyHour: number;
  status: "active" | "processing" | "error";
}
