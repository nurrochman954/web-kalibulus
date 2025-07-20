import { Users } from 'lucide-react';

const PendudukComponent = () => {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
            Data Penduduk Dusun Kalibulus
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 lg:mb-12">
            Informasi lengkap mengenai demografis penduduk di Dusun Kalibulus
          </p>
          
          {/* Data Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
            {[
              { title: 'Total Penduduk', value: '2,847', subtitle: 'Jiwa', color: 'bg-blue-500' },
              { title: 'Laki-laki', value: '1,423', subtitle: 'Jiwa', color: 'bg-green-500' },
              { title: 'Perempuan', value: '1,424', subtitle: 'Jiwa', color: 'bg-purple-500' },
              { title: 'Kepala Keluarga', value: '892', subtitle: 'KK', color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:transform hover:-translate-y-2 text-center">
                <div className={`w-12 h-12 lg:w-14 lg:h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Users size={24} className="text-white lg:w-7 lg:h-7" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {item.value}
                </h3>
                <p className="text-gray-600 font-medium mb-1 text-sm lg:text-base">{item.title}</p>
                <span className="text-xs lg:text-sm text-gray-500">{item.subtitle}</span>
              </div>
            ))}
          </div>

          {/* Age Distribution Chart */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-6 lg:mb-8">
              Distribusi Penduduk per Kelompok Usia
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-3">23%</div>
                <p className="text-gray-600 text-sm lg:text-base font-medium">Anak-anak (0-17 tahun)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-3">65%</div>
                <p className="text-gray-600 text-sm lg:text-base font-medium">Dewasa (18-64 tahun)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-3">12%</div>
                <p className="text-gray-600 text-sm lg:text-base font-medium">Lansia (65+ tahun)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendudukComponent;