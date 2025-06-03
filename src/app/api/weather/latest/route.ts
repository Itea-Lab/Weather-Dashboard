import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/influxdb";

export async function GET(_request: Request) {
  try {
    const bucket = process.env.INFLUXDB_BUCKET || "weather_data";

    const query = `
      from(bucket: "${bucket}")
        |> range(start: -1h)
        |> filter(fn: (r) => r._measurement == "weather_sensor")
        |> last()
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    `;

    const result = (await executeQuery(query)) as Array<{
      _time: string;
      temperature?: number;
      humidity?: number;
      pressure?: number;
      avgWindSpeed?: number;
      maxWindSpeed?: number;
      windDirection?: number;
    }>;

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    // Format the response to match cardData interface
    const data = {
      id: 1,
      timestamp: result[0]._time,
      temperature: result[0].temperature || 0,
      humidity: result[0].humidity || 0,
      pressure: result[0].pressure || 0,
      avgWindSpeed: result[0].avgWindSpeed || 0,
      maxWindSpeed: result[0].maxWindSpeed || 0,
      windDirection: result[0].windDirection || 0,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching latest weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
