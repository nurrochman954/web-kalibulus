"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import InfografisSecondBar from "@/components/InfografisSecondBar";

const Penduduk: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <InfografisSecondBar currentPage="pendidikan" />
      <Footer />

    </main>
  );
};


export default Penduduk;