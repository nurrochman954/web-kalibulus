"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import InfografisSecondBar from "@/components/InfografisSecondBar";
import InfografisWilayah from "@/components/InfografisWilayah";

const Wilayah: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <InfografisSecondBar currentPage="wilayah" />
      <InfografisWilayah />
      <Footer />

    </main>
  );
};


export default Wilayah;