"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";

const Kesehatan: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="kesehatan" />
      <Footer />
    </main>
  );
};


export default Kesehatan;