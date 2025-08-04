import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Download, Maximize2, X, ZoomIn, ZoomOut, Home, Eye, EyeOff } from 'lucide-react';

// Leaflet Type Definitions
interface LeafletMap {
  setView(center: [number, number], zoom: number): LeafletMap;
  remove(): void;
  zoomIn(): LeafletMap;
  zoomOut(): LeafletMap;
  eachLayer(fn: (layer: any) => void): LeafletMap;
  invalidateSize(): LeafletMap;
  addLayer(layer: any): LeafletMap;
  removeLayer(layer: any): LeafletMap;
  fitBounds(bounds: [[number, number], [number, number]]): LeafletMap;
  on(event: string, fn: Function): LeafletMap;
  off(event: string, fn: Function): LeafletMap;
}

interface LeafletLayer {
  addTo(map: LeafletMap): LeafletLayer;
  bindPopup(content: string): LeafletLayer;
  _url?: string;
  setStyle?(style: any): LeafletLayer;
}

interface LeafletTileLayer extends LeafletLayer {
  _url: string;
}

interface LeafletMarker extends LeafletLayer {}
interface LeafletPolygon extends LeafletLayer {}
interface LeafletPolyline extends LeafletLayer {}

interface LeafletStatic {
  map(element: HTMLElement, options?: any): LeafletMap;
  tileLayer(urlTemplate: string, options?: any): LeafletTileLayer;
  circleMarker(latlng: [number, number], options?: any): LeafletMarker;
  polygon(latlngs: [number, number][], options?: any): LeafletPolygon;
  polyline(latlngs: [number, number][], options?: any): LeafletPolyline;
  layerGroup(layers?: any[]): any;
  marker(latlng: [number, number], options?: any): LeafletMarker;
  divIcon(options?: any): any;
}

declare global {
  interface Window {
    L: LeafletStatic;
    JSZip: any;
    fs: {
      readFile: (filename: string) => Promise<Uint8Array>;
    };
  }
}

type LayerKey = 'satellite' | 'hybrid' | 'terrain' | 'openstreet';

interface LayerOption {
  name: string;
  url: string;
  attribution: string;
}

type LayerOptions = Record<LayerKey, LayerOption>;

interface KMZFeature {
  name: string;
  description?: string;
  coordinates: [number, number][] | [number, number];
  type: 'point' | 'polygon' | 'linestring';
  style?: {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
    weight?: number;
  };
}

const PetaDusunInteraktif: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const kmzLayerRef = useRef<any>(null);
  const currentTileLayerRef = useRef<any>(null);
  const fullscreenMapRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentLayer, setCurrentLayer] = useState<LayerKey>('satellite');
  const [kmzFeatures, setKmzFeatures] = useState<KMZFeature[]>([]);
  const [kmzLoaded, setKmzLoaded] = useState<boolean>(false);
  const [showKMZ, setShowKMZ] = useState<boolean>(true);
  const [mapBounds, setMapBounds] = useState<[[number, number], [number, number]] | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const layerOptions: LayerOptions = {
    satellite: {
      name: 'Satelit',
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Satellite'
    },
    hybrid: {
      name: 'Hybrid',
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Hybrid'
    },
    terrain: {
      name: 'Terrain',
      url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Terrain'
    },
    openstreet: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    }
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect to handle fullscreen map movement
  useEffect(() => {
    if (isFullscreen && mapRef.current && fullscreenMapRef.current) {
      // Move map to fullscreen container
      fullscreenMapRef.current.appendChild(mapRef.current);
      
      // Trigger map resize after DOM update
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);
    }
  }, [isFullscreen]);

  // Intersection Observer for visibility
  useEffect(() => {
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

  const loadSampleKMZData = () => {
    const sampleFeatures: KMZFeature[] = [
      // RT 01
      {
        name: 'RT 01',
        description: 'RT 01',
        coordinates: [
          [-7.7580, 110.3720], [-7.7582, 110.3735], [-7.7585, 110.3750], [-7.7590, 110.3765], 
          [-7.7595, 110.3775], [-7.7600, 110.3780], [-7.7610, 110.3785], [-7.7620, 110.3788], 
          [-7.7630, 110.3785], [-7.7635, 110.3780], [-7.7640, 110.3770], [-7.7642, 110.3760], 
          [-7.7645, 110.3750], [-7.7640, 110.3740], [-7.7635, 110.3730], [-7.7630, 110.3720], 
          [-7.7625, 110.3715], [-7.7620, 110.3710], [-7.7615, 110.3708], [-7.7610, 110.3707], 
          [-7.7605, 110.3708], [-7.7600, 110.3710], [-7.7590, 110.3715], [-7.7585, 110.3718], 
          [-7.7580, 110.3720]
        ],
        type: 'polygon',
        style: {
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.3,
          weight: 2
        }
      },
      // RT 02
      {
        name: 'RT 02',
        description: 'RT 02',
        coordinates: [
          [-7.7550, 110.3720], [-7.7552, 110.3735], [-7.7555, 110.3750], [-7.7560, 110.3765], 
          [-7.7565, 110.3775], [-7.7570, 110.3780], [-7.7575, 110.3785], [-7.7580, 110.3788], 
          [-7.7585, 110.3785], [-7.7590, 110.3780], [-7.7595, 110.3770], [-7.7597, 110.3760], 
          [-7.7600, 110.3750], [-7.7595, 110.3740], [-7.7590, 110.3730], [-7.7585, 110.3720], 
          [-7.7580, 110.3715], [-7.7575, 110.3710], [-7.7570, 110.3708], [-7.7565, 110.3707], 
          [-7.7560, 110.3708], [-7.7555, 110.3710], [-7.7552, 110.3715], [-7.7550, 110.3718], 
          [-7.7550, 110.3720]
        ],
        type: 'polygon',
        style: {
          color: '#34A853',
          fillColor: '#34A853',
          fillOpacity: 0.3,
          weight: 2
        }
      },
      // RT 03
      {
        name: 'RT 03',
        description: 'RT 03',
        coordinates: [
          [-7.7600, 110.3790], [-7.7602, 110.3805], [-7.7605, 110.3820], [-7.7610, 110.3835], 
          [-7.7615, 110.3845], [-7.7620, 110.3850], [-7.7630, 110.3855], [-7.7640, 110.3858], 
          [-7.7650, 110.3855], [-7.7655, 110.3850], [-7.7660, 110.3840], [-7.7662, 110.3830], 
          [-7.7665, 110.3820], [-7.7660, 110.3810], [-7.7655, 110.3800], [-7.7650, 110.3790], 
          [-7.7645, 110.3785], [-7.7640, 110.3780], [-7.7635, 110.3778], [-7.7630, 110.3777], 
          [-7.7625, 110.3778], [-7.7620, 110.3780], [-7.7610, 110.3785], [-7.7605, 110.3788], 
          [-7.7600, 110.3790]
        ],
        type: 'polygon',
        style: {
          color: '#EA4335',
          fillColor: '#EA4335',
          fillOpacity: 0.3,
          weight: 2
        }
      },
      // RT 04
      {
        name: 'RT 04',
        description: 'RT 04',
        coordinates: [
          [-7.7520, 110.3790], [-7.7522, 110.3805], [-7.7525, 110.3820], [-7.7530, 110.3835], 
          [-7.7535, 110.3845], [-7.7540, 110.3850], [-7.7550, 110.3855], [-7.7560, 110.3858], 
          [-7.7570, 110.3855], [-7.7575, 110.3850], [-7.7580, 110.3840], [-7.7582, 110.3830], 
          [-7.7585, 110.3820], [-7.7580, 110.3810], [-7.7575, 110.3800], [-7.7570, 110.3790], 
          [-7.7565, 110.3785], [-7.7560, 110.3780], [-7.7555, 110.3778], [-7.7550, 110.3777], 
          [-7.7545, 110.3778], [-7.7540, 110.3780], [-7.7530, 110.3785], [-7.7525, 110.3788], 
          [-7.7520, 110.3790]
        ],
        type: 'polygon',
        style: {
          color: '#FBBC04',
          fillColor: '#FBBC04',
          fillOpacity: 0.3,
          weight: 2
        }
      }
    ];

    setKmzFeatures(sampleFeatures);
    setMapBounds([[-7.7670, 110.3700], [-7.7510, 110.3870]]);
    setKmzLoaded(true);
    setIsLoading(false);
  };

  const loadKMZFile = async () => {
    try {
      setIsLoading(true);
      
      if (typeof window !== 'undefined' && window.fs && window.fs.readFile) {
        try {
          const kmzData = await window.fs.readFile('KALIBULUS RTRW.kmz');
          if (!window.JSZip) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => extractKMZ(kmzData);
            document.head.appendChild(script);
          } else {
            extractKMZ(kmzData);
          }
        } catch (fsError) {
          await loadFromAssets();
        }
      } else {
        await loadFromAssets();
      }
    } catch (error) {
      console.error('Error loading KMZ:', error);
      loadSampleKMZData();
    }
  };

  const loadFromAssets = async () => {
    try {
      const response = await fetch('/assets/KALIBULUS RTRW.kmz');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const kmzData = new Uint8Array(await response.arrayBuffer());
      
      if (!window.JSZip) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = () => extractKMZ(kmzData);
        document.head.appendChild(script);
      } else {
        extractKMZ(kmzData);
      }
    } catch (fetchError) {
      console.log('Using sample data...');
      loadSampleKMZData();
    }
  };

  const extractKMZ = async (kmzData: Uint8Array) => {
    try {
      const zip = new window.JSZip();
      const zipContent = await zip.loadAsync(kmzData);
      
      let kmlContent = '';
      for (const filename in zipContent.files) {
        if (filename.endsWith('.kml')) {
          kmlContent = await zipContent.files[filename].async('text');
          break;
        }
      }

      if (!kmlContent) {
        throw new Error('No KML file found in KMZ');
      }

      const features = parseKMLContent(kmlContent);
      setKmzFeatures(features);
      
      if (features.length > 0) {
        let minLat = Infinity, maxLat = -Infinity;
        let minLng = Infinity, maxLng = -Infinity;
        
        features.forEach(feature => {
          if (feature.type === 'point') {
            const [lat, lng] = feature.coordinates as [number, number];
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
          } else {
            const coords = feature.coordinates as [number, number][];
            coords.forEach(([lat, lng]) => {
              minLat = Math.min(minLat, lat);
              maxLat = Math.max(maxLat, lat);
              minLng = Math.min(minLng, lng);
              maxLng = Math.max(maxLng, lng);
            });
          }
        });
        
        setMapBounds([[minLat, minLng], [maxLat, maxLng]]);
      }
      
      setKmzLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error extracting KMZ:', error);
      loadSampleKMZData();
    }
  };

  const parseKMLContent = (kmlContent: string): KMZFeature[] => {
    const features: KMZFeature[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlContent, 'text/xml');
    
    const placemarks = xmlDoc.getElementsByTagName('Placemark');
    
    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const nameElement = placemark.getElementsByTagName('name')[0];
      const descElement = placemark.getElementsByTagName('description')[0];
      
      const name = nameElement ? nameElement.textContent || `Feature ${i + 1}` : `Feature ${i + 1}`;
      const description = descElement ? descElement.textContent || '' : '';

      const point = placemark.getElementsByTagName('Point')[0];
      const polygon = placemark.getElementsByTagName('Polygon')[0];
      const lineString = placemark.getElementsByTagName('LineString')[0];

      let style = {
        color: '#4285F4',
        fillColor: '#4285F4',
        fillOpacity: 0.3,
        weight: 2
      };

      if (point) {
        const coordElement = point.getElementsByTagName('coordinates')[0];
        if (coordElement && coordElement.textContent) {
          const coords = parseKMLCoordinates(coordElement.textContent);
          if (coords.length > 0) {
            features.push({
              name,
              description,
              coordinates: coords[0],
              type: 'point',
              style
            });
          }
        }
      } else if (polygon) {
        const outerBoundary = polygon.getElementsByTagName('outerBoundaryIs')[0];
        if (outerBoundary) {
          const linearRing = outerBoundary.getElementsByTagName('LinearRing')[0];
          if (linearRing) {
            const coordElement = linearRing.getElementsByTagName('coordinates')[0];
            if (coordElement && coordElement.textContent) {
              const coords = parseKMLCoordinates(coordElement.textContent);
              features.push({
                name,
                description,
                coordinates: coords,
                type: 'polygon',
                style
              });
            }
          }
        }
      }
    }

    return features;
  };

  const parseKMLCoordinates = (coordString: string): [number, number][] => {
    return coordString.trim().split(/\s+/).map(coord => {
      const [lng, lat] = coord.split(',').map(Number);
      return [lat, lng] as [number, number];
    });
  };

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
      }

      if (!window.L) {
        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.onload = initializeMap;
        document.head.appendChild(leafletJS);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = window.L.map(mapRef.current, {
        center: [-7.7614, 110.3739],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true
      });

      // Add initial tile layer
      const tileLayer = window.L.tileLayer(layerOptions[currentLayer].url, {
        attribution: layerOptions[currentLayer].attribution,
        maxZoom: 20
      });
      tileLayer.addTo(map);
      currentTileLayerRef.current = tileLayer;

      mapInstanceRef.current = map;
      
      if (isVisible) {
        loadKMZFile();
      }
    };

    if (isVisible) {
      loadLeaflet();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        currentTileLayerRef.current = null;
      }
    };
  }, [isVisible]);

  // Add KMZ features to map
  useEffect(() => {
    if (!mapInstanceRef.current || !kmzFeatures.length) return;

    if (kmzLayerRef.current) {
      mapInstanceRef.current.removeLayer(kmzLayerRef.current);
    }

    const layerGroup = window.L.layerGroup();
    
    kmzFeatures.forEach((feature) => {
      if (feature.type === 'point') {
        const [lat, lng] = feature.coordinates as [number, number];
        
        const customIcon = window.L.divIcon({
          html: `
            <div style="
              background-color: white;
              border: 2px solid #4285F4;
              border-radius: 50%;
              width: 24px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">📍</div>
          `,
          className: 'custom-div-icon',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(layerGroup);
        marker.bindPopup(`<div class="p-2"><h3 class="font-bold">${feature.name}</h3></div>`);
      } else if (feature.type === 'polygon') {
        const coords = feature.coordinates as [number, number][];
        const polygon = window.L.polygon(coords, {
          color: feature.style?.color || '#4285F4',
          fillColor: feature.style?.fillColor || '#4285F4',
          fillOpacity: feature.style?.fillOpacity || 0.3,
          weight: feature.style?.weight || 2
        }).addTo(layerGroup);
        
        polygon.bindPopup(`<div class="p-2"><h3 class="font-bold">${feature.name}</h3></div>`);
      }
    });

    kmzLayerRef.current = layerGroup;
    
    if (showKMZ) {
      layerGroup.addTo(mapInstanceRef.current);
    }

    if (mapBounds) {
      mapInstanceRef.current.fitBounds(mapBounds);
    }

  }, [kmzFeatures, showKMZ, mapBounds]);

  const changeLayer = (newLayer: LayerKey) => {
    if (!mapInstanceRef.current || !currentTileLayerRef.current) return;

    // Remove current tile layer
    mapInstanceRef.current.removeLayer(currentTileLayerRef.current);

    // Add new tile layer
    const newTileLayer = window.L.tileLayer(layerOptions[newLayer].url, {
      attribution: layerOptions[newLayer].attribution,
      maxZoom: 20
    });
    newTileLayer.addTo(mapInstanceRef.current);
    currentTileLayerRef.current = newTileLayer;

    setCurrentLayer(newLayer);
    
    // Force blur on select element to close dropdown (especially in fullscreen)
    if (document.activeElement && document.activeElement instanceof HTMLSelectElement) {
      document.activeElement.blur();
    }
  };

  const toggleKMZVisibility = () => {
    if (!mapInstanceRef.current || !kmzLayerRef.current) return;
    
    if (showKMZ) {
      mapInstanceRef.current.removeLayer(kmzLayerRef.current);
    } else {
      mapInstanceRef.current.addLayer(kmzLayerRef.current);
    }
    setShowKMZ(!showKMZ);
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();
  const resetView = () => {
    if (mapInstanceRef.current && mapBounds) {
      mapInstanceRef.current.fitBounds(mapBounds);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      // Exit fullscreen - move map back to original container
      if (mapRef.current && fullscreenMapRef.current && fullscreenMapRef.current.children.length > 0) {
        const originalContainer = document.querySelector('#peta-dusun .relative.bg-gray-100');
        if (originalContainer) {
          originalContainer.appendChild(mapRef.current);
        }
      }
      setIsFullscreen(false);
      
      // Trigger map resize after DOM update
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    } else {
      // Enter fullscreen
      setIsFullscreen(true);
    }
  };

  const downloadOriginalKMZ = () => {
    const link = document.createElement('a');
    link.href = '/assets/peta-dusun.pdf';
    link.download = 'Peta dusun.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic height calculation
  const getViewerHeight = () => {
    if (isMobile) {
      return Math.min(window.innerHeight * 0.6, 500);
    }
    return 600;
  };

  return (
    <>
      <section 
        id="peta-dusun"
        className="py-6 lg:py-12 px-3 lg:px-8 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className={`
            text-cyan-600 font-bold text-3xl lg:text-5xl xl:text-6xl 
            leading-tight mb-6 lg:mb-12 text-center lg:text-left
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            Peta Dusun
          </h2>
          
          {/* Map Container */}
          <div className={`
            w-full
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transitionDelay: '200ms' }}>
            <div className="
              relative bg-white rounded-xl lg:rounded-3xl p-3 lg:p-6 
              shadow-xl border border-gray-200 overflow-hidden
              transition-all duration-500 ease-out
              hover:shadow-2xl hover:border-cyan-300
              w-full max-w-none
            ">

              {/* Header - Different layouts for mobile vs desktop */}
              {isMobile ? (
                /* Mobile Header Layout */
                <div className="mb-4 space-y-3">
                  {/* Title */}
                  <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Peta Dusun Kalibulus</span>
                  </div>
                  
                  {/* Controls Row 1: Layer & Zoom */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-1">
                      <select
                        value={currentLayer}
                        onChange={(e) => changeLayer(e.target.value as LayerKey)}
                        className="w-full text-sm px-3 py-2 border-none bg-transparent focus:outline-none"
                        disabled={isLoading}
                      >
                        {Object.entries(layerOptions).map(([key, layer]) => (
                          <option key={key} value={key}>
                            {layer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={zoomOut}
                        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Perkecil"
                      >
                        <ZoomOut className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={zoomIn}
                        className="p-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Perbesar"
                      >
                        <ZoomIn className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Controls Row 2: Actions */}
                  <div className="flex items-center space-x-2">
                    {kmzLoaded && (
                      <button
                        onClick={toggleKMZVisibility}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors touch-manipulation flex-1 justify-center ${
                          showKMZ 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}
                        title={showKMZ ? 'Sembunyikan Data' : 'Tampilkan Data'}
                      >
                        {showKMZ ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span className="text-sm font-medium">
                          {showKMZ ? 'Sembunyikan' : 'Tampilkan'}
                        </span>
                      </button>
                    )}
                    
                    <button
                      onClick={resetView}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition-colors touch-manipulation flex-1 justify-center"
                      disabled={isLoading}
                      title="Reset Tampilan"
                    >
                      <Home className="w-4 h-4" />
                      <span className="text-sm font-medium">Reset</span>
                    </button>
                    
                    <button
                      onClick={downloadOriginalKMZ}
                      className="flex items-center space-x-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 touch-manipulation flex-1 justify-center"
                      disabled={isLoading}
                      title="Download KMZ"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Desktop Header Layout */
                <div className="
                  flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 lg:mb-6 
                  p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg lg:rounded-xl border border-blue-100
                  gap-3 lg:gap-4
                ">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm lg:text-base font-medium text-gray-700 flex-1 sm:flex-none">
                      Peta Dusun Kalibulus
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2 lg:space-x-3">
                    {/* Layer Selector */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <select
                        value={currentLayer}
                        onChange={(e) => changeLayer(e.target.value as LayerKey)}
                        className="text-sm px-3 py-2 border-none bg-transparent focus:outline-none min-w-0"
                        disabled={isLoading}
                      >
                        {Object.entries(layerOptions).map(([key, layer]) => (
                          <option key={key} value={key}>
                            {layer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={zoomOut}
                        className="p-2 lg:p-2.5 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Perkecil"
                      >
                        <ZoomOut className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={zoomIn}
                        className="p-2 lg:p-2.5 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Perbesar"
                      >
                        <ZoomIn className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {/* Toggle KMZ Visibility */}
                      {kmzLoaded && (
                        <button
                          onClick={toggleKMZVisibility}
                          className={`p-2 lg:p-2.5 rounded-lg border border-gray-200 transition-colors disabled:opacity-50 touch-manipulation ${
                            showKMZ ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                          title={showKMZ ? 'Sembunyikan Data' : 'Tampilkan Data'}
                        >
                          {showKMZ ? <Eye className="w-4 h-4 lg:w-5 lg:h-5" /> : <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" />}
                        </button>
                      )}

                      {/* Reset View Button */}
                      <button
                        onClick={resetView}
                        className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg border border-blue-200 transition-colors duration-200 disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Reset Tampilan"
                      >
                        <Home className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="text-sm lg:text-base font-medium hidden sm:inline">Reset</span>
                      </button>

                      {/* Fullscreen Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 lg:p-2.5 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                        title="Layar Penuh"
                      >
                        <Maximize2 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                      </button>

                      {/* Download Button */}
                      <button
                        onClick={downloadOriginalKMZ}
                        className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-cyan-600 hover:bg-cyan-700 
                                   text-white rounded-lg transition-colors duration-200 disabled:opacity-50 touch-manipulation"
                        disabled={isLoading}
                      >
                        <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="text-sm lg:text-base font-medium hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Map Viewer */}
              <div className="relative bg-gray-100 rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden">
                <div 
                  ref={mapRef}
                  className="w-full bg-gray-200"
                  style={{ 
                    height: `${getViewerHeight()}px`,
                    minHeight: isMobile ? '400px' : '500px'
                  }}
                />

                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-20">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-700 font-medium">Memuat peta dusun...</p>
                    </div>
                  </div>
                )}

                {/* Desktop Only Controls - Overlay on map (Removed Reset button since it's now in header) */}
                {!isMobile && (
                  <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                    {/* Overlay controls can be added here if needed in the future */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Fullscreen Header with Controls */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 bg-black bg-opacity-50">
            <div className="flex items-center space-x-4">
              <h3 className="text-white text-lg font-medium">Peta Dusun Kalibulus</h3>
              
              {/* Layer Controls in Fullscreen */}
              <div className="flex items-center space-x-2">
                <select
                  value={currentLayer}
                  onChange={(e) => changeLayer(e.target.value as LayerKey)}
                  className="px-3 py-2 bg-white bg-opacity-20 text-white rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  disabled={isLoading}
                >
                  {Object.entries(layerOptions).map(([key, layer]) => (
                    <option key={key} value={key} className="text-black">
                      {layer.name}
                    </option>
                  ))}
                </select>
                
                {/* KMZ Toggle in Fullscreen */}
                {kmzLoaded && (
                  <button
                    onClick={toggleKMZVisibility}
                    className={`p-2 rounded-lg transition-colors ${
                      showKMZ 
                        ? 'bg-green-500 bg-opacity-80 text-white' 
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                    title={showKMZ ? 'Sembunyikan Data' : 'Tampilkan Data'}
                  >
                    {showKMZ ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 border border-white border-opacity-30 hover:border-opacity-50"
              title="Tutup fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Fullscreen Map Container */}
          <div
            ref={fullscreenMapRef}
            className="flex-1 w-full bg-gray-900"
            style={{ minHeight: 0 }}
          >
            {/* Map will be moved here */}
          </div>

          {/* Fullscreen Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
            <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-lg p-2 pointer-events-auto">
              <button
                onClick={zoomOut}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
                title="Perkecil"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={resetView}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
                title="Reset Tampilan"
              >
                <Home className="w-5 h-5" />
              </button>
              <button
                onClick={zoomIn}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
                title="Perbesar"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetaDusunInteraktif;