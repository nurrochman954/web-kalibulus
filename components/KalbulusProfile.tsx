import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { Users, UserCheck, Home, Baby, Heart, Briefcase, TrendingUp, Activity } from 'lucide-react';

const InfografisKependudukan = () => {
  const [selectedView, setSelectedView] = useState('struktur');
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer untuk animasi saat scroll
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

  // Animasi counter
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setAnimatedCount(prev => {
          if (prev < 525) return prev + 5;
          return 525;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Data dengan warna tema cyan/dusun
  const dataStrukturUsia = [
    { 
      name: '0-4 tahun', 
      value: 28, 
      laki: 17, 
      perempuan: 11,
      kategori: 'Balita',
      color: '#06b6d4' 
    },
    { 
      name: '5-9 tahun', 
      value: 30, 
      laki: 17, 
      perempuan: 13,
      kategori: 'Anak',
      color: '#0891b2' 
    },
    { 
      name: '10-14 tahun', 
      value: 43, 
      laki: 21, 
      perempuan: 22,
      kategori: 'Remaja Awal',
      color: '#0e7490' 
    },
    { 
      name: '15-19 tahun', 
      value: 41, 
      laki: 16, 
      perempuan: 25,
      kategori: 'Remaja',
      color: '#22d3ee' 
    },
    { 
      name: '20-24 tahun', 
      value: 34, 
      laki: 15, 
      perempuan: 19,
      kategori: 'Dewasa Muda',
      color: '#38bdf8' 
    },
    { 
      name: '25-29 tahun', 
      value: 40, 
      laki: 22, 
      perempuan: 18,
      kategori: 'Dewasa',
      color: '#0ea5e9' 
    },
    { 
      name: '30-34 tahun', 
      value: 29, 
      laki: 11, 
      perempuan: 18,
      kategori: 'Dewasa',
      color: '#0284c7' 
    },
    { 
      name: '35-39 tahun', 
      value: 31, 
      laki: 17, 
      perempuan: 14,
      kategori: 'Dewasa Matang',
      color: '#0369a1' 
    },
    { 
      name: '40-56 tahun', 
      value: 249, 
      laki: 114, 
      perempuan: 135,
      kategori: 'Usia Produktif Akhir',
      color: '#075985' 
    },
    { 
      name: '57+ tahun', 
      value: 58, 
      laki: 29, 
      perempuan: 36,
      kategori: 'Lansia',
      color: '#0c4a6e' 
    }
  ];

  // Data detail usia produktif 18-56
  const dataUsiaProduktif = {
    total: 290,
    detail: [
      { kategori: 'Sedang Sekolah', jumlah: 44, persentase: 15.2, color: '#22d3ee' },
      { kategori: 'Ibu Rumah Tangga', jumlah: 53, persentase: 18.3, color: '#06b6d4' },
      { kategori: 'Bekerja Penuh', jumlah: 67, persentase: 23.1, color: '#0891b2' },
      { kategori: 'Bekerja Tidak Tentu', jumlah: 126, persentase: 43.4, color: '#0e7490' }
    ]
  };

  // Data pekerjaan detail
  const dataPekerjaan = [
    { nama: 'Belum/Tidak Bekerja', jumlah: 96, color: '#22d3ee' },
    { nama: 'Karyawan Swasta', jumlah: 95, color: '#06b6d4' },
    { nama: 'Mengurus Rumah Tangga', jumlah: 93, color: '#0891b2' },
    { nama: 'Pelajar/Mahasiswa', jumlah: 91, color: '#0e7490' },
    { nama: 'Buruh Tani', jumlah: 46, color: '#0284c7' },
    { nama: 'Buruh Harian Lepas', jumlah: 40, color: '#0369a1' },
    { nama: 'Wiraswasta', jumlah: 15, color: '#075985' },
    { nama: 'Pensiunan', jumlah: 14, color: '#0c4a6e' },
    { nama: 'Lainnya', jumlah: 35, color: '#082f49' }
  ];

  // Data status perkawinan
  const dataPerkawinan = [
    { status: 'Belum Kawin', jumlah: 231, laki: 117, perempuan: 114 },
    { status: 'Kawin', jumlah: 157, laki: 76, perempuan: 81 },
    { status: 'Kawin Tercatat', jumlah: 90, laki: 45, perempuan: 45 },
    { status: 'Cerai Mati', jumlah: 38, laki: 8, perempuan: 30 },
    { status: 'Cerai Hidup', jumlah: 7, laki: 3, perempuan: 4 }
  ];

  // Data golongan darah
  const dataGolonganDarah = [
    { golongan: 'A', jumlah: 42, persentase: 8, color: '#22d3ee' },
    { golongan: 'B', jumlah: 86, persentase: 16, color: '#06b6d4' },
    { golongan: 'O', jumlah: 111, persentase: 21, color: '#0891b2' },
    { golongan: 'AB', jumlah: 22, persentase: 4, color: '#0e7490' },
    { golongan: 'Tidak Tahu', jumlah: 252, persentase: 48, color: '#e5e7eb' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg animate-fade-in">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-gray-600" style={{ color: entry.color }}>
              {entry.name}: {entry.value} orang
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
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
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderPyramidBar = (data: any[]) => {
    const maxValue = Math.max(...data.map((d: any) => Math.max(d.laki, d.perempuan)));
    
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
        {/* Header dengan legend */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mr-2"></div>
              <span className="text-sm font-semibold text-gray-700">Laki-laki</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mr-2"></div>
              <span className="text-sm font-semibold text-gray-700">Perempuan</span>
            </div>
          </div>
        </div>
        
        {/* Piramida */}
        <div className="space-y-3">
          {data.map((item: any, index: number) => (
            <div key={item.name} className="group">
              <div className="flex items-center justify-center">
                {/* Container untuk bagian kiri */}
                <div className="flex items-center justify-end w-1/2 pr-2">
                  {/* Angka Laki-laki */}
                  <div className="text-right mr-3 min-w-[2rem]">
                    <span className="text-sm font-bold text-cyan-700 group-hover:text-cyan-800 transition-colors">
                      {item.laki}
                    </span>
                  </div>
                  
                  {/* Bar Laki-laki */}
                  <div 
                    className="bg-gradient-to-l from-cyan-500 to-cyan-600 h-8 rounded-l-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:from-cyan-600 group-hover:to-cyan-700 relative overflow-hidden"
                    style={{ 
                      width: `${(item.laki / maxValue) * 90}%`, 
                      minWidth: '20px',
                      maxWidth: '200px'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Label Tahun di Tengah */}
                <div className="px-3 py-1 bg-white rounded-full shadow-md border-2 border-gray-200 group-hover:border-cyan-300 transition-all duration-300 z-10">
                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
                
                {/* Container untuk bagian kanan */}
                <div className="flex items-center justify-start w-1/2 pl-2">
                  {/* Bar Perempuan */}
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-8 rounded-r-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:from-pink-600 group-hover:to-pink-700 relative overflow-hidden"
                    style={{ 
                      width: `${(item.perempuan / maxValue) * 90}%`, 
                      minWidth: '20px',
                      maxWidth: '200px'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Angka Perempuan */}
                  <div className="text-left ml-3 min-w-[2rem]">
                    <span className="text-sm font-bold text-pink-600 group-hover:text-pink-700 transition-colors">
                      {item.perempuan}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tooltip hover untuk mobile */}
              <div className="hidden group-hover:block absolute z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg transform -translate-x-1/2 left-1/2 mt-2">
                <div className="text-center">
                  <div className="font-semibold mb-1">{item.name}</div>
                  <div className="flex justify-between space-x-4">
                    <span>L: {item.laki}</span>
                    <span>P: {item.perempuan}</span>
                  </div>
                  <div className="text-gray-300 mt-1">Total: {item.value}</div>
                </div>
                {/* Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary stats di bawah */}
        <div className="mt-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-600">250</div>
              <div className="text-xs text-gray-600">Total Laki-laki</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">275</div>
              <div className="text-xs text-gray-600">Total Perempuan</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-gray-700">525</div>
              <div className="text-xs text-gray-600">Total Penduduk</div>
            </div>
          </div>
        </div>
        
        {/* Keterangan */}
        <div className="mt-6 text-center">
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className={`flex flex-col md:flex-row items-center justify-between ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                Infografis Kependudukan
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Dusun Kalibulus - Data Juli 2025</p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl md:text-4xl font-bold text-cyan-600">{animatedCount}</div>
              <div className="text-sm text-gray-500">Total Penduduk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'struktur', label: 'Struktur Usia' },
              { id: 'produktif', label: 'Usia Produktif' },
              { id: 'pekerjaan', label: 'Mata Pencaharian' },
              { id: 'status', label: 'Status Demografi' }
            ].map(view => (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id)}
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
              <div className="p-2 rounded-lg bg-cyan-50">
                <Users className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Penduduk</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">525</p>
                <p className="text-xs text-gray-600 mt-0.5">250 L • 275 P</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-green-50">
                <Home className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Jumlah KK</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">188</p>
                <p className="text-xs text-gray-600 mt-0.5">2.79 jiwa/KK</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-purple-50">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Usia Produktif</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">290</p>
                <p className="text-xs text-gray-600 mt-0.5">55% populasi</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-orange-50">
                <Baby className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Rasio Ketergantungan</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">81%</p>
                <p className="text-xs text-gray-600 mt-0.5">235:290</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content based on selected view */}
        {selectedView === 'struktur' && (
          <div className="space-y-6 md:space-y-8">
            {/* Piramida Penduduk */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Piramida Penduduk</h3>
              {renderPyramidBar(dataStrukturUsia)}
            </div>

            {/* Distribusi Usia */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Distribusi Kelompok Usia</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={dataStrukturUsia}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataStrukturUsia.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="order-1 lg:order-2 space-y-3">
                  {dataStrukturUsia.map((item: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-3" 
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="font-medium text-gray-700">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.kategori}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{item.value}</p>
                        <p className="text-sm text-gray-500">{((item.value / 525) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'produktif' && (
          <div className="space-y-6 md:space-y-8">
            {/* Overview Usia Produktif */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Analisis Usia Produktif (18-56 Tahun)</h3>
              
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <p className="text-cyan-900 font-semibold text-lg">Total Usia Produktif</p>
                    <p className="text-cyan-700 text-base">55% dari total populasi</p>
                  </div>
                  <div className="text-center md:text-right mt-3 md:mt-0">
                    <p className="text-4xl font-bold text-cyan-900">290</p>
                    <p className="text-sm text-cyan-700">orang</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 text-gray-800">Distribusi Status</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataUsiaProduktif.detail}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="kategori" angle={-20} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
                        {dataUsiaProduktif.detail.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-gray-800">Rincian Status</h4>
                  <div className="space-y-3">
                    {dataUsiaProduktif.detail.map((item: any, index: number) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{item.kategori}</span>
                          <span className="text-lg font-bold" style={{ color: item.color }}>
                            {item.jumlah}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${item.persentase}%`,
                              backgroundColor: item.color 
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{item.persentase}% dari usia produktif</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Analisis Ketergantungan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Analisis Beban Tanggungan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <Activity className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-cyan-900">81%</p>
                  <p className="font-semibold text-cyan-800">Total Tanggungan</p>
                  <p className="text-sm text-cyan-700 mt-2">235 orang ditanggung 290 produktif</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <Baby className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-900">61%</p>
                  <p className="font-semibold text-green-800">Tanggungan Anak</p>
                  <p className="text-sm text-green-700 mt-2">177 anak ditanggung 290 produktif</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <Heart className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-orange-900">20%</p>
                  <p className="font-semibold text-orange-800">Tanggungan Lansia</p>
                  <p className="text-sm text-orange-700 mt-2">58 lansia ditanggung 290 produktif</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'pekerjaan' && (
          <div className="space-y-6 md:space-y-8">
            {/* Distribusi Pekerjaan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Distribusi Mata Pencaharian</h3>
              
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dataPekerjaan}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="jumlah"
                    >
                      {dataPekerjaan.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataPekerjaan.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded mr-3" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-gray-700">{item.nama}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-gray-900">{item.jumlah}</span>
                      <span className="text-sm text-gray-500 ml-2">({((item.jumlah/525)*100).toFixed(1)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analisis Ketenagakerjaan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Analisis Ketenagakerjaan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-green-900 mb-2">Angkatan Kerja</h4>
                  <p className="text-3xl font-bold text-green-800">290</p>
                  <p className="text-sm text-green-700">Usia 18-56 tahun</p>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-cyan-900 mb-2">Bekerja</h4>
                  <p className="text-3xl font-bold text-cyan-800">193</p>
                  <p className="text-sm text-cyan-700">67 penuh + 126 tidak tentu</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="font-semibold text-orange-900 mb-2">Tingkat Partisipasi</h4>
                  <p className="text-3xl font-bold text-orange-800">66.6%</p>
                  <p className="text-sm text-orange-700">193 dari 290 orang</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'status' && (
          <div className="space-y-6 md:space-y-8">
            {/* Status Perkawinan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Status Perkawinan</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dataPerkawinan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="laki" name="Laki-laki" fill="#0891b2" />
                  <Bar dataKey="perempuan" name="Perempuan" fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Golongan Darah */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Distribusi Golongan Darah</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dataGolonganDarah}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="jumlah"
                      >
                        {dataGolonganDarah.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="order-1 lg:order-2 space-y-3">
                  {dataGolonganDarah.map((item: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-3" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-gray-700">Golongan {item.golongan}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg text-gray-900">{item.jumlah}</span>
                        <span className="text-sm text-gray-500 ml-2">({item.persentase}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gender Balance */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Keseimbangan Gender</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">250</div>
                  <p className="text-lg font-semibold text-cyan-900">Laki-laki</p>
                  <p className="text-sm text-cyan-700">47.6%</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-pink-600 mb-2">275</div>
                  <p className="text-lg font-semibold text-pink-900">Perempuan</p>
                  <p className="text-sm text-pink-700">52.4%</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
    </div>
  );
};

export default InfografisKependudukan;