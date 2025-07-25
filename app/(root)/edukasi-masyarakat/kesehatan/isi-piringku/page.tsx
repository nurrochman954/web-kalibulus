"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import LeafletIsiPiringku from "@/components/LeafletIsiPiringku";

const IsiPiringkuPage: React.FC = () => {
  // URL PDF leaflet stunting - sesuaikan dengan path file PDF Anda
  const pdfUrl = "/pdfs/leaflet-isi-piringku.pdf";

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="kesehatan" />
      
      {/* Leaflet IsiPiringku Component */}
      <LeafletIsiPiringku 
        pdfUrl={pdfUrl}
        showDescription={true}
        className=""
      />s
      
      <Footer />
    </main>
  );
};

export default IsiPiringkuPage;