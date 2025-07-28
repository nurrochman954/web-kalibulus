// lib/googleSheets.ts
import { google } from "googleapis";

export async function getLatestRekapData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.SPREADSHEET_ID!;
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });

  // Filter hanya sheet yang namanya mengandung "Rekap"
  const rekapSheets =
    metadata.data.sheets
      ?.map((sheet) => sheet.properties?.title || "")
      .filter((title) => title.startsWith("Rekap")) || [];

  const rekapData = [];

  for (const title of rekapSheets) {
    try {
      const periodeRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${title}!E11:F12`,
      });

      const periodeRows = periodeRes.data.values || [];
      const periode = periodeRows[1]?.[0] || "";
      const tahun = parseInt(periodeRows[1]?.[1]) || 0;

      const rekapRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${title}!A1:C20`,
      });

      const rekapRows = rekapRes.data.values || [];
      const totalBalitaRow = rekapRows.find((r) =>
        r[0]?.includes("Total Balita Aktif")
      );
      const totalBalita = totalBalitaRow?.[2] ? Number(totalBalitaRow[2]) : 0;

      rekapData.push({
        sheet: title,
        periode,
        tahun,
        totalBalita,
      });
    } catch (err) {
      console.warn(`Gagal membaca sheet ${title}:`, err);
    }
  }

  // Urutkan berdasarkan tahun & prioritas semester (JAN-JUN lebih lama dari JUL-DEC)
  rekapData.sort((a, b) => {
    if (a.tahun !== b.tahun) return b.tahun - a.tahun; // Tahun terbaru lebih dulu
    const prioritas = (p: string) => (p.includes("Januari") ? 1 : 0); // JUL-DEC dianggap lebih baru
    return prioritas(a.periode) - prioritas(b.periode);
  });

  // Log urutan hasil setelah sort
  console.log("📋 Urutan data rekap setelah sort:");
  rekapData.forEach((r, i) => {
    console.log(
      `#${i + 1}: Sheet "${r.sheet}" – Periode: ${r.periode} ${
        r.tahun
      }, Total Balita: ${r.totalBalita}`
    );
  });

  // Ambil data terbaru yang totalBalita > 0, fallback ke yang terbaru meskipun 0
  const selected = rekapData.find((r) => r.totalBalita > 0) || rekapData[0];

  if (selected) {
    console.log(
      `✅ Menggunakan data dari sheet: "${selected.sheet}" – Periode: ${selected.periode} ${selected.tahun}`
    );
  } else {
    console.warn("⚠️ Tidak ada sheet rekap yang valid ditemukan.");
  }

  const sheetName = selected?.sheet;
  if (!sheetName) throw new Error("Tidak ada sheet rekap valid ditemukan.");

  // Sekarang ambil data penuh dari sheet tersebut
  const rekapRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:C20`,
  });

  const bulananRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!E1:K8`,
  });

  const periodeRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!E11:F12`,
  });

  const rekapRows = rekapRes.data.values || [];
  const bulananRows = bulananRes.data.values || [];
  const periodeRows = periodeRes.data.values || [];

  const getValue = (label: string) => {
    const row = rekapRows.find((r) => r[0]?.trim() === label);
    return row?.[2] ? Number(row[2]) : null;
  };

  const getGroupedValue = (mainLabel: string, subLabel: string) => {
    for (let i = 0; i < rekapRows.length - 1; i++) {
      const current = rekapRows[i];
      const next = rekapRows[i + 1];

      if (current[0]?.includes(mainLabel) && next[1]?.includes(subLabel)) {
        return Number(next[2]);
      }
      if (current[0]?.includes(mainLabel) && current[1]?.includes(subLabel)) {
        return Number(current[2]);
      }
    }
    return null;
  };

  return {
    sheet: sheetName,
    periode: selected.periode,
    tahun: selected.tahun,
    totalBalita: getValue("Total Balita Aktif") ?? 0,
    jumlahLaki: getGroupedValue("Jumlah Balita", "Laki-laki") ?? 0,
    jumlahPerempuan: getGroupedValue("Jumlah Balita", "Perempuan") ?? 0,
    rataUmur: getValue("Rata-rata Umur Total") ?? 0,
    umurLaki: getGroupedValue("Rata-rata Umur (bulan)", "Laki-laki") ?? 0,
    umurPerempuan: getGroupedValue("Rata-rata Umur (bulan)", "Perempuan") ?? 0,
    rataBB: getValue("Rata-rata Berat Badan Total") ?? 0,
    bbLaki: getGroupedValue("Rata-rata Berat Badan (kg)", "Laki-laki") ?? 0,
    bbPerempuan:
      getGroupedValue("Rata-rata Berat Badan (kg)", "Perempuan") ?? 0,
    rataTB: getValue("Rata-rata Tinggi Badan Total") ?? 0,
    tbLaki: getGroupedValue("Rata-rata Tinggi Badan (cm)", "Laki-laki") ?? 0,
    tbPerempuan:
      getGroupedValue("Rata-rata Tinggi Badan (cm)", "Perempuan") ?? 0,
    rataLK: getValue("Rata-rata Lingkar Kepala Total") ?? 0,
    lkLaki: getGroupedValue("Rata-rata Lingkar Kepala (cm)", "Laki-laki") ?? 0,
    lkPerempuan:
      getGroupedValue("Rata-rata Lingkar Kepala (cm)", "Perempuan") ?? 0,
    jumlahStunting: getValue("Jumlah Indikasi Stunting Total") ?? 0,
    persenStunting: rekapRows.find((r) =>
      r[0]?.includes("Persentase Stunting")
    )?.[2],
    grafikBulanan: bulananRows.slice(1).map((row) => ({
      bulan: row[0],
      bbLaki: parseFloat(row[1]) ?? 0,
      bbPerempuan: parseFloat(row[2]) ?? 0,
      tbLaki: parseFloat(row[3]) ?? 0,
      tbPerempuan: parseFloat(row[4]) ?? 0,
      lkLaki: parseFloat(row[5]) ?? 0,
      lkPerempuan: parseFloat(row[6]) ?? 0,
    })),
    periodeRekap: periodeRows.slice(1).map((row) => ({
      periode: row[0],
      tahun: parseFloat(row[1]) ?? 0,
    })),
  };
}
