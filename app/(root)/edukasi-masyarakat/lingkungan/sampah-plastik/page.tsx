"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import LeafletSampahPlastik from "@/components/LeafletSampahPlastik";

const SampahPlastikPage: React.FC = () => {
  // URL PDF leaflet sampah plastik - sesuaikan dengan path file PDF Anda
  const pdfUrl = "/pdfs/leaflet-infografis-sampah.pdf";

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lingkungan" />
      
      {/* Leaflet Sampah Plastik Component */}
      <LeafletSampahPlastik 
        pdfUrl={pdfUrl}
        showDescription={true}
        className=""
      />
      
      <Footer />
    </main>
  );
};

export default SampahPlastikPage;