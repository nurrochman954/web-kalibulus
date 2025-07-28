import React, { useRef, useEffect, useState, useCallback } from 'react';

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

interface SinglePagePDFViewerProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

const SinglePagePDFViewer: React.FC<SinglePagePDFViewerProps> = ({
  pdfUrl,
  width = 800,
  height = 600,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const renderTaskRef = useRef<PDFRenderTask | null>(null);

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

        // Load PDF.js first
        const pdfjsLib: PDFJSLib = await loadPdfJs();

        // Load document
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });
        
        const pdf = await loadingTask.promise;
        
        setPdfDoc(pdf);
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

  // Render halaman saat currentPage berubah
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        setIsPageLoading(true);

        // Cancel previous render task if exists
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        // Get page
        const page = await pdfDoc.getPage(currentPage);
        
        // Set canvas context
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) {
          setError('Canvas context tidak tersedia');
          return;
        }
        
        // Clear canvas first
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scale untuk single page view
        const viewport = page.getViewport({ scale: 1 });
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Responsive container dimensions
        const containerWidth = isMobile ? Math.min(width, window.innerWidth - 40) : width;
        const containerHeight = isMobile ? (containerWidth * 1.2) : height;
        
        // Base scale untuk fit ke container
        const scaleX = containerWidth / viewport.width;
        const scaleY = containerHeight / viewport.height;
        const baseScale = Math.min(scaleX, scaleY);
        
        // High resolution scale
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
        
        setIsPageLoading(false);
        
      } catch (err: unknown) {
        const error = err as Error & { name?: string };
        if (error.name === 'RenderingCancelledException') {
          console.log(`Rendering cancelled for page ${currentPage}`);
          return;
        }
        console.error(`Error rendering page ${currentPage}:`, err);
        setError(`Gagal memuat halaman ${currentPage}`);
        setIsPageLoading(false);
      }
    };

    if (pdfDoc && !isLoading) {
      renderPage();
    }
  }, [pdfDoc, currentPage, width, height, isMobile, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, numPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    }
  }, [numPages]);

  // Responsive dimensions
  const containerWidth = isMobile ? Math.min(width, window.innerWidth - 40) : width;
  const containerHeight = isMobile ? (containerWidth * 1.2) : height;

  if (error) {
    return (
      <div className={`${className} flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 sm:p-8 shadow-lg mx-2 sm:mx-0`} style={{ height: containerHeight }}>
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
      className={`single-pdf-container ${className}`} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: isMobile ? '12px' : '20px',
        padding: isMobile ? '10px' : '20px',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      {isLoading && (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 sm:p-12 shadow-lg mx-2 sm:mx-0" style={{ height: containerHeight, minWidth: isMobile ? '90vw' : 'auto' }}>
          <div className="relative">
            <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 sm:w-6 h-4 sm:h-6 bg-amber-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="text-lg sm:text-xl font-semibold text-amber-800 mb-2">Memuat PDF Gagrak...</div>
            <div className="text-sm text-amber-600 opacity-80">Mohon tunggu sebentar</div>
            <div className="mt-4 w-32 sm:w-48 h-2 bg-amber-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && numPages > 0 && (
        <>
          {/* PDF Canvas Container */}
          <div 
            className="pdf-canvas-container"
            style={{
              position: 'relative',
              width: containerWidth,
              height: containerHeight,
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              borderRadius: '12px',
              border: '2px solid #fef3c7',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isPageLoading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10
              }}>
                <div className="loading-spinner" style={{
                  width: '30px',
                  height: '30px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #f59e0b',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                  Memuat halaman {currentPage}...
                </div>
              </div>
            )}
            
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'block'
              }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="w-full max-w-4xl">
            <div className={`flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 rounded-2xl shadow-lg border border-amber-200 ${isMobile ? 'gap-2' : 'gap-4'}`}>
              
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`group flex items-center justify-center gap-1 px-3 py-3 sm:gap-2 sm:px-4 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 transform flex-shrink-0 ${
                  currentPage === 1 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className={`${isMobile ? 'text-xs' : ''}`}>Sebelumnya</span>
              </button>

              {/* Page Selector */}
              <div className="flex items-center gap-1 sm:gap-3 bg-white rounded-xl px-2 sm:px-4 py-2 sm:py-3 shadow-md border border-amber-300 flex-shrink-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Halaman:</span>
                <select
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="bg-transparent border-none outline-none font-medium text-amber-700 cursor-pointer text-xs sm:text-sm min-w-[40px] sm:min-w-[60px] focus:ring-2 focus:ring-amber-400 rounded-lg px-1 sm:px-2 py-1"
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <option key={index + 1} value={index + 1} className="bg-white">
                      {index + 1}
                    </option>
                  ))}
                </select>
                <span className="text-xs sm:text-sm text-gray-500">/{numPages}</span>
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === numPages}
                className={`group flex items-center justify-center gap-1 px-3 py-3 sm:gap-2 sm:px-4 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 transform flex-shrink-0 ${
                  currentPage === numPages 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
              >
                <span className={`${isMobile ? 'text-xs' : ''}`}>Selanjutnya</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Quick Navigation - Desktop only */}
            {!isMobile && (
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <button 
                  onClick={() => goToPage(1)}
                  className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-sm font-medium transition-all duration-200 hover:border-amber-400 hover:shadow-md"
                >
                  Halaman Pertama
                </button>
                <button 
                  onClick={() => goToPage(numPages)}
                  className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-sm font-medium transition-all duration-200 hover:border-amber-400 hover:shadow-md"
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

        .single-pdf-container {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          scroll-behavior: smooth;
        }

        .pdf-canvas-container {
          position: relative;
          background: #ffffff;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .single-pdf-container {
            padding: 8px !important;
            gap: 10px !important;
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
          .single-pdf-container {
            padding: 5px !important;
            gap: 10px !important;
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
          border-color: #f59e0b;
          box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.25);
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

export default SinglePagePDFViewer;