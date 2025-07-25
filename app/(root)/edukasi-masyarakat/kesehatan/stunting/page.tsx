"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import LeafletStunting from "@/components/LeafletStunting";

const StuntingPage: React.FC = () => {
  // URL PDF leaflet stunting - sesuaikan dengan path file PDF Anda
  const pdfUrl = "/pdfs/leaflet-stunting.pdf";

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="kesehatan" />
      
      {/* Leaflet Stunting Component */}
      <LeafletStunting 
        pdfUrl={pdfUrl}
        showDescription={true}
        className=""
      />
      
      <Footer />
    </main>
  );
};

export default StuntingPage;