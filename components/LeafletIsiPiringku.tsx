import React, { useRef, useEffect, useState, useCallback, forwardRef } from 'react';

// PDF.js type definitions
interface PDFDocumentProxy {
  numPages: number;
  getPage(pageNumber: number): Promise<PDFPageProxy>;
}

interface PDFPageProxy {
  getViewport(params: { scale: number }): PDFViewport;
  render(renderContext: PDFRenderContext): PDFRenderTask;
}

interface PDFViewport {
  width: number;
  height: number;
}

interface PDFRenderContext {
  canvasContext: CanvasRenderingContext2D;
  viewport: PDFViewport;
}

interface PDFRenderTask {
  promise: Promise<void>;
  cancel(): void;
}

interface PDFLoadingTask {
  promise: Promise<PDFDocumentProxy>;
}

interface PDFJSLib {
  getDocument(src: string | { url: string; cMapUrl?: string; cMapPacked?: boolean }): PDFLoadingTask;
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

// Declare global pdfjs
declare global {
  interface Window {
    pdfjsLib: PDFJSLib;
  }
}

interface LeafletIsiPiringkuProps {
  pdfUrl: string;
  width?: number;
  className?: string;
  showDescription?: boolean; // Apakah menampilkan deskripsi
}

interface IsiPiringkuPageProps {
  pageNumber: number;
  width: number;
  pdfUrl: string;
}

// Hook untuk intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Komponen deskripsi artikel - SIMPLE CENTERING
const IsiPiringkuDescription: React.FC = () => {
  const [descRef, isDescVisible] = useIntersectionObserver(0.2);

  return (
    <div 
      ref={descRef}
      className={`w-full mb-4 transition-all duration-1000 ${
        isDescVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Simple wrapper untuk centering */}
      <div className="w-full flex justify-center px-4">
        {/* KOTAK UTAMA */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 shadow-xl border border-green-100 w-full max-w-4xl">
          {/* Content */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Tentang Pedoman Gizi Seimbang: Isi Piringku</h2>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg lg:text-xl">
              <span className="font-semibold text-green-700">Pedoman Gizi Seimbang &ldquo;Isi Piringku&rdquo; adalah konsep terbaru</span> yang menggantikan 
              konsep lama &ldquo;4 Sehat 5 Sempurna&rdquo;. Dikembangkan oleh Kementerian Kesehatan Republik Indonesia pada tahun 2014, 
              panduan ini hadir sebagai respons terhadap perkembangan ilmu gizi dan kebutuhan masyarakat modern. 
              &ldquo;Isi Piringku&rdquo; memberikan panduan praktis tentang komposisi makanan seimbang dalam setiap porsi makan, 
              dengan pembagian yang jelas: makanan pokok (1/3 piring), sayur-sayuran (1/3 piring), 
              lauk pauk (1/6 piring), dan buah-buahan (1/6 piring).
            </p>
            
            <p className="text-lg lg:text-xl">
              <span className="font-semibold text-green-700">Lebih dari sekadar panduan makan</span>, &ldquo;Isi Piringku&rdquo; mencakup 
              10 prinsip gizi seimbang yang meliputi kebiasaan hidup sehat secara menyeluruh. Mulai dari menikmati beragam makanan, 
              membatasi konsumsi garam-gula-lemak, hingga pentingnya aktivitas fisik 30 menit per hari, minum 8 gelas air putih, 
              dan menjaga kebersihan dengan mencuci tangan. Konsep ini menekankan bahwa gizi seimbang bukan hanya tentang apa yang kita makan, 
              tetapi juga bagaimana kita menjalani pola hidup sehat yang berkelanjutan untuk mencapai status gizi optimal 
              dan mencegah masalah kesehatan seperti obesitas, diabetes, dan penyakit tidak menular lainnya.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border-l-4 border-green-500">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Pesan Utama:</h4>
                <p className="text-gray-600 italic">&ldquo;Sekali Makan, Piring Seimbang! Gizi Cukup, Hidup Sehat!&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen halaman leaflet isi piringku
const IsiPiringkuPage = forwardRef<HTMLDivElement, IsiPiringkuPageProps>(({ pageNumber, width, pdfUrl }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const renderTaskRef = useRef<PDFRenderTask | null>(null);
  const [pageRef, isPageVisible] = useIntersectionObserver(0.1);

  useEffect(() => {
    const renderPage = async () => {
      try {
        if (!canvasRef.current || !isPageVisible) return;

        // Cancel previous render task if exists
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        // Wait for PDF.js to be loaded globally
        if (!window.pdfjsLib) {
          setError('PDF.js tidak tersedia');
          return;
        }

        // Load document
        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        // Get page
        const page = await pdf.getPage(pageNumber);
        
        // Set canvas context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) {
          setError('Canvas context tidak tersedia');
          return;
        }
        
        // Clear canvas first
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scale dengan resolusi tinggi
        const viewport = page.getViewport({ scale: 1 });
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Base scale untuk fit ke container width
        const baseScale = width / viewport.width;
        
        // Tingkatkan resolusi dengan pixel ratio dan scale factor
        const highResScale = baseScale * devicePixelRatio * 1.5;
        const scaledViewport = page.getViewport({ scale: highResScale });
        
        // Set canvas size dengan resolusi tinggi
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        
        // Scale down canvas display untuk ukuran yang diinginkan
        canvas.style.width = (scaledViewport.width / devicePixelRatio / 1.5) + 'px';
        canvas.style.height = (scaledViewport.height / devicePixelRatio / 1.5) + 'px';
        
        // Render page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        
        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
        renderTaskRef.current = null;
        
        setIsLoaded(true);
        
      } catch (err: unknown) {
        // Check if it's a cancellation error
        const error = err as Error & { name?: string };
        if (error.name === 'RenderingCancelledException') {
          console.log(`Rendering cancelled for page ${pageNumber}`);
          return;
        }
        console.error(`Error rendering page ${pageNumber}:`, err);
        setError(`Gagal memuat halaman ${pageNumber}`);
      }
    };

    // Only render if PDF.js is loaded and page is visible
    if (window.pdfjsLib && isPageVisible) {
      // Add small delay to prevent multiple simultaneous renders
      const timeoutId = setTimeout(renderPage, 100 * pageNumber);
      
      return () => {
        clearTimeout(timeoutId);
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }
      };
    }
  }, [pageNumber, width, pdfUrl, isPageVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, []);

  // Calculate height based on actual canvas aspect ratio or fallback to landscape A4
  const pageHeight = (width * 0.707); // Landscape A4 ratio (1/√2 ≈ 0.707)

  return (
    <div 
      ref={(node) => {
        if (ref && typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        pageRef.current = node;
      }}
      className={`isi-piringku-page group transition-all duration-700 mx-auto ${
        isPageVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        width: width,
        height: pageHeight,
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid #dcfce7',
        borderRadius: '16px',
        cursor: 'pointer'
      }}
    >
      {!isLoaded && !error && isPageVisible && (
        <div className="flex flex-col justify-center items-center h-full text-green-600 gap-4 animate-pulse">
          <div className="relative">
            <div className="w-10 h-10 border-3 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
          </div>
          <div className="text-sm font-medium">Memuat halaman {pageNumber}...</div>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col justify-center items-center h-full text-red-500 text-center px-6">
          <div className="text-3xl mb-3 animate-bounce">⚠️</div>
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        key={`canvas-${pageNumber}`}
        className={`max-w-full max-h-full rounded-xl transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          display: isLoaded ? 'block' : 'none'
        }}
      />
      
      {/* Page number indicator with enhanced styling */}
      <div className={`absolute bottom-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 ${
        isLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-75'
      } group-hover:opacity-100 group-hover:scale-110`}>
        <span className="drop-shadow-sm">{pageNumber}</span>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-none" />
    </div>
  );
});

IsiPiringkuPage.displayName = 'IsiPiringkuPage';

const LeafletIsiPiringku: React.FC<LeafletIsiPiringkuProps> = ({
  pdfUrl,
  className = '',
  showDescription = true
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.3);

  // Deteksi mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load PDF untuk mendapatkan jumlah halaman
  useEffect(() => {
    const loadPdfJs = (): Promise<PDFJSLib> => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }

        // Load PDF.js script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.async = true;
        script.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
          } else {
            reject(new Error('PDF.js tidak berhasil dimuat'));
          }
        };
        script.onerror = () => reject(new Error('Gagal memuat PDF.js'));
        
        // Add timeout
        setTimeout(() => {
          reject(new Error('Timeout loading PDF.js'));
        }, 10000);
        
        document.head.appendChild(script);
      });
    };

    const loadPdfInfo = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Load PDF.js first
        const pdfjsLib: PDFJSLib = await loadPdfJs();

        // Load document untuk mendapatkan info
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });
        
        const pdf = await loadingTask.promise;
        
        setNumPages(pdf.numPages);
        setIsLoading(false);
        
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Error loading PDF info:', err);
        setError(`Gagal memuat file PDF: ${error.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadPdfInfo();
    } else {
      setError('URL PDF tidak disediakan');
      setIsLoading(false);
    }
  }, [pdfUrl]);

  // Responsive dimensions - SIMPLE calculation
  const pageWidth = isMobile ? Math.min(window.innerWidth - 32, 600) : 800;

  // Download function
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Leaflet-Isi-Piringku.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  if (error) {
    return (
      <div className={`${className} card bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 mx-auto max-w-2xl`}>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-6 animate-bounce">⚠️</div>
          <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-4">Gagal Memuat Leaflet</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h4 className="font-semibold mb-3 text-gray-800">Pastikan:</h4>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                <span>File PDF dapat diakses</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                <span>URL PDF benar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
                <span>Koneksi internet stabil</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px] px-4">
          <div className="card bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-center max-w-2xl mx-auto animate-fade-in">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">Memuat Leaflet Isi Piringku</h3>
            <p className="text-green-600 mb-6">Menyiapkan konten edukasi gizi seimbang...</p>
            <div className="w-64 h-2 bg-green-200 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && numPages > 0 && (
        <div className="w-full max-w-5xl mx-auto px-4 -mt-60">
          {/* Header Section */}
          <div 
            ref={headerRef}
            className={`text-center mb-2 transition-all duration-1000 ${
              isHeaderVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg mb-2 animate-fade-in-delay">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Pedoman Gizi Seimbang</span>
            </div>
            
            <h1 className="section-title text-center mb-2">
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Leaflet Isi Piringku
              </span>
            </h1>
            
            <p className="section-description mx-auto text-center">
              Panduan praktis untuk menerapkan gizi seimbang dalam kehidupan sehari-hari. 
              Material edukasi yang menggantikan konsep &ldquo;4 Sehat 5 Sempurna&rdquo; dengan pendekatan yang lebih modern dan komprehensif.
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{numPages} Halaman</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Format Leaflet</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {showDescription && <IsiPiringkuDescription />}

          {/* Pages - CENTERED */}
          <div className="w-full">
            {Array.from({ length: numPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <div 
                  key={pageNumber}
                  id={`isi-piringku-page-${pageNumber}`}
                  className="w-full flex justify-center mb-8 lg:mb-12"
                >
                  <IsiPiringkuPage
                    pageNumber={pageNumber}
                    width={pageWidth}
                    pdfUrl={pdfUrl}
                  />
                </div>
              );
            })}
          </div>

          {/* Download Button */}
          <div className="text-center mt-12 animate-fade-in pb-8">
            <div className="max-w-md mx-auto">
              <button
                onClick={handleDownload}
                className="btn-primary w-full text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Unduh Leaflet Isi Piringku</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* MINIMAL CSS - ONLY ESSENTIAL */
        .isi-piringku-page:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.25);
        }

        .isi-piringku-pages-container {
          width: 100%;
        }

        /* Enhanced mobile optimizations */
        @media (max-width: 768px) {
          .leaflet-isi-piringku-container {
            padding: 1rem 0;
          }

          .isi-piringku-page:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 24px rgba(34, 197, 94, 0.2);
          }

          /* Better button sizing for mobile */
          button {
            min-height: 44px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }

          .section-title {
            font-size: 2.5rem !important;
          }

          .section-description {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .leaflet-isi-piringku-container {
            padding: 0.5rem 0;
          }

          .section-title {
            font-size: 2rem !important;
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

        /* Enhanced loading animations */
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Better mobile scrolling */
        @media (max-width: 768px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Canvas optimization */
        .isi-piringku-page canvas {
          width: 100% !important;
          height: auto !important;
          max-width: 100%;
          object-fit: contain;
          border-radius: 12px;
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible {
          outline: 2px solid #22c55e;
          outline-offset: 2px;
        }

        /* Improved gradient animations */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Enhanced intersection observer animations */
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-slide-up {
          animation: slideUpFade 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Enhanced card shadows */
        .card {
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .card:hover {
          box-shadow: 
            0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }

        /* Desktop-specific styles for vertical layout */
        @media (min-width: 769px) {
          .leaflet-isi-piringku-container {
            padding: 3rem 0;
          }
          
          .isi-piringku-page {
            margin: 0 auto;
          }
        }

        /* Fix for description section spacing */
        .section-description {
          margin-bottom: 2rem;
        }

        @media (min-width: 1024px) {
          .section-description {
            margin-bottom: 3rem;
          }
        }

        /* Enhanced download button styles */
        .btn-primary {
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        /* Green theme specific animations */
        .animate-fade-in-delay {
          animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Enhanced green gradient effects */
        .bg-gradient-to-br {
          background-image: linear-gradient(135deg, var(--tw-gradient-stops));
        }

        /* Improved accessibility for green theme */
        @media (prefers-reduced-motion: reduce) {
          .isi-piringku-page,
          .animate-fade-in,
          .animate-slide-up,
          .animate-pulse,
          .btn-primary {
            animation: none !important;
            transition: none !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .isi-piringku-page {
            border: 3px solid #16a34a;
          }
          
          .bg-gradient-to-r {
            background: #16a34a;
          }
        }

        /* Print styles */
        @media print {
          .isi-piringku-page {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
    </div>
  );
};

export default LeafletIsiPiringku;-page {
          position: relative;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .isi-piringku-page {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};
export default LeafletIsiPiringku;