// lib/googleSheets.ts
import { google } from "googleapis";

export async function getRekapData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Ambil rekap kiri (kategori)
  const rekapRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: "Rekap JUNI!A1:C20",
  });

  // Ambil data per bulan (kanan)
  const bulananRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: "Rekap JUNI!E1:K8",
  });

  // Ambil data periode
  const periodeRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: "Rekap JUNI!E11:F12",
  });

  const rekapRows = rekapRes.data.values || [];
  const bulananRows = bulananRes.data.values || [];
  const periodeRows = periodeRes.data.values || [];

  const getValue = (label: string) => {
    const row = rekapRows.find((r) => r[0]?.trim() === label);
    return row?.[2] ? Number(row[2]) : null;
  };

  // Ambil nilai dari dua kolom: kategori dan subkategori (misalnya jenis kelamin)
  const getGroupedValue = (mainLabel: string, subLabel: string) => {
    for (let i = 0; i < rekapRows.length - 1; i++) {
      const current = rekapRows[i];
      const next = rekapRows[i + 1];

      // Jika label utama cocok di kolom 0 dan sublabel di kolom 1 baris berikutnya
      if (current[0]?.includes(mainLabel) && next[1]?.includes(subLabel)) {
        return Number(next[2]);
      }

      // Atau: jika label utama dan sublabel langsung di baris yang sama
      if (current[0]?.includes(mainLabel) && current[1]?.includes(subLabel)) {
        return Number(current[2]);
      }
    }

    return null; // default jika tidak ketemu
  };

  const result = {
    // Jumlah
    totalBalita: getValue("Total Balita Aktif") ?? 0,
    jumlahLaki: getGroupedValue("Jumlah Balita", "Laki-laki") ?? 0,
    jumlahPerempuan: getGroupedValue("Jumlah Balita", "Perempuan") ?? 0,
    // Rata-rata umur
    rataUmur: getValue("Rata-rata Umur Total") ?? 0,
    umurLaki: getGroupedValue("Rata-rata Umur (bulan)", "Laki-laki") ?? 0,
    umurPerempuan: getGroupedValue("Rata-rata Umur (bulan)", "Perempuan") ?? 0,
    // Rata-rata BB
    rataBB: getValue("Rata-rata Berat Badan Total") ?? 0,
    bbLaki: getGroupedValue("Rata-rata Berat Badan (kg)", "Laki-laki") ?? 0,
    bbPerempuan: getGroupedValue("Rata-rata Berat Badan (kg)", "Perempuan") ?? 0,
    // Rata-rata TB
    rataTB: getValue("Rata-rata Tinggi Badan Total") ?? 0,
    tbLaki: getGroupedValue("Rata-rata Tinggi Badan (cm)", "Laki-laki") ?? 0,
    tbPerempuan: getGroupedValue("Rata-rata Tinggi Badan (cm)", "Perempuan") ?? 0,
    // Rata-rata LK
    rataLK: getValue("Rata-rata Lingkar Kepala Total") ?? 0,
    lkLaki: getGroupedValue("Rata-rata Lingkar Kepala (cm)", "Laki-laki") ?? 0,
    lkPerempuan: getGroupedValue("Rata-rata Lingkar Kepala (cm)", "Perempuan") ?? 0,
    jumlahStunting: getValue("Jumlah Indikasi Stunting Total") ?? 0,
    persenStunting: rekapRows.find((r) =>
      r[0]?.includes("Persentase Stunting")
    )?.[2],

    // Data per bulan (untuk grafik)
    grafikBulanan: bulananRows.slice(1).map((row) => ({
      bulan: row[0],
      bbLaki: parseFloat(row[1]) ?? 0,
      bbPerempuan: parseFloat(row[2]) ?? 0,
      tbLaki: parseFloat(row[3]) ?? 0,
      tbPerempuan: parseFloat(row[4]) ?? 0,
      lkLaki: parseFloat(row[5]) ?? 0,
      lkPerempuan: parseFloat(row[6]) ?? 0,
    })),

    // Data periode
    periodeRekap: periodeRows.slice(1).map((row) => ({
      periode: row[0],
      tahun: parseFloat(row[1]) ?? 0,
    })),
  };
  console.log("HASIL REKAP:", result); // Tambahkan baris ini
  //console.log("ISI rekapRows:", JSON.stringify(rekapRows, null, 2));

  return result;
}
