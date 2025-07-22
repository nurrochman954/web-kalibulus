import React, { useRef, useEffect, useState, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

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

interface ModulGermasProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

interface PageProps {
  pageNumber: number;
  width: number;
  pdfUrl: string;
}

interface FlipEvent {
  data: number;
}

interface FlipBookRef {
  pageFlip(): {
    flipNext(): void;
    flipPrev(): void;
    turnToPage(page: number): void;
  };
}

// Komponen halaman dengan forwardRef
const GermasPage = forwardRef<HTMLDivElement, PageProps>(({ pageNumber, width, pdfUrl }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const renderTaskRef = useRef<PDFRenderTask | null>(null);

  useEffect(() => {
    const renderPage = async () => {
      try {
        if (!canvasRef.current) return;

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
        
        // Base scale untuk fit ke container
        const baseScale = Math.min(width / viewport.width, (width * 1.414) / viewport.height);
        
        // Tingkatkan resolusi dengan pixel ratio dan scale factor
        const highResScale = baseScale * devicePixelRatio * 2; // 2x untuk kualitas lebih tinggi
        const scaledViewport = page.getViewport({ scale: highResScale });
        
        // Set canvas size dengan resolusi tinggi
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;
        
        // Scale down canvas display untuk ukuran yang diinginkan
        canvas.style.width = (scaledViewport.width / devicePixelRatio / 2) + 'px';
        canvas.style.height = (scaledViewport.height / devicePixelRatio / 2) + 'px';
        
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

    // Only render if PDF.js is loaded
    if (window.pdfjsLib) {
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
  }, [pageNumber, width, pdfUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className="germas-page"
      style={{
        width: width,
        height: width * 1.414, // Rasio A4
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 20px rgba(6, 182, 212, 0.15)',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid #e0f2fe',
        borderRadius: '12px'
      }}
    >
      {!isLoaded && !error && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          fontSize: '14px',
          color: '#666',
          gap: '10px'
        }}>
          <div className="loading-spinner" style={{
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div>Memuat halaman {pageNumber}...</div>
        </div>
      )}
      
      {error && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#d32f2f',
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>❌</div>
          <div>{error}</div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        key={`canvas-${pageNumber}`}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          display: isLoaded ? 'block' : 'none'
        }}
      />
    </div>
  );
});

GermasPage.displayName = 'GermasPage';

const ModulGermas: React.FC<ModulGermasProps> = ({
  pdfUrl,
  width = 400,
  height = 600,
  className = ''
}) => {
  const flipBookRef = useRef<FlipBookRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Deteksi mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
        console.log('Starting PDF load process...');

        // Load PDF.js first
        console.log('Loading PDF.js library...');
        const pdfjsLib: PDFJSLib = await loadPdfJs();
        console.log('PDF.js library loaded successfully');

        // Test the PDF URL first
        console.log('Testing PDF URL:', pdfUrl);
        
        // Load document untuk mendapatkan info
        console.log('Loading PDF document...');
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });
        
        const pdf = await loadingTask.promise;
        
        console.log('PDF loaded successfully, pages:', pdf.numPages);
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
      console.log('PDF URL provided:', pdfUrl);
      loadPdfInfo();
    } else {
      console.log('No PDF URL provided');
      setError('URL PDF tidak disediakan');
      setIsLoading(false);
    }
  }, [pdfUrl]);

  // Responsive dimensions dengan single page untuk mobile
  const bookWidth = isMobile ? Math.min(width, window.innerWidth - 40) : width;
  const bookHeight = isMobile ? (bookWidth * 1.4) : height;
  // Mobile: full width untuk single page yang tidak terpotong, Desktop: setengah untuk double page
  const pageWidth = isMobile ? bookWidth - 20 : (bookWidth / 2 - 20);

  const onFlip = useCallback((e: FlipEvent) => {
    setCurrentPage(e.data);
    
    // Prevent scroll to top on page navigation - improved
    if (containerRef.current) {
      // Small delay to ensure flip animation is complete
      setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const isInView = rect.top >= -100 && rect.bottom <= window.innerHeight + 100;
          
          if (!isInView) {
            containerRef.current?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
          }
        }
      }, 100);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  const prevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const goToPage = useCallback((pageNum: number) => {
    if (flipBookRef.current && pageNum >= 0 && pageNum < numPages) {
      flipBookRef.current.pageFlip().turnToPage(pageNum);
    }
  }, [numPages]);

  if (error) {
    return (
      <div className={`${className} flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 sm:p-8 shadow-lg mx-2 sm:mx-0`} style={{ height: bookHeight }}>
        <div className="text-4xl sm:text-6xl mb-4 animate-bounce">⚠️</div>
        <div className="text-lg sm:text-xl font-semibold text-red-700 mb-4 text-center">{error}</div>
        <div className="text-xs sm:text-sm text-red-600 bg-white rounded-lg p-3 sm:p-4 shadow-md max-w-sm">
          <div className="font-medium mb-2">Pastikan:</div>
          <ul className="space-y-1 text-left">
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
              <span>Server mendukung CORS</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></span>
              <span>Koneksi internet stabil</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`modul-germas-container ${className}`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: isMobile ? '12px' : '20px', // Kurangi gap di mobile
        padding: isMobile ? '10px' : '20px',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {isLoading && (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 sm:p-12 shadow-lg mx-2 sm:mx-0" style={{ height: bookHeight, minWidth: isMobile ? '90vw' : 'auto' }}>
          <div className="relative">
            <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 sm:w-6 h-4 sm:h-6 bg-cyan-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="text-lg sm:text-xl font-semibold text-cyan-800 mb-2">Memuat PDF...</div>
            <div className="text-sm text-cyan-600 opacity-80">Mohon tunggu sebentar</div>
            <div className="mt-4 w-32 sm:w-48 h-2 bg-cyan-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && numPages > 0 && (
        <>
          <div className="flipbook-wrapper" style={{ position: 'relative' }}>
            <HTMLFlipBook
              ref={flipBookRef}
              width={isMobile ? bookWidth - 20 : pageWidth}
              height={bookHeight}
              size="stretch"
              minWidth={isMobile ? bookWidth - 20 : 250}
              maxWidth={isMobile ? bookWidth - 20 : pageWidth}
              minHeight={300}
              maxHeight={bookHeight}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              swipeDistance={30}
              clickEventForward={true}
              usePortrait={true}
              flippingTime={800}
              useMouseEvents={!isMobile}
              drawShadow={true}
              onFlip={onFlip}
              className="modul-germas"
              style={{}}
              startPage={0}
              startZIndex={0}
              autoSize={true}
              renderOnlyPageLengthChange={false}
              showPageCorners={!isMobile}
              disableFlipByClick={false}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <GermasPage
                  key={index + 1}
                  pageNumber={index + 1}
                  width={isMobile ? bookWidth - 20 : pageWidth}
                  pdfUrl={pdfUrl}
                />
              ))}
            </HTMLFlipBook>
          </div>

          {/* Mobile-optimized Controls */}
          <div className="w-full max-w-lg">
            {/* Navigation Controls - Mobile Optimized */}
            <div className={`flex items-center justify-between bg-gradient-to-r from-gray-50 to-cyan-50 p-3 sm:p-4 rounded-2xl shadow-lg border border-cyan-100 ${isMobile ? 'gap-2' : 'gap-4'}`}>
              
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`group flex items-center justify-center gap-1 px-3 py-3 sm:gap-2 sm:px-4 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 transform flex-shrink-0 ${
                  currentPage === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className={`${isMobile ? 'text-xs' : ''}`}>Sebelumnya</span>
              </button>

              {/* Page Selector - Responsive */}
              <div className="flex items-center gap-1 sm:gap-3 bg-white rounded-xl px-2 sm:px-4 py-2 sm:py-3 shadow-md border border-cyan-200 flex-shrink-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Halaman:</span>
                <select
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="bg-transparent border-none outline-none font-medium text-cyan-700 cursor-pointer text-xs sm:text-sm min-w-[40px] sm:min-w-[60px] focus:ring-2 focus:ring-cyan-400 rounded-lg px-1 sm:px-2 py-1"
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <option key={index} value={index} className="bg-white">
                      {index + 1}
                    </option>
                  ))}
                </select>
                <span className="text-xs sm:text-sm text-gray-500">/{numPages}</span>
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage >= numPages - 1}
                className={`group flex items-center justify-center gap-1 px-3 py-3 sm:gap-2 sm:px-4 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 transform flex-shrink-0 ${
                  currentPage >= numPages - 1 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                <span className={`${isMobile ? 'text-xs' : ''}`}>Selanjutnya</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Quick Navigation - Compact mobile version */}
            {!isMobile && (
              <div className="flex flex-wrap gap-3 justify-center" style={{ marginTop: '8px' }}>
                <button 
                  onClick={() => goToPage(0)}
                  className="px-4 py-2 bg-white hover:bg-cyan-50 text-cyan-600 border border-cyan-200 rounded-lg text-sm font-medium transition-all duration-200 hover:border-cyan-400 hover:shadow-md"
                >
                  Halaman Pertama
                </button>
                <button 
                  onClick={() => goToPage(numPages - 1)}
                  className="px-4 py-2 bg-white hover:bg-cyan-50 text-cyan-600 border border-cyan-200 rounded-lg text-sm font-medium transition-all duration-200 hover:border-cyan-400 hover:shadow-md"
                >
                  Halaman Terakhir
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modul-germas-container {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          scroll-behavior: smooth;
        }

        .germas-page {
          position: relative;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
        }

        .modul-germas {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }

        .flipbook-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .modul-germas-container {
            padding: 8px !important;
            gap: 10px !important;
          }
          
          .modul-germas {
            width: 100% !important;
            max-width: calc(100vw - 40px) !important;
          }

          .flipbook-wrapper {
            width: calc(100vw - 40px);
            max-width: 100%;
            margin-bottom: 5px;
          }

          /* Improve touch interactions */
          button {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }

          /* Better button sizing for mobile */
          button {
            min-height: 44px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .modul-germas-container {
            padding: 5px !important;
            gap: 10px !important;
          }
          
          .modul-germas {
            width: 100% !important;
            max-width: calc(100vw - 20px) !important;
          }

          .flipbook-wrapper {
            width: calc(100vw - 20px);
            max-width: 100%;
          }
        }

        /* Smooth button interactions */
        button:not(:disabled) {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        button:active:not(:disabled) {
          transform: translateY(0px) scale(0.98);
        }

        select:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        /* Prevent layout shift during loading */
        .loading-spinner {
          will-change: transform;
        }

        /* Better mobile scrolling */
        @media (max-width: 768px) {
          html {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default ModulGermas;