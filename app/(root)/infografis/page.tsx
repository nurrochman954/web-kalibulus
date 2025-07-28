"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import InfografisSecondBar from "@/components/InfografisSecondBar";
import PendudukComponent from "@/components/Penduduk";
import KalibulusProfile from "@/components/KalbulusProfile";

const Infografis: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <InfografisSecondBar />
      <KalibulusProfile />
      <Footer />

    </main>
  );
};


export default Infografis;