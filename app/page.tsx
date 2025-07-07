"use client";

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TopBar from "../components/TopBar";
import JelajahiDusun from "@/components/JelajahiDusun";
import PetaDusun from "@/components/PetaDusun";
import AdministrasiPenduduk from "@/components/AdministrasiPenduduk";
import Footer from "@/components/Footer";


const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <Hero />
      <JelajahiDusun />
      <PetaDusun />
      <AdministrasiPenduduk />
      <Footer />
    </main>
  );
};


export default HomePage;