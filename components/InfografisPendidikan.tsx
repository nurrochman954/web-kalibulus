import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, AreaChart, Area } from 'recharts';
import { GraduationCap, BookOpen, Users, TrendingUp, Award, School, Brain, Target } from 'lucide-react';

const InfografisPendidikan = () => {
  const [selectedView, setSelectedView] = useState('tingkat');
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

  // Data tingkat pendidikan dengan warna cyan theme
  const dataTingkatPendidikan = [
    { tingkat: 'S2', jumlah: 2, persentase: 0.4, color: '#0c4a6e' },
    { tingkat: 'S1', jumlah: 44, persentase: 8.4, color: '#075985' },
    { tingkat: 'D3', jumlah: 20, persentase: 3.8, color: '#0369a1' },
    { tingkat: 'SMA/Sederajat', jumlah: 218, persentase: 41.5, color: '#0284c7' },
    { tingkat: 'SMP/Sederajat', jumlah: 61, persentase: 11.6, color: '#0891b2' },
    { tingkat: 'SD/Sederajat', jumlah: 63, persentase: 12.0, color: '#06b6d4' },
    { tingkat: 'Belum Tamat SD', jumlah: 56, persentase: 10.7, color: '#22d3ee' },
    { tingkat: 'Tidak/Belum Sekolah', jumlah: 58, persentase: 11.0, color: '#e5e7eb' }
  ];

  // Data siswa aktif per jenjang
  const dataSiswaAktif = [
    { jenjang: 'TK/PAUD', jumlah: 14, icon: '👶', color: '#22d3ee' },
    { jenjang: 'SD/Sederajat', jumlah: 46, icon: '🎒', color: '#06b6d4' },
    { jenjang: 'SMP/Sederajat', jumlah: 23, icon: '📚', color: '#0891b2' },
    { jenjang: 'SMA/Sederajat', jumlah: 22, icon: '🎓', color: '#0e7490' },
    { jenjang: 'Perguruan Tinggi', jumlah: 10, icon: '🏛️', color: '#0284c7' }
  ];

  // Data perbandingan gender pendidikan
  const dataGenderPendidikan = [
    { tingkat: 'SD', laki: 26, perempuan: 37 },
    { tingkat: 'SMP', laki: 30, perempuan: 31 },
    { tingkat: 'SMA', laki: 106, perempuan: 112 },
    { tingkat: 'D3', laki: 10, perempuan: 10 },
    { tingkat: 'S1', laki: 22, perempuan: 22 },
    { tingkat: 'S2', laki: 0, perempuan: 2 }
  ];

  // Data usia sekolah
  const dataUsiaSekolah = [
    { kategori: '3-6 tahun belum TK', jumlah: 9, laki: 6, perempuan: 3 },
    { kategori: '3-6 tahun di TK', jumlah: 14, laki: 7, perempuan: 7 },
    { kategori: '7-18 tahun sekolah', jumlah: 91, laki: 45, perempuan: 46 },
    { kategori: '18-56 tahun sekolah', jumlah: 44, laki: 22, perempuan: 22 }
  ];

  // Data kualitas angkatan kerja berdasarkan pendidikan
  const dataKualitasAngkatanKerja = [
    { pendidikan: 'Tamat PT', jumlah: 54, persentase: 19.1, color: '#0284c7' },
    { pendidikan: 'Tamat SLTA', jumlah: 176, persentase: 62.2, color: '#0891b2' },
    { pendidikan: 'Tamat SLTP', jumlah: 40, persentase: 14.1, color: '#06b6d4' },
    { pendidikan: 'Tamat SD', jumlah: 13, persentase: 4.6, color: '#22d3ee' }
  ];

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

  return (
    <div ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className={`flex flex-col md:flex-row items-center justify-between ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
                Infografis Pendidikan
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Dusun Kalibulus - Data Juli 2025</p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-500">Melek Huruf</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'tingkat', label: 'Tingkat Pendidikan' },
              { id: 'aktif', label: 'Siswa Aktif' },
              { id: 'gender', label: 'Gender & Pendidikan' },
              { id: 'kualitas', label: 'Kualitas SDM' }
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
              <div className="p-2 rounded-lg bg-purple-50">
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Pendidikan Tinggi</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">66</p>
                <p className="text-xs text-gray-600 mt-0.5">D3, S1, S2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Sedang Sekolah</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">115</p>
                <p className="text-xs text-gray-600 mt-0.5">TK s/d PT</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-green-50">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lulusan SMA+</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">54%</p>
                <p className="text-xs text-gray-600 mt-0.5">284 orang</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-orange-50">
                <Award className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">APK SD</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">100%</p>
                <p className="text-xs text-gray-600 mt-0.5">Full coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content based on selected view */}
        {selectedView === 'tingkat' && (
          <div className="space-y-6 md:space-y-8">
            {/* Distribusi Tingkat Pendidikan */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Distribusi Tingkat Pendidikan Penduduk</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={dataTingkatPendidikan}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="jumlah"
                      >
                        {dataTingkatPendidikan.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="order-1 lg:order-2 space-y-3">
                  {dataTingkatPendidikan.map((item: any, index: number) => (
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
                        <span className="font-medium text-gray-700">{item.tingkat}</span>
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

            {/* Progress Indicator */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Piramida Pendidikan</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Pendidikan Tinggi (D3+)</span>
                    <span className="font-bold text-purple-700">12.6%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full transition-all duration-1000" style={{ width: '12.6%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Pendidikan Menengah (SMA)</span>
                    <span className="font-bold text-blue-700">41.5%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full transition-all duration-1000" style={{ width: '41.5%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Pendidikan Dasar (SD-SMP)</span>
                    <span className="font-bold text-cyan-700">23.6%</span>
                  </div>
                  <div className="w-full bg-cyan-200 rounded-full h-3">
                    <div className="bg-cyan-600 h-3 rounded-full transition-all duration-1000" style={{ width: '23.6%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'aktif' && (
          <div className="space-y-6 md:space-y-8">
            {/* Siswa Aktif per Jenjang */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Distribusi Siswa Aktif per Jenjang</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {dataSiswaAktif.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="text-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-3xl md:text-4xl mb-3 block">{item.icon}</span>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{item.jenjang}</p>
                    <p className="text-2xl md:text-3xl font-bold mt-2" style={{ color: item.color }}>
                      {item.jumlah}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">siswa</p>
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataSiswaAktif}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jenjang" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
                    {dataSiswaAktif.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Angka Partisipasi */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Angka Partisipasi Sekolah</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-md transition-all">
                  <School className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-800">100%</p>
                  <p className="font-semibold text-green-700">APK SD</p>
                  <p className="text-sm text-green-600 mt-2">Semua anak usia 7-12 bersekolah</p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-md transition-all">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-blue-800">100%</p>
                  <p className="font-semibold text-blue-700">APK SMP</p>
                  <p className="text-sm text-blue-600 mt-2">Semua anak usia 13-15 bersekolah</p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-md transition-all">
                  <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-purple-800">95%</p>
                  <p className="font-semibold text-purple-700">APK SMA</p>
                  <p className="text-sm text-purple-600 mt-2">Tingkat partisipasi tinggi</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'gender' && (
          <div className="space-y-6 md:space-y-8">
            {/* Perbandingan Gender per Tingkat */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Perbandingan Gender per Tingkat Pendidikan</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dataGenderPendidikan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tingkat" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="laki" name="Laki-laki" fill="#0891b2" />
                  <Bar dataKey="perempuan" name="Perempuan" fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Analisis Gender dalam Pendidikan</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Kesetaraan gender baik di semua jenjang pendidikan</li>
                  <li>• 2 perempuan meraih pendidikan S2 (tertinggi di dusun)</li>
                  <li>• Perempuan sedikit unggul di tingkat SD dan SMA</li>
                  <li>• Perfect balance di tingkat D3 dan S1</li>
                </ul>
              </div>
            </div>

            {/* Detail Usia Sekolah by Gender */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Partisipasi Sekolah berdasarkan Usia</h3>
              <div className="space-y-4">
                {dataUsiaSekolah.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-700">{item.kategori}</span>
                      <span className="text-lg font-bold text-gray-900">{item.jumlah} orang</span>
                    </div>
                    {item.laki > 0 && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-blue-600">👦 Laki-laki: {item.laki}</div>
                        <div className="text-pink-600">👧 Perempuan: {item.perempuan}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'kualitas' && (
          <div className="space-y-6 md:space-y-8">
            {/* Kualitas Angkatan Kerja */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Kualitas Angkatan Kerja (18-56 tahun)</h3>
              
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="100%" data={dataKualitasAngkatanKerja}>
                    <RadialBar
                      label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      dataKey="persentase"
                    >
                      {dataKualitasAngkatanKerja.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RadialBar>
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dataKualitasAngkatanKerja.map((item: any, index: number) => (
                  <div 
                    key={index} 
                    className="text-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg hover:shadow-md transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-2xl font-bold text-cyan-800">{item.jumlah}</p>
                    <p className="text-sm font-medium text-cyan-700">{item.pendidikan}</p>
                    <p className="text-xs text-cyan-600">{item.persentase}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Index Kualitas SDM */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Index Kualitas SDM</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl hover:shadow-md transition-all">
                  <div className="text-4xl font-bold text-green-800 mb-2">100%</div>
                  <p className="font-semibold text-green-700">Melek Huruf</p>
                  <p className="text-sm text-green-600">Zero buta aksara</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:shadow-md transition-all">
                  <div className="text-4xl font-bold text-blue-800 mb-2">81.3%</div>
                  <p className="font-semibold text-blue-700">Lulusan SMA+</p>
                  <p className="text-sm text-blue-600">Dari usia produktif</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl hover:shadow-md transition-all">
                  <div className="text-4xl font-bold text-purple-800 mb-2">19.1%</div>
                  <p className="font-semibold text-purple-700">Sarjana</p>
                  <p className="text-sm text-purple-600">Dari angkatan kerja</p>
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Analisis Tren Pendidikan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">↗️</span>
                    <span className="text-gray-700">Angka melanjutkan sekolah terus meningkat</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">✅</span>
                    <span className="text-gray-700">100% anak usia sekolah bersekolah</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-600 mr-2">📊</span>
                    <span className="text-gray-700">54% penduduk lulusan SMA ke atas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-orange-600 mr-2">🎯</span>
                    <span className="text-gray-700">Target: meningkatkan lulusan PT menjadi 25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-900">Pencapaian Pendidikan Dusun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-all">
                  <Award className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-900">Zero Buta Aksara</p>
                    <p className="text-sm text-green-700">100% melek huruf sejak 2020</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-all">
                  <Award className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-blue-900">Wajib Belajar Tuntas</p>
                    <p className="text-sm text-blue-700">100% APK SD & SMP</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md transition-all">
                  <Award className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <p className="font-semibold text-purple-900">Gender Equality</p>
                    <p className="text-sm text-purple-700">Kesetaraan akses pendidikan</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition-all">
                  <Award className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <p className="font-semibold text-orange-900">SDM Berkualitas</p>
                    <p className="text-sm text-orange-700">81% angkatan kerja lulusan SMA+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfografisPendidikan;