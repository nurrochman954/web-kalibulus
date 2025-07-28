"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";

const EdukasiMasyarakat: React.FC = () => {
  const [activeTab, setActiveTab] = useState('biopori');

  const tabData = {
    biopori: {
      title: "Lubang Resapan Biopori",
      subtitle: "Solusi Sederhana untuk Lingkungan Lebih Baik",
      description: "Panduan lengkap membuat lubang resapan biopori untuk mengatasi banjir dan mengelola sampah organik. Teknologi sederhana dengan manfaat besar untuk lingkungan yang berkelanjutan.",
      features: ["Kurangi Banjir", "Kelola Sampah Organik", "Mudah Dibuat", "Ramah Lingkungan"],
      color: "green",
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
      link: "/edukasi-masyarakat/lingkungan/biopori",
      pages: "2 Halaman",
      readTime: "6 menit baca"
    },
    sampahplastik: {
      title: "Selamatkan Bumi dari Sampah Plastik",
      subtitle: "Kenali, Kurangi, dan Kelola Sampah Plastik",
      description: "Panduan komprehensif mengenali jenis sampah plastik, waktu penguraiannya, dan cara mengelolanya dengan tepat. Mari bersama-sama menyelamatkan bumi dari pencemaran plastik.",
      features: ["Kenali Jenis Plastik", "Pahami Dampaknya", "3R (Reduce, Reuse, Recycle)", "Solusi Praktis"],
      color: "green",
      icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
      link: "/edukasi-masyarakat/lingkungan/sampah-plastik",
      pages: "2 Halaman",
      readTime: "5 menit baca"
    },
    pengelolaansampah: {
      title: "Bijak Kelola, Bumi Selamat",
      subtitle: "Pengelolaan Sampah yang Bertanggung Jawab",
      description: "Materi lengkap tentang pengelolaan sampah yang benar, klasifikasi sampah berdasarkan jenis dan sifatnya, serta bahaya pengelolaan sampah yang tidak tepat bagi lingkungan dan kesehatan.",
      features: ["Klasifikasi Sampah", "Metode 5 Warna", "Bahaya Pembakaran", "Pengelolaan Berkelanjutan"],
      color: "green",
      icon: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z",
      link: "/edukasi-masyarakat/lingkungan/pengelolaan-sampah",
      pages: "Multi Halaman",
      readTime: "15 menit baca"
    }
  };

  const currentTab = tabData[activeTab as keyof typeof tabData];

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lingkungan" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 lg:py-24 lg:min-h-[75vh] lg:flex lg:items-center">
        <div className="container-custom w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            
            <h1 className="section-title text-center mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Pengelolaan Sampah
              </span>
            </h1>
            
            <p className="section-description mx-auto text-center">
              Tingkatkan kesadaran lingkungan melalui edukasi praktis tentang pengelolaan sampah, 
              teknologi ramah lingkungan, dan solusi berkelanjutan untuk menjaga kelestarian bumi 
              bagi generasi mendatang.
            </p>

          </div>
        </div>
      </section>

      {/* Interactive Tab Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            
            {/* Tab Buttons */}
            <div className="lg:w-1/3 space-y-4">
              {Object.entries(tabData).map(([key, data], index) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 animate-slide-in-left ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeTab === key 
                        ? 'bg-white/20' 
                        : 'bg-green-100'
                    }`}>
                      <svg className={`w-6 h-6 ${
                        activeTab === key 
                          ? 'text-white' 
                          : 'text-green-600'
                      }`} fill="currentColor" viewBox="0 0 24 24">
                        <path d={data.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{data.title}</h3>
                      <p className={`text-sm ${
                        activeTab === key ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {data.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="lg:w-2/3">
              <div className="card bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 animate-fade-in">
                
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d={currentTab.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{currentTab.title}</h3>
                      <p className="text-gray-600">{currentTab.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {currentTab.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {currentTab.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Metadata & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {currentTab.pages}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {currentTab.readTime}
                    </span>
                  </div>
                  
                  <Link href={currentTab.link}>
                    <button className="btn-primary bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <span className="flex items-center gap-2">
                        Buka Materi
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EdukasiMasyarakat;