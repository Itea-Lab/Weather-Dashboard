import { NextResponse } from "next/server";
import { RainData } from "@/types/sensorData";

const rainFallData: RainData[] = [
    {
        id: "1",
        timestamp: "2025-05-09T08:00:00Z",
        rainFallbyDay: 5.2,
        rainFallbyHour: 0.8,
    },
    {
        id: "2",
        timestamp: "2025-05-09T09:00:00Z",
        rainFallbyDay: 6.1,
        rainFallbyHour: 1.0,
    },
    {
        id: "3",
        timestamp: "2025-05-09T10:00:00Z",
        rainFallbyDay: 4.8,
        rainFallbyHour: 0.6,
    },
    {
        id: "4",
        timestamp: "2025-05-08T11:00:00Z",
        rainFallbyDay: 7.3,
        rainFallbyHour: 1.2,
    },
    {
        id: "5",
        timestamp: "2025-05-08T12:00:00Z",
        rainFallbyDay: 3.9,
        rainFallbyHour: 0.4,
    },
];

// GET handler for the /api/auth endpoint
export async function GET() {
  try {
    // In a real app, you might fetch from a database or external API here
    // For now, return the sample data
    return NextResponse.json(rainFallData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}