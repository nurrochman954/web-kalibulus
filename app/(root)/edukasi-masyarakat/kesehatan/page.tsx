"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";

const Kesehatan: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stunting');

  const tabData = {
    stunting: {
      title: "Pencegahan Stunting",
      subtitle: "Cegah Stunting, Cerdaskan Generasi",
      description: "Panduan lengkap mencegah stunting dengan pendekatan ABCDE. Fokus pada 1000 hari pertama kehidupan untuk memastikan tumbuh kembang optimal anak Indonesia.",
      features: ["Metode ABCDE", "1000 Hari Pertama", "Gizi Seimbang", "Pemantauan Berkala"],
      color: "red",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      link: "/edukasi-masyarakat/kesehatan/stunting",
      pages: "2 Halaman",
      readTime: "5 menit baca"
    },
    isipiringku: {
      title: "Isi Piringku",
      subtitle: "Gizi Seimbang untuk Hidup Sehat",
      description: "Panduan praktis menyusun menu makanan bergizi seimbang sesuai pedoman Kementerian Kesehatan. Pelajari porsi yang tepat untuk keluarga sehat.",
      features: ["Porsi Seimbang", "Panduan Praktis", "Mudah Diterapkan", "Untuk Semua Usia"],
      color: "green",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
      link: "/edukasi-masyarakat/kesehatan/isi-piringku",
      pages: "2 Halaman",
      readTime: "4 menit baca"
    },
    phbsgermas: {
      title: "PHBS GERMAS",
      subtitle: "Perilaku Hidup Bersih dan Sehat",
      description: "Modul lengkap Perilaku Hidup Bersih Sehat dan Gerakan Masyarakat Hidup Sehat. Panduan komprehensif untuk membangun kebiasaan hidup sehat keluarga.",
      features: ["PHBS Lengkap", "Gerakan Masyarakat", "Implementasi Praktis", "Evaluasi Berkala"],
      color: "blue",
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      link: "/edukasi-masyarakat/kesehatan/phbs-germas",
      pages: "Multi Halaman",
      readTime: "10 menit baca"
    }
  };

  const currentTab = tabData[activeTab as keyof typeof tabData];

  return (
    <main className="min-h-screen">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="kesehatan" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 py-12 lg:py-24 lg:min-h-[75vh] lg:flex lg:items-center">
        <div className="container-custom w-full">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            
            <h1 className="section-title text-center mb-6">
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Edukasi Kesehatan
              </span>
            </h1>
            
            <p className="section-description mx-auto text-center">
              Akses mudah ke berbagai materi kesehatan yang telah disusun khusus untuk masyarakat. 
              Dapatkan panduan praktis tentang gizi, pencegahan penyakit, dan pola hidup sehat 
              yang dapat diterapkan dalam kehidupan sehari-hari bersama keluarga.
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
                          data.color === 'red' ? 'from-red-500 to-red-600' :
                          data.color === 'green' ? 'from-green-500 to-green-600' :
                          'from-blue-500 to-blue-600'
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
                      currentTab.color === 'red' ? 'from-red-500 to-red-600' :
                      currentTab.color === 'green' ? 'from-green-500 to-green-600' :
                      'from-blue-500 to-blue-600'
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
                      currentTab.color === 'red' ? 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' :
                      currentTab.color === 'green' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                      'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
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

export default Kesehatan;