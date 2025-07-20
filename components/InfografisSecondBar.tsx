import { Users, MapPin, GraduationCap, Zap, Heart } from 'lucide-react';

const infografisMenus = [
  {
    id: 'penduduk',
    name: 'Penduduk',
    icon: Users,
    href: '/infografis'
  },
  {
    id: 'wilayah',
    name: 'Wilayah',
    icon: MapPin,
    href: '/infografis/wilayah'
  },
  {
    id: 'pendidikan',
    name: 'Pendidikan',
    icon: GraduationCap,
    href: '/infografis/pendidikan'
  },
  {
    id: 'potensi',
    name: 'Potensi',
    icon: Zap,
    href: '/infografis/potensi'
  },
  {
    id: 'posyandu',
    name: 'Posyandu',
    icon: Heart,
    href: '/infografis/posyandu'
  }
];

const InfografisSecondBar = ({ currentPage = 'penduduk' }) => {
  const activeSection = currentPage;

  return (
    <div className="bg-gray-100 border-b border-gray-200 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout - Minimal changes untuk single line */}
        <div className="hidden lg:block py-4">
          <div className="flex items-center justify-between">
            
            {/* Left - Title dengan margin kiri untuk centering visual */}
            <div className="flex items-center ml-16">
              <h1 className="text-xl xl:text-2xl font-bold whitespace-nowrap">
                <span style={{ color: '#0891b2' }}>INFOGRAFIS</span>
                <span style={{ color: '#0891b2' }} className="ml-2">DUSUN KALIBULUS</span>
              </h1>
            </div>

            {/* Right - Menu Navigation dengan spacing yang lebih baik */}
            <div className="flex gap-2">
              {infografisMenus.map((menu) => {
                const IconComponent = menu.icon;
                const isActive = activeSection === menu.id;
                
                return (
                  <a
                    key={menu.id}
                    href={menu.href}
                    className={`
                      group flex items-center gap-2 px-3 py-2.5 rounded-lg
                      transition-all duration-300 ease-out font-medium text-sm whitespace-nowrap
                      ${isActive 
                        ? 'bg-cyan-600 text-white shadow-lg transform scale-105' 
                        : 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 border border-transparent hover:border-cyan-200'
                      }
                    `}
                  >
                    <IconComponent 
                      size={16} 
                      className={`
                        transition-all duration-300
                        ${isActive ? 'text-white' : 'text-cyan-600 group-hover:text-cyan-700 group-hover:scale-110'}
                      `}
                    />
                    <span className="uppercase tracking-wide font-semibold">
                      {menu.name}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout - Tidak diubah */}
        <div className="lg:hidden py-4 space-y-4">
          {/* Centered Title for Mobile */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold">
              <span style={{ color: '#0891b2' }}>INFOGRAFIS</span>
              <span style={{ color: '#0891b2' }} className="ml-2">DUSUN KALIBULUS</span>
            </h1>
          </div>
          
          {/* Mobile Menu dengan spacing yang lebih baik */}
          <div className="flex overflow-x-auto scrollbar-hide gap-3 px-2 py-2">
            <div className="flex gap-3 min-w-max">
              {infografisMenus.map((menu) => {
                const IconComponent = menu.icon;
                const isActive = activeSection === menu.id;
                
                return (
                  <a
                    key={menu.id}
                    href={menu.href}
                    className={`
                      group flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap
                      transition-all duration-300 ease-out font-medium text-xs
                      ${isActive 
                        ? 'bg-cyan-600 text-white shadow-lg' 
                        : 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 border border-transparent hover:border-cyan-200'
                      }
                    `}
                  >
                    <IconComponent 
                      size={14} 
                      className={`
                        transition-all duration-300
                        ${isActive ? 'text-white' : 'text-cyan-600 group-hover:text-cyan-700'}
                      `}
                    />
                    <span className="uppercase tracking-wide font-semibold">
                      {menu.name}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="w-1 h-1 bg-white rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfografisSecondBar;