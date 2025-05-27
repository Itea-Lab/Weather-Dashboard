import { NextResponse } from "next/server";
import { WindData } from "@/types/sensorData";

const windData: WindData[] = [
  {
    id: "1",
    timestamp: "2025-05-09T08:00:00Z",
    avgWindSpeed: 10.5,
    maxWindSpeed: 15.2,
    windDirection: 270,
  },
  {
    id: "2",
    timestamp: "2025-05-09T09:00:00Z",
    avgWindSpeed: 8.7,
    maxWindSpeed: 12.9,
    windDirection: 180,
  },
  {
    id: "3",
    timestamp: "2025-05-09T10:00:00Z",
    avgWindSpeed: 12.3,
    maxWindSpeed: 18.6,
    windDirection: 90,
  },
  {
    id: "4",
    timestamp: "2025-05-08T11:00:00Z",
    avgWindSpeed: 9.2,
    maxWindSpeed: 14.1,
    windDirection: 225,
  },
  {
    id: "5",
    timestamp: "2025-05-08T12:00:00Z",
    avgWindSpeed: 11.0,
    maxWindSpeed: 16.3,
    windDirection: 135,
  },
];

// GET handler for the /api/auth endpoint
export async function GET() {
  try {
    // In a real app, you might fetch from a database or external API here
    // For now, return the sample data
    return NextResponse.json(windData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
