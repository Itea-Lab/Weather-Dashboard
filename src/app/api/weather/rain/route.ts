import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/influxdb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("range") || "-24h";
    const bucket = process.env.INFLUXDB_BUCKET;

    const query = `
      from(bucket: "${bucket}")
        |> range(start: ${timeRange})
        |> filter(fn: (r) => r._measurement == "weather_sensor")
        |> filter(fn: (r) => r._field == "rainfall_24hr" or r._field == "rainfall_1hr")
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
        |> sort(columns: ["_time"])
    `;

    const result = await executeQuery(query);

    // Format the response to match RainData interface
    const data = result.map((row: any, index: number) => ({
      id: index + 1,
      timestamp: row._time,
      rainFallbyDay: row.rainFallbyDay || 0,
      rainFallbyHour: row.rainFallbyHour || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rain data:", error);
    return NextResponse.json(
      { error: "Failed to fetch rain data" },
      { status: 500 }
    );
  }
}
