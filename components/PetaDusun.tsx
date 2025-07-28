import React from 'react';
import { Download, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';

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

const PetaDusun = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [zoom, setZoom] = React.useState(75);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string>('');
  const [numPages, setNumPages] = React.useState<number>(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const renderTaskRef = React.useRef<PDFRenderTask | null>(null);
  const pdfDocRef = React.useRef<PDFDocumentProxy | null>(null);

  // PDF URL - ganti dengan path yang benar
  const pdfUrl = '/assets/peta-dusun.pdf';

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const section = document.getElementById('peta-dusun');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Load PDF.js and PDF document
  React.useEffect(() => {
    const loadPdfJs = (): Promise<PDFJSLib> => {
      return new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }

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
        
        document.head.appendChild(script);
      });
    };

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError('');

        const pdfjsLib: PDFJSLib = await loadPdfJs();

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true
        });
        
        const pdf = await loadingTask.promise;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        
        await renderPage(pdf, 1);
        setIsLoading(false);
        
      } catch (err: unknown) {
        const error = err as Error;
        console.error('Error loading PDF:', err);
        setError(`Gagal memuat peta: ${error.message || 'Unknown error'}`);
        setIsLoading(false);
      }
    };

    if (isVisible) {
      loadPdf();
    }
  }, [isVisible, pdfUrl]);

  // Natural PDF rendering with high quality
  const renderPage = async (pdf: PDFDocumentProxy, pageNumber: number) => {
    try {
      if (!canvasRef.current) return;

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        setError('Canvas context tidak tersedia');
        return;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get original page dimensions
      const originalViewport = page.getViewport({ scale: 1 });
      
      // Calculate display scale
      const displayScale = zoom / 100;
      
      // Render at higher resolution for crisp display
      const renderScale = displayScale * (window.devicePixelRatio || 1) * 1.5;
      const renderViewport = page.getViewport({ scale: renderScale });
      
      // Set canvas actual size (high res)
      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      
      // Set canvas display size
      canvas.style.width = (originalViewport.width * displayScale) + 'px';
      canvas.style.height = (originalViewport.height * displayScale) + 'px';
      
      const renderContext = {
        canvasContext: context,
        viewport: renderViewport,
      };
      
      renderTaskRef.current = page.render(renderContext);
      await renderTaskRef.current.promise;
      renderTaskRef.current = null;
      
    } catch (err: unknown) {
      const error = err as Error & { name?: string };
      if (error.name === 'RenderingCancelledException') {
        console.log(`Rendering cancelled for page ${pageNumber}`);
        return;
      }
      console.error(`Error rendering page ${pageNumber}:`, err);
      setError(`Gagal memuat halaman ${pageNumber}`);
    }
  };

  // Re-render when zoom changes
  React.useEffect(() => {
    if (!isLoading && numPages > 0 && pdfDocRef.current) {
      renderPage(pdfDocRef.current, 1);
    }
  }, [zoom, isLoading, numPages]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoom(prev => Math.max(25, Math.min(300, prev + delta)));
    }
  };

  // Handle ESC key for fullscreen
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Peta-Dusun-Kalibulus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 25));
  };

  const fitToWidth = () => {
    setZoom(75);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const fitToPage = () => {
    setZoom(60);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError('');
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <>
      <section 
        id="peta-dusun"
        className="py-8 lg:py-12 px-4 lg:px-8 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className={`
            text-cyan-600 font-bold text-4xl lg:text-5xl xl:text-6xl 
            leading-tight mb-8 lg:mb-12 text-center lg:text-left
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            Peta Dusun
          </h2>
          
          {/* PDF Viewer Container */}
          <div className={`
            flex justify-center
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transitionDelay: '200ms' }}>
            <div className="group w-full max-w-6xl">
              <div className="
                relative bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 
                shadow-xl border border-gray-200 overflow-hidden
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:border-cyan-300
              ">

                {/* Toolbar */}
                <div className="
                  flex flex-wrap items-center justify-between mb-4 p-3 
                  bg-gray-50 rounded-xl border border-gray-100
                  gap-2
                ">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Peta Wilayah Dusun Kalibulus
                    </span>
                    <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-lg">
                      <span>Ctrl+Scroll untuk zoom</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={handleZoomOut}
                        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={zoom <= 25 || isLoading}
                        title="Zoom out"
                      >
                        <ZoomOut className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-xs font-medium text-gray-600 px-2 min-w-[45px] text-center">
                        {zoom}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={zoom >= 300 || isLoading}
                        title="Zoom in"
                      >
                        <ZoomIn className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Fit Options */}
                    <div className="hidden sm:flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={fitToWidth}
                        className="px-3 py-2 text-xs hover:bg-gray-100 rounded transition-colors"
                        title="Fit to width"
                      >
                        Lebar
                      </button>
                      <button
                        onClick={fitToPage}
                        className="px-3 py-2 text-xs hover:bg-gray-100 rounded transition-colors"
                        title="Fit to page"
                      >
                        Halaman
                      </button>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
                      disabled={isLoading || error !== ''}
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 
                               text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>

                {/* PDF Viewer with Scrollbars */}
                <div className="relative bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                  <div 
                    ref={scrollContainerRef}
                    className="relative overflow-auto"
                    style={{ 
                      height: '700px',
                      maxHeight: '85vh',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#9CA3AF #E5E7EB'
                    }}
                    onWheel={handleWheel}
                  >
                    {/* Loading State */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-600 text-sm">Memuat peta...</p>
                        </div>
                      </div>
                    )}

                    {/* Error State */}
                    {error && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-6 h-6 text-red-600" />
                          </div>
                          <p className="text-gray-600 text-sm mb-2">Gagal memuat peta</p>
                          <p className="text-red-500 text-xs mb-4">{error}</p>
                          <button 
                            onClick={handleRetry}
                            className="text-cyan-600 hover:text-cyan-700 text-sm underline"
                          >
                            Coba lagi
                          </button>
                        </div>
                      </div>
                    )}

                    {/* PDF Canvas Container */}
                    <div className={`flex items-start justify-center min-h-full p-4 transition-all duration-500 ${
                      !isLoading && !error ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <canvas
                        ref={canvasRef}
                        className="shadow-lg border border-gray-300 bg-white"
                        style={{
                          display: !isLoading && !error ? 'block' : 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && !isLoading && !error && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          {/* Fullscreen Toolbar */}
          <div className="flex items-center justify-between p-4 bg-black bg-opacity-50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-black bg-opacity-50 rounded-lg p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  disabled={zoom <= 25}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white text-sm px-2 min-w-[45px] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                  disabled={zoom >= 300}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={fitToWidth}
                className="px-3 py-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-lg transition-colors text-sm"
              >
                Fit Lebar
              </button>
              
              <button
                onClick={fitToPage}
                className="px-3 py-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-lg transition-colors text-sm"
              >
                Fit Halaman
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200"
              title="Tutup fullscreen (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Fullscreen PDF Container */}
          <div 
            className="flex-1 overflow-auto"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937'
            }}
            onWheel={handleWheel}
          >
            <div className="flex items-start justify-center min-h-full p-4">
              <canvas
                className="shadow-2xl border border-gray-600"
                ref={(canvas) => {
                  if (canvas && canvasRef.current) {
                    const ctx = canvas.getContext('2d');
                    if (ctx && canvasRef.current) {
                      canvas.width = canvasRef.current.width;
                      canvas.height = canvasRef.current.height;
                      canvas.style.width = canvasRef.current.style.width;
                      canvas.style.height = canvasRef.current.style.height;
                      ctx.drawImage(canvasRef.current, 0, 0);
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Help text */}
          <div className="p-4 bg-black bg-opacity-50 text-center">
            <p className="text-white text-sm">
              ESC untuk keluar • Ctrl+Scroll untuk zoom • Scrollbar untuk navigasi
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PetaDusun;