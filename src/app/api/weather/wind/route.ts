import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/influxdb";
import { withAuth } from "@/lib/auth";

export async function GET(request: Request) {
  return withAuth(request, async (req: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const timeRange = searchParams.get("range") || "-24h";
      const bucket = process.env.INFLUXDB_BUCKET || "weather_data";

      const query = `
      from(bucket: "${bucket}")
        |> range(start: ${timeRange})
        |> filter(fn: (r) => r._measurement == "weather_sensor")
        |> filter(fn: (r) => r._field == "avg_wind_speed" or r._field == "max_wind_speed" or r._field == "wind_wirection")
        |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
        |> sort(columns: ["_time"])
    `;

      const result = await executeQuery(query);

      // Format the response to match WindData interface
      const data = result.map((row: any, index: number) => ({
        id: index + 1,
        timestamp: row._time,
        avgWindSpeed: row.avgWindSpeed || 0,
        maxWindSpeed: row.maxWindSpeed || 0,
        windDirection: row.windDirection || 0,
      }));

      return NextResponse.json(data);
    } catch (error) {
      console.error("Error fetching wind data:", error);
      return NextResponse.json(
        { error: "Failed to fetch wind data" },
        { status: 500 }
      );
    }
  });
}
