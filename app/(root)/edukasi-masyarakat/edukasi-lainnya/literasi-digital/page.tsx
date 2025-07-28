"use client";

import React, { useState, useCallback } from "react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import EdukasiSecondBar from "@/components/EdukasiSecondBar";
import LiterasiDigitalPDF from "@/components/LiterasiDigitalPDF";;

const LiterasiDigitalPage: React.FC = () => {
  const pdfUrl = "/pdfs/literasi-digital.pdf"; // Updated PDF URL

  // Download function
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Literasi-Digital.pdf'; // Updated download filename
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TopBar />
      <EdukasiSecondBar currentPage="lainnya" />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container-custom">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Literasi Digital & Etika Teknologi
                </h1>
                <p className="text-lg text-purple-700 font-medium">
                  Panduan Cerdas di Dunia Maya
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
              Tingkatkan pemahaman Anda tentang dunia digital. Pelajari cara menyikapi UU ITE, 
              memanfaatkan AI secara bijak, dan melindungi data pribadi Anda dari ancaman siber 
              untuk pengalaman online yang lebih aman dan bertanggung jawab.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            
            {/* Section Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Panduan Literasi Digital
              </h2>
            </div>

            {/* PDF Viewer Container */}
            <div className="p-4 sm:p-6 animate-fade-in-delay">
              <LiterasiDigitalPDF
                pdfUrl={pdfUrl}
                width={800}
                height={600}
                className="w-full"
              />
            </div>

            {/* Download Button Section */}
            <div className="border-t border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-8">
              <div className="text-center animate-fade-in">
                <div className="max-w-md mx-auto">
                  <button
                    onClick={handleDownload}
                    className="w-full text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Unduh Panduan Literasi Digital</span>
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
        /* Enhanced button styles */
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
          outline: 2px solid #8b5cf6; /* Purple color */
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
      `}</style>
    </main>
  );
};

export default LiterasiDigitalPage;