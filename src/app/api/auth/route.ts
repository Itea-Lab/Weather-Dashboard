import { NextResponse } from "next/server";
import { Dataset } from "@/types/dataset";

const sampleDatasets: Dataset[] = [
  
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
