export interface PDFItem {
  id: string;
  title: string;
  description?: string;
  filename: string; // nama file di /public/pdfs/
  category?: string;
}

// Update dengan PDF yang Anda punya
export const pdfCollection: PDFItem[] = [
  {
    id: 'modul-germas',
    title: 'Modul GERMAS',
    description: 'Panduan Gerakan Masyarakat Hidup Sehat',
    filename: 'modul-germas.pdf', // file di /public/pdfs/modul-germas.pdf
    category: 'kesehatan'
  },
  // Tambahkan PDF lainnya sesuai yang ada di folder /public/pdfs/
  {
    id: 'panduan-posyandu',
    title: 'Panduan Posyandu',
    description: 'Petunjuk teknis penyelenggaraan posyandu',
    filename: 'panduan-posyandu.pdf',
    category: 'kesehatan'
  },
  {
    id: 'modul-stunting',
    title: 'Pencegahan Stunting',
    description: 'Panduan pencegahan stunting pada balita',
    filename: 'modul-stunting.pdf',
    category: 'gizi'
  },
  {
    id: 'buku-kia',
    title: 'Buku KIA',
    description: 'Buku Kesehatan Ibu dan Anak',
    filename: 'buku-kia.pdf',
    category: 'kesehatan'
  },
  {
    id: 'panduan-asi',
    title: 'Panduan ASI Eksklusif',
    description: 'Panduan pemberian ASI eksklusif 6 bulan',
    filename: 'panduan-asi.pdf',
    category: 'gizi'
  }
  // Tambah sesuai kebutuhan hingga <10 PDF
];

// Helper function untuk generate URL yang benar
export function getPdfUrl(filename: string): string {
  return `/pdfs/${filename}`; 
}

// Helper untuk validate PDF exists (untuk development)
export async function validatePdfExists(filename: string): Promise<boolean> {
  try {
    const response = await fetch(getPdfUrl(filename), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Helper untuk mendapatkan PDF berdasarkan ID
export function getPdfById(id: string): PDFItem | undefined {
  return pdfCollection.find(pdf => pdf.id === id);
}

// Helper untuk mendapatkan PDF berdasarkan kategori
export function getPdfsByCategory(category: string): PDFItem[] {
  return pdfCollection.filter(pdf => pdf.category === category);
}

// Helper untuk mendapatkan semua kategori
export function getAllCategories(): string[] {
  const categories = pdfCollection
    .map(pdf => pdf.category)
    .filter((category): category is string => Boolean(category));
  return [...new Set(categories)];
}