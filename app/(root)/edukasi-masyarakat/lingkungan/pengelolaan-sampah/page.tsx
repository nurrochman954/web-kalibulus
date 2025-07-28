"use client";

import React, { useCallback } from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import PengelolaanSampah from "@/components/PengelolaanSampah";

const PengelolaanSampahPage: React.FC = () => {
  const pdfUrl = "/pdfs/bijak-sampah.pdf";

  // Download function
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Bijak-Kelola-Bumi-Selamat.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lingkungan" />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Bijak Kelola, Bumi Selamat
                </h1>
                <p className="text-lg text-green-700 font-medium">
                  Pengelolaan Sampah yang Bertanggung Jawab
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              Materi komprehensif tentang pengelolaan sampah yang benar, klasifikasi sampah berdasarkan 
              jenis dan sifatnya, serta bahaya pengelolaan sampah yang tidak tepat bagi lingkungan dan kesehatan. 
              Pelajari metode 5 warna, dampak pembakaran sampah, dan solusi berkelanjutan untuk masa depan bumi yang lebih baik.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            
            {/* Section Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Presentasi Pengelolaan Sampah
              </h2>
            </div>

            {/* Presentasi Viewer Container */}
            <div className="p-4 sm:p-6 animate-fade-in-delay">
              <PengelolaanSampah 
                pdfUrl={pdfUrl}
                width={800}
                height={600}
                className="w-full"
              />
            </div>

            {/* Download Button Section */}
            <div className="border-t border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8">
              <div className="text-center animate-fade-in">
                
                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4 shadow-md border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800">Klasifikasi Sampah</h3>
                    </div>
                    <p className="text-sm text-gray-600">Pelajari jenis sampah organik, anorganik, dan B3 beserta cara pengelolaannya</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800">Metode 5 Warna</h3>
                    </div>
                    <p className="text-sm text-gray-600">Sistem pemilahan sampah dengan 5 warna tempat sampah yang berbeda</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-800">Bahaya Pembakaran</h3>
                    </div>
                    <p className="text-sm text-gray-600">Dampak negatif pembakaran sampah bagi kesehatan dan lingkungan</p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="max-w-md mx-auto">
                  <button
                    onClick={handleDownload}
                    className="w-full text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Unduh Presentasi Pengelolaan Sampah</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />

      {/* Enhanced Styles */}
      <style jsx>{`
        /* Enhanced button styles similar to GagrakPage */
        button {
          position: relative;
          overflow: hidden;
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        button:hover::before {
          left: 100%;
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #22c55e;
          outline-offset: 2px;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }

        /* Smooth interactions */
        button:not(:disabled) {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        button:active:not(:disabled) {
          transform: translateY(0px) scale(0.98);
        }

        /* Enhanced fade-in animations with delays */
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-fade-in-delay {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced card hover effects */
        .bg-white.rounded-xl.p-4:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Green theme specific enhancements */
        .border-green-100 {
          border-color: #dcfce7;
        }

        .bg-gradient-to-r.from-green-50.to-emerald-50 {
          background-image: linear-gradient(to right, #f0fdf4, #ecfdf5);
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
          .grid.md\\:grid-cols-3 {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .text-3xl.lg\\:text-4xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }

          .text-lg.leading-relaxed {
            font-size: 1rem;
            line-height: 1.625;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-r.from-green-500.to-emerald-600 {
            background: #16a34a;
          }
          
          .border-green-200 {
            border-color: #16a34a;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-fade-in-delay,
          button {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default PengelolaanSampahPage;