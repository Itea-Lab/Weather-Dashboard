export interface Device {
  id: string;
  name: string;
  description: string;
  connectionType: "mqtts" | "https";
  group: string;
  status: "online" | "offline" | "maintenance";
  lastSeen: string;
  signalStrength: number;
}

export const devices: Device[] = [
  {
    id: "device-001",
    name: "Temperature Sensor #1",
    description: "Outdoor temperature sensor",
    connectionType: "mqtts",
    group: "Outdoor Sensors",
    status: "online",
    lastSeen: new Date().toISOString(),
    signalStrength: -42,
  },
  {
    id: "device-002",
    name: "Humidity Monitor",
    description: "Indoor humidity monitor",
    connectionType: "mqtts",
    group: "Indoor Sensors",
    status: "online",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    signalStrength: -38,
  },
  {
    id: "device-003",
    name: "Multi Sensor Hub",
    description: "Hub for multiple sensors",
    connectionType: "mqtts",
    group: "Sensor Hubs",
    status: "online",
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    signalStrength: -45,
  },
];
