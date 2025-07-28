"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import LeafletBiopori from "@/components/LeafletBiopori";

const BioporiPage: React.FC = () => {
  // URL PDF leaflet biopori - sesuaikan dengan path file PDF Anda
  const pdfUrl = "/pdfs/leaflet-biopori.pdf";

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lingkungan" />
      
      {/* Leaflet Biopori Component */}
      <LeafletBiopori 
        pdfUrl={pdfUrl}
        showDescription={true}
        className=""
      />
      
      <Footer />
    </main>
  );
};

export default BioporiPage;