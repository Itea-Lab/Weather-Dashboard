import { NextResponse } from "next/server";
import { cardData } from "@/types/sensorData";

const mockData: cardData = {
  id: 1,
  timestamp: "2025-05-09T08:00:00Z",
  temperature: 22.5,
  humidity: 65,
  pressure: 1013.2,
  avgWindSpeed: 10.5,
  maxWindSpeed: 15.2,
  windDirection: 270,
};

export async function GET() {
  try {
    // In a real app, you might fetch from a database or external API here
    // For now, return the sample data
    return NextResponse.json(mockData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
