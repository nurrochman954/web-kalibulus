"use client";

import React from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ProfilDusun from "@/components/ProfilDusun";


const ProfilDusunPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <ProfilDusun />
      <Footer />
    </main>
  );
};


export default ProfilDusunPage;