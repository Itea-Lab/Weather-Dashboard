import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/influxdb";
import { Dataset } from "@/types/dataset";

// const sampleDatasets: Dataset[] = [
//   {
//     id: "1",
//     timestamp: "2025-05-09T08:00:00Z",
//     temperature: 22.5,
//     humidity: 65,
//     pressure: 1013.2,
//     avgWindSpeed: 10.5,
//     maxWindSpeed: 15.2,
//     windDirection: 270,
//     rainFallbyDay: 5.0,
//     rainFallbyHour: 0.2,
//     status: "active",
//   },
//   {
//     id: "2",
//     timestamp: "2025-05-09T09:00:00Z",
//     temperature: 23.1,
//     humidity: 62,
//     pressure: 1012.8,
//     avgWindSpeed: 8.7,
//     maxWindSpeed: 12.9,
//     windDirection: 180,
//     rainFallbyDay: 3.5,
//     rainFallbyHour: 0.1,
//     status: "active",
//   },
//   {
//     id: "3",
//     timestamp: "2025-05-09T10:00:00Z",
//     temperature: 21.8,
//     humidity: 70,
//     pressure: 1014.1,
//     avgWindSpeed: 12.3,
//     maxWindSpeed: 18.6,
//     windDirection: 90,
//     rainFallbyDay: 0.0,
//     rainFallbyHour: 0.0,
//     status: "processing",
//   },
//   {
//     id: "4",
//     timestamp: "2025-05-08T11:00:00Z",
//     temperature: 20.4,
//     humidity: 75,
//     pressure: 1010.5,
//     avgWindSpeed: 9.2,
//     maxWindSpeed: 14.1,
//     windDirection: 225,
//     rainFallbyDay: 7.2,
//     rainFallbyHour: 0.5,
//     status: "active",
//   },
//   {
//     id: "5",
//     timestamp: "2025-05-08T12:00:00Z",
//     temperature: 19.7,
//     humidity: 80,
//     pressure: 1009.8,
//     avgWindSpeed: 11.1,
//     maxWindSpeed: 16.8,
//     windDirection: 315,
//     rainFallbyDay: 10.1,
//     rainFallbyHour: 1.0,
//     status: "active",
//   },
// ];

// GET handler for the /api/auth endpoint
export async function GET(request: Request) {
  // try {
  //   //return the sample data
  //   return NextResponse.json(sampleDatasets, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "Failed to fetch datasets" },
  //     { status: 500 }
  //   );
  // }
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("range") || "-30d";
    const sortOrder =
      searchParams.get("sortOrder") || searchParams.get("sort") || "desc";
    const isDescending = sortOrder.toLowerCase() === "desc";
    const bucket = process.env.INFLUXDB_BUCKET;

    const query = `
      from(bucket: "${bucket}")
        |> range(start: ${timeRange})
        |> filter(fn: (r) => r._measurement == "weather_sensor")
        |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity" or r._field == "pressure" or r._field == "avgWindSpeed" or r._field == "maxWindSpeed" or r._field == "windDirection" or r._field == "rainFallbyDay" or r._field == "rainFallbyHour")
        |> pivot(rowKey:["_time", "location"], columnKey: ["_field"], valueColumn: "_value")
        |> sort(columns: ["_time"], desc: ${isDescending})
    `;

    const result = await executeQuery(query);

    // Format the response to match Dataset interface
    const data = (result as Dataset[]).map((row, index: number) => {
      // Format data
      const round = (value: number) =>
        Number(parseFloat(String(value || 0)).toFixed(1));
      return {
        id: index + 1,
        _time: row._time,
        location: row.location || "unknown",
        temperature: round(row.temperature),
        humidity: round(row.humidity),
        pressure: round(row.pressure),
        avgWindSpeed: round(row.avgWindSpeed),
        maxWindSpeed: round(row.maxWindSpeed),
        windDirection: round(row.windDirection),
        rainFallbyDay: round(row.rainFallbyDay),
        rainFallbyHour: round(row.rainFallbyHour),
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching datasets:", error);
    return NextResponse.json(
      { error: "Failed to fetch datasets" },
      { status: 500 }
    );
  }
}
