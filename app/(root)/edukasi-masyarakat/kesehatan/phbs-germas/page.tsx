"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import ModulGermas from "@/components/ModulGermas";

// Hook untuk mendeteksi elemen saat masuk ke viewport
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Interface untuk props komponen deskripsi
interface GermasDescriptionProps {
  maxWidth: number;
}

// Komponen Deskripsi Modul
const GermasDescription: React.FC<GermasDescriptionProps> = ({ maxWidth }) => {
  const [descRef, isDescVisible] = useIntersectionObserver(0.2);

  return (
    <div
      ref={descRef}
      style={{ maxWidth: `${maxWidth}px`, width: '100%' }}
      className={`mx-auto mb-8 px-4 transition-all duration-1000 ${
        isDescVisible
          ? "animate-fade-in opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
        <div
          className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-3xl p-6 lg:p-8 shadow-xl border border-cyan-100 w-full"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Tentang Modul PHBS GERMAS
            </h2>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg lg:text-xl">
              <span className="font-semibold text-cyan-700">
                Perilaku Hidup Bersih dan Sehat (PHBS) dan Gerakan Masyarakat
                Hidup Sehat (GERMAS)
              </span>{" "}
              merupakan dua pilar penting dalam upaya menciptakan masyarakat
              yang sehat dan mandiri. Modul komprehensif ini disusun untuk
              memberikan panduan praktis bagi keluarga Indonesia dalam
              menerapkan pola hidup sehat yang dapat dilakukan dalam kehidupan
              sehari-hari. Dengan pendekatan yang mudah dipahami dan
              diterapkan, modul ini mencakup 10 indikator PHBS dan 7 langkah
              GERMAS yang telah terbukti efektif dalam meningkatkan derajat
              kesehatan masyarakat.
            </p>
            <p className="text-lg lg:text-xl">
              <span className="font-semibold text-cyan-700">
                Melalui 16 halaman yang disajikan secara interaktif
              </span>
              , modul ini membahas berbagai aspek kesehatan mulai dari aktivitas
              fisik, pola makan sehat, kesehatan lingkungan, pencegahan
              penyakit, hingga kesehatan mental dan emosional. Setiap
              pembahasan dilengkapi dengan tips praktis yang dapat langsung
              diterapkan, data faktual terkini, dan panduan step-by-step yang
              memudahkan implementasi di tingkat keluarga. Dengan menerapkan
              PHBS GERMAS secara konsisten, diharapkan setiap keluarga dapat
              menciptakan lingkungan yang mendukung tumbuh kembang optimal anak
              dan kesejahteraan seluruh anggota keluarga.
            </p>
          </div>
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border-l-4 border-cyan-500">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Pesan Utama:
                </h4>
                <p className="text-gray-600 italic">
                  &ldquo;Dari Cinta, Tumbuh Sehat - Keluarga Sehat Dimulai dari
                  Kebiasaan Sederhana dan Hati yang Bersyukur&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

// Komponen Halaman Utama
const PHBSGermasPage: React.FC = () => {
  const pdfUrl = "/pdfs/Modul-germas.pdf";

  // --- PERUBAHAN UTAMA ADA DI SINI ---
  // Kita pisahkan lebar untuk deskripsi dan untuk modul buku
  const descriptionWidth = 680; // Lebar baru untuk kotak deskripsi (lebih kecil)
  const moduleWidth = 800;      // Lebar untuk modul buku tetap sama

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Modul-PHBS-GERMAS.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="kesehatan" />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            
            {/* Menggunakan lebar baru yang lebih kecil untuk deskripsi */}
            <GermasDescription maxWidth={descriptionWidth} />

            {/* Menggunakan lebar asli untuk modul buku */}
            <ModulGermas
              pdfUrl={pdfUrl}
              width={moduleWidth}
              height={600}
              className="shadow-lg"
            />

            <div className="text-center mt-12 animate-fade-in pb-4">
              <div className="max-w-md mx-auto">
                <button
                  onClick={handleDownload}
                  className="btn-primary w-full text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Unduh Modul PHBS GERMAS</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeInUp 1s ease-in-out;
        }
        .btn-primary {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0.025em;
          color: white;
          border: none;
          cursor: pointer;
          display: inline-block;
        }
      `}</style>
    </main>
  );
};

export default PHBSGermasPage;