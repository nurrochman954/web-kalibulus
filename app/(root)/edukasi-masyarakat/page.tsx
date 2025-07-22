"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import PendudukComponent from "@/components/Penduduk";
import ModulGermas from "@/components/ModulGermas";

const EdukasiMasyarakat: React.FC = () => {
  // Ganti URL dari Google Drive ke static file
  // Pastikan file modul-germas.pdf ada di folder /public/pdfs/
  const pdfUrl = "/pdfs/modul-germas.pdf";

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar />
      <PendudukComponent />
      
      {/* Section untuk Modul GERMAS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Modul Edukasi GERMAS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pelajari panduan lengkap Gerakan Masyarakat Hidup Sehat (GERMAS) 
              melalui modul interaktif yang mudah dipahami dengan fitur flip book
            </p>
          </div>
          
          <div className="flex justify-center">
            <ModulGermas
              pdfUrl={pdfUrl}
              width={800}
              height={600}
              className="shadow-lg"
            />
          </div>
          
          {/* Download button */}
          <div className="text-center mt-8">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              📥 Download PDF Modul GERMAS
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EdukasiMasyarakat;