import { NextResponse } from "next/server";

// Sample data (in a real app, this would come from an API)
interface Dataset {
  id: string;
  lastUpdated: string;
  category: string;
  size: string;
  rows: number;
  columns: number;
  avgWindSpeed: number;
  maxWindSpeed: number;
  WindDirection: number;
  status: "active" | "processing" | "error";
}

const sampleDatasets: Dataset[] = [
  {
    id: "1",
    lastUpdated: "2025-05-01",
    category: "Analytics",
    size: "2.4 MB",
    rows: 15432,
    columns: 24,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "2",
    lastUpdated: "2025-04-27",
    category: "Marketing",
    size: "4.8 MB",
    rows: 27845,
    columns: 18,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "3",
    lastUpdated: "2025-04-25",
    category: "Analytics",
    size: "8.1 MB",
    rows: 45632,
    columns: 32,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "4",
    lastUpdated: "2025-04-23",
    category: "Operations",
    size: "3.2 MB",
    rows: 18765,
    columns: 15,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "5",
    lastUpdated: "2025-04-20",
    category: "Sales",
    size: "1.7 MB",
    rows: 9876,
    columns: 21,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "processing",
  },
  {
    id: "6",
    lastUpdated: "2025-04-18",
    category: "Marketing",
    size: "5.3 MB",
    rows: 32145,
    columns: 28,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "7",
    lastUpdated: "2025-04-15",
    category: "Operations",
    size: "4.1 MB",
    rows: 23456,
    columns: 19,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "error",
  },
  {
    id: "8",
    lastUpdated: "2025-04-12",
    category: "HR",
    size: "2.8 MB",
    rows: 14789,
    columns: 22,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "9",
    lastUpdated: "2025-04-10",
    category: "Finance",
    size: "3.5 MB",
    rows: 19876,
    columns: 27,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "10",
    lastUpdated: "2025-04-08",
    category: "Marketing",
    size: "2.2 MB",
    rows: 12567,
    columns: 16,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "processing",
  },
  {
    id: "11",
    lastUpdated: "2025-04-05",
    category: "Operations",
    size: "1.9 MB",
    rows: 10234,
    columns: 14,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
  {
    id: "12",
    lastUpdated: "2025-04-02",
    category: "Operations",
    size: "6.7 MB",
    rows: 38765,
    columns: 31,
    avgWindSpeed: 0,
    maxWindSpeed: 0,
    WindDirection: 120,
    status: "active",
  },
];

// GET handler for the /api/auth endpoint
export async function GET() {
  try {
    // In a real app, you might fetch from a database or external API here
    // For now, return the sample data
    return NextResponse.json(sampleDatasets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch datasets" },
      { status: 500 }
    );
  }
}
