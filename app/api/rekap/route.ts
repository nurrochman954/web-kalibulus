import { NextResponse } from "next/server";
import { getLatestRekapData } from "@/lib/googleSheets"; 

export async function GET() {
  try {
    const data = await getLatestRekapData(); 
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rekap data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
