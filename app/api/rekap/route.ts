import { NextResponse } from "next/server";
import { getRekapData } from "@/lib/googleSheets";

export async function GET() {
  try {
    const data = await getRekapData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rekap data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
