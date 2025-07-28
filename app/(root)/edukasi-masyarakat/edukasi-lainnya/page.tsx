"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";

const EdukasiLainnya: React.FC = () => {
  const [activeTab, setActiveTab] = useState('literasi-digital');

  const tabData = {
    'literasi-digital': {
      title: "Literasi Digital",
      subtitle: "Bijak Berdigital di Era Modern",
      description: "Panduan lengkap literasi digital meliputi UU ITE, penggunaan AI yang bijak, dan keterampilan digital yang bertanggung jawab. Pelajari cara menggunakan teknologi dengan aman dan produktif.",
      features: ["Literasi Digital", "UU ITE", "Bijak Penggunaan AI", "Keamanan Digital"],
      color: "purple",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      link: "/edukasi-masyarakat/edukasi-lainnya/literasi-digital",
      pages: "Multi Halaman",
      readTime: "15 menit baca"
    },
    gagrak: {
      title: "Gagrak",
      subtitle: "Budaya dan Tradisi Lokal",
      description: "Eksplorasi mendalam tentang gagrak sebagai bagian dari kearifan lokal dan budaya tradisional. Memahami nilai-nilai luhur yang terkandung dalam tradisi dan cara melestarikannya.",
      features: ["Kearifan Lokal", "Budaya Tradisional", "Nilai Luhur", "Pelestarian Budaya"],
      color: "amber",
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zm0 2.5L9.23 8.83 3.18 9.53l4.91 4.78-1.16 6.78L12 18.58l5.07 2.67-1.16-6.78 4.91-4.78L14.77 8.83 12 4.5z",
      link: "/edukasi-masyarakat/edukasi-lainnya/gagrak",
      pages: "17 Halaman",
      readTime: "12 menit baca"
    }
  };

  const currentTab = tabData[activeTab as keyof typeof tabData];

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lainnya" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 lg:py-24 lg:min-h-[75vh] lg:flex lg:items-center">
        <div className="container-custom w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            
            <h1 className="section-title text-center mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Edukasi Lainnya
              </span>
            </h1>
            
            <p className="section-description mx-auto text-center">
              Materi edukasi tambahan yang mencakup literasi digital, kearifan lokal, dan berbagai 
              topik penting lainnya. Tingkatkan pengetahuan Anda dalam berbagai bidang yang mendukung 
              kehidupan bermasyarakat di era digital dan pelestarian budaya lokal.
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
                      ? `bg-gradient-to-r ${
                          data.color === 'purple' ? 'from-purple-500 to-purple-600' :
                          'from-amber-500 to-amber-600'
                        } text-white shadow-xl transform scale-105`
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeTab === key 
                        ? 'bg-white/20' 
                        : `bg-${data.color}-100`
                    }`}>
                      <svg className={`w-6 h-6 ${
                        activeTab === key 
                          ? 'text-white' 
                          : `text-${data.color}-600`
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
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${
                      currentTab.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-amber-500 to-amber-600'
                    } flex items-center justify-center`}>
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
                      <div className={`w-8 h-8 rounded-full bg-${currentTab.color}-100 flex items-center justify-center`}>
                        <svg className={`w-4 h-4 text-${currentTab.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <button className={`btn-primary bg-gradient-to-r ${
                      currentTab.color === 'purple' ? 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' :
                      'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                    } transform hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300`}>
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

export default EdukasiLainnya;