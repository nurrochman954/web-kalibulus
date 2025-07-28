import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Treemap, RadialBarChart, RadialBar } from 'recharts';
import { Map, Droplets, Trees, Home, Navigation, Mountain, Building, MapPin } from 'lucide-react';

// Type definitions
interface PenggunaanLahanData {
  nama: string;
  luas: number;
  persentase: number;
  detail: string;
  color: string;
  icon: string;
  [key: string]: any; // Index signature for Treemap compatibility
}

interface FasilitasData {
  nama: string;
  jumlah: number;
  icon: string;
}

interface SaranaTransportasiData {
  jenis: string;
  jumlah: number;
  icon: string;
}

// Custom Tooltip Props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: any;
  }>;
  label?: string;
}

// Pie Label Props
interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

const InfografisWilayah = () => {
  const [selectedView, setSelectedView] = useState<'penggunaan' | 'fasilitas' | 'ekonomi'>('penggunaan');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer untuk animasi
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Data penggunaan lahan
  const dataPenggunaanLahan: PenggunaanLahanData[] = [
    { 
      nama: 'Tanah Sawah', 
      luas: 34.74, 
      persentase: 73.3,
      detail: 'Sawah irigasi ½ teknis',
      color: '#10B981',
      icon: '🌾'
    },
    { 
      nama: 'Pemukiman', 
      luas: 10.85, 
      persentase: 22.9,
      detail: 'Area perumahan penduduk',
      color: '#3B82F6',
      icon: '🏘️'
    },
    { 
      nama: 'Jalan', 
      luas: 1.51, 
      persentase: 3.2,
      detail: 'Infrastruktur jalan',
      color: '#6B7280',
      icon: '🛣️'
    },
    { 
      nama: 'Tempat Pemakaman', 
      luas: 0.22, 
      persentase: 0.5,
      detail: 'TPU/Makam umum',
      color: '#7C3AED',
      icon: '🪦'
    },
    { 
      nama: 'Lapangan Olahraga', 
      luas: 0.04, 
      persentase: 0.1,
      detail: 'Lapangan voli',
      color: '#F59E0B',
      icon: '🏐'
    }
  ];

  // Data fasilitas umum
  const dataFasilitas = {
    peribadatan: [
      { nama: 'Masjid', jumlah: 1, icon: '🕌' },
      { nama: 'Mushola', jumlah: 1, icon: '🕌' }
    ] as FasilitasData[],
    olahraga: [
      { nama: 'Lapangan Voli', jumlah: 1, icon: '🏐' }
    ] as FasilitasData[],
    sanitasi: [
      { nama: 'MCK Umum', jumlah: 2, icon: '🚿' },
      { nama: 'Jamban Keluarga', jumlah: 121, icon: '🚽' }
    ] as FasilitasData[],
    air: [
      { nama: 'Sumur Gali', jumlah: 96, icon: '💧' },
      { nama: 'Pelanggan PAM', jumlah: 99, icon: '🚰' }
    ] as FasilitasData[]
  };

  // Data sarana transportasi
  const dataSaranaTransportasi: SaranaTransportasiData[] = [
    { jenis: 'Toko Kelontong', jumlah: 4, icon: '🏪' },
    { jenis: 'Rumah Makan', jumlah: 2, icon: '🍴' },
    { jenis: 'Mobil Pick Up', jumlah: 2, icon: '🚛' },
    { jenis: 'Pengecer Gas', jumlah: 4, icon: '⛽' }
  ];

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg border-gray-200">
          <p className="font-medium text-gray-900">{label || payload[0].payload.nama}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-600">
              {entry.name}: {entry.value} {entry.payload.satuan || 'Ha'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 }: PieLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.02) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-semibold text-xs"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <>
      <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className={`flex flex-col md:flex-row items-center justify-between ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                  Infografis Wilayah
                </h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Dusun Kalibulus - Data Juli 2025</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-3xl md:text-4xl font-bold text-cyan-600">47.36</div>
                <div className="text-sm text-gray-500">Hektar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {[
                { id: 'penggunaan', label: 'Penggunaan Lahan' },
                { id: 'fasilitas', label: 'Fasilitas Umum' },
                { id: 'ekonomi', label: 'Potensi Ekonomi' }
              ].map(view => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id as any)}
                  className={`relative whitespace-nowrap py-4 px-4 md:px-6 font-medium text-sm transition-all duration-300 ${
                    selectedView === view.id 
                      ? 'text-cyan-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {view.label}
                  {selectedView === view.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 animate-slide-in-left" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Key Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <Map className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Luas</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">47.36</p>
                  <p className="text-xs text-gray-600 mt-0.5">Hektar</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <Trees className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lahan Pertanian</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">73.3%</p>
                  <p className="text-xs text-gray-600 mt-0.5">34.74 Ha sawah</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pemukiman</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">22.9%</p>
                  <p className="text-xs text-gray-600 mt-0.5">10.85 Ha</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Building className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fasilitas Umum</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">3.8%</p>
                  <p className="text-xs text-gray-600 mt-0.5">1.77 Ha</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content based on selected view */}
          {selectedView === 'penggunaan' && (
            <div className="space-y-6 md:space-y-8">
              {/* Pie Chart Penggunaan Lahan */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Komposisi Penggunaan Lahan</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="order-2 lg:order-1">
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={dataPenggunaanLahan}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="luas"
                        >
                          {dataPenggunaanLahan.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="order-1 lg:order-2 space-y-3">
                    {dataPenggunaanLahan.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-sm"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{item.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-700">{item.nama}</p>
                            <p className="text-sm text-gray-600">{item.detail}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {item.luas} Ha
                          </p>
                          <p className="text-sm text-gray-500">{item.persentase}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === 'fasilitas' && (
            <div className="space-y-6 md:space-y-8">
              {/* Grid Fasilitas */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                {/* Fasilitas Peribadatan */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                    <span className="text-2xl mr-2">🕌</span>
                    Fasilitas Peribadatan
                  </h3>
                  <div className="space-y-3">
                    {dataFasilitas.peribadatan.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="font-medium text-gray-700">{item.nama}</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">{item.jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasilitas Olahraga */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                    <span className="text-2xl mr-2">🏃</span>
                    Fasilitas Olahraga
                  </h3>
                  <div className="space-y-3">
                    {dataFasilitas.olahraga.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="font-medium text-gray-700">{item.nama}</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">{item.jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasilitas Sanitasi */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                    <span className="text-2xl mr-2">🚿</span>
                    Fasilitas Sanitasi
                  </h3>
                  <div className="space-y-3">
                    {dataFasilitas.sanitasi.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="font-medium text-gray-700">{item.nama}</span>
                        </div>
                        <span className="text-lg font-bold text-purple-600">{item.jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasilitas Air Bersih */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                    <span className="text-2xl mr-2">💧</span>
                    Sumber Air Bersih
                  </h3>
                  <div className="space-y-3">
                    {dataFasilitas.air.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="font-medium text-gray-700">{item.nama}</span>
                        </div>
                        <span className="text-lg font-bold text-cyan-600">{item.jumlah}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sarana Ekonomi */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Sarana Ekonomi & Transportasi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {dataSaranaTransportasi.map((item, index) => (
                    <div 
                      key={index} 
                      className="text-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-3xl md:text-4xl mb-3 block">{item.icon}</span>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">{item.jenis}</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{item.jumlah}</p>
                      <p className="text-xs md:text-sm text-gray-500">unit</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Ringkasan Fasilitas Wilayah</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-md transition-all">
                    <Building className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-green-800">100%</p>
                    <p className="font-semibold text-green-700">Akses Air Bersih</p>
                    <p className="text-sm text-green-600 mt-2">PAM & Sumur Gali</p>
                  </div>
                  
                  <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-md transition-all">
                    <Droplets className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-blue-800">99%</p>
                    <p className="font-semibold text-blue-700">Sanitasi Layak</p>
                    <p className="text-sm text-blue-600 mt-2">Jamban keluarga</p>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-md transition-all">
                    <Home className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-purple-800">100%</p>
                    <p className="font-semibold text-purple-700">Fasilitas Memadai</p>
                    <p className="text-sm text-purple-600 mt-2">Peribadatan & olahraga</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === 'ekonomi' && (
            <div className="space-y-6 md:space-y-8">
              {/* Potensi Ekonomi Wilayah */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Potensi Ekonomi Berbasis Wilayah</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-green-900 mb-2">Sektor Pertanian</h4>
                    <p className="text-3xl font-bold text-green-800">34.74 Ha</p>
                    <p className="text-sm text-green-700">Sawah irigasi ½ teknis</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-blue-900 mb-2">Sektor Peternakan</h4>
                    <p className="text-3xl font-bold text-blue-800">7</p>
                    <p className="text-sm text-blue-700">Pemilik ternak aktif</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-all duration-300">
                    <h4 className="font-semibold text-orange-900 mb-2">Sektor Perdagangan</h4>
                    <p className="text-3xl font-bold text-orange-800">12</p>
                    <p className="text-sm text-orange-700">Unit usaha aktif</p>
                  </div>
                </div>
              </div>

              {/* Peta Ekonomi */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Sebaran Aktivitas Ekonomi</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4 text-gray-800">Unit Usaha per Jenis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🏪</span>
                          <span className="font-medium text-gray-700">Toko Kelontong</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">4 unit</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">⛽</span>
                          <span className="font-medium text-gray-700">Pengecer Gas</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">4 unit</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🍴</span>
                          <span className="font-medium text-gray-700">Rumah Makan</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">2 unit</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🐄</span>
                          <span className="font-medium text-gray-700">Usaha Peternakan</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">2 unit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Economic Indicators */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Indikator Ekonomi Wilayah</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl hover:shadow-md transition-all">
                    <div className="text-4xl font-bold text-green-800 mb-2">73%</div>
                    <p className="font-semibold text-green-700">Dominasi Pertanian</p>
                    <p className="text-sm text-green-600">Basis ekonomi utama</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:shadow-md transition-all">
                    <div className="text-4xl font-bold text-blue-800 mb-2">12</div>
                    <p className="font-semibold text-blue-700">UMKM Aktif</p>
                    <p className="text-sm text-blue-600">Unit usaha lokal</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl hover:shadow-md transition-all">
                    <div className="text-4xl font-bold text-purple-800 mb-2">100%</div>
                    <p className="font-semibold text-purple-700">Partisipasi</p>
                    <p className="text-sm text-purple-600">Rumah tangga produktif</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default InfografisWilayah;