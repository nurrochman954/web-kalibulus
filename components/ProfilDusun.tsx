import React, { useEffect, useState } from 'react';
import { Compass, Target, Users } from 'lucide-react';

const ProfilDusun = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const visiMisi = {
    visi: "Bimomartani: Mewujudkan Masyarakat Bimomartani Yang Religius, Maju dan Berbudaya",
    misi: [
      "Mewujudkan masyarakat yang toleran dan religius.",
      "Meningkatkan kualitas Sumber Daya Manusia melalui layanan pendidikan dan kesehatan yang prima untuk mewujudkan masyarakat yang sejahtera.",
      "Membangun perekonomian masyarakat dengan langkah inovatif dan berkesinambungan",
      "Mewujudkan masyarakat yang berbudaya dengan nilai kearifan lokal potensi budaya yang dimiliki"
    ]
  };

  return (
    <section className="py-10 lg:py-20 px-4 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ color: '#0081A7' }}>
          Visi dan Misi Kalurahan Bimomartani
        </h2>

        {/* Visi & Misi Section */}
        <div className={`grid lg:grid-cols-2 gap-6 lg:gap-12 mb-10 lg:mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Visi Card */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="p-2 lg:p-3 rounded-2xl text-white" style={{ backgroundColor: '#0081A7' }}>
                <Compass className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">VISI</h3>
            </div>
            <p className="text-gray-700 text-base lg:text-lg leading-relaxed italic">
              "{visiMisi.visi}"
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:transform hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="p-2 lg:p-3 rounded-2xl text-white" style={{ backgroundColor: '#0081A7' }}>
                <Target className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">MISI</h3>
            </div>
            <div className="space-y-3 lg:space-y-4">
              {visiMisi.misi.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base" style={{ backgroundColor: '#0081A7' }}>
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm lg:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Struktur Aparat Section */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="text-white p-4 lg:p-6" style={{ backgroundColor: '#0081A7' }}>
              <div className="flex items-center justify-center gap-2 lg:gap-3">
                <Users className="w-6 h-6 lg:w-8 lg:h-8" />
                <h3 className="text-xl lg:text-2xl font-bold">
                  <span className="sm:hidden">Struktur Aparat Dusun</span>
                  <span className="hidden sm:inline">Struktur Aparat Dusun Kalibulus</span>
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="bg-gray-100 rounded-xl p-4 lg:p-8 flex items-center justify-center">
                <img 
                  src="/assets/struktur-aparat.jpeg" 
                  alt="Struktur Aparat Dusun Kalibulus"
                  className="w-full h-auto rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilDusun;