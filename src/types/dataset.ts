export interface Dataset {
  id: string;
  _time: any; 
  temperature: number;
  humidity: number;
  pressure: number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  windDirection: number;
  rainFallbyDay: number;
  rainFallbyHour: number;
  location: string;
}
