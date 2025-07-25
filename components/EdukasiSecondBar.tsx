import { Recycle, Heart, MoreHorizontal } from 'lucide-react';

const edukasiMenus = [
  {
    id: 'pengelolaan-sampah',
    name: 'Pengelolaan Sampah',
    icon: Recycle,
    href: '/edukasi-masyarakat'
  },
  {
    id: 'kesehatan',
    name: 'Kesehatan',
    icon: Heart,
    href: '/edukasi-masyarakat/kesehatan'
  },
  {
    id: 'lainnya',
    name: 'Lainnya',
    icon: MoreHorizontal,
    href: '/edukasi-masyarakat/edukasi-lainnya'
  }
];

const EdukasiSecondBar = ({ currentPage = 'pengelolaan-sampah' }) => {
  const activeSection = currentPage;

  // Debug log to check currentPage value
  console.log('Current page:', currentPage, 'Active section:', activeSection);

  return (
    <div className="bg-gray-100 border-b border-gray-200 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Layout */}
        <div className="hidden lg:block py-4">
          <div className="flex items-center justify-between">
            
            {/* Left - Title dengan margin kiri untuk centering visual */}
            <div className="flex items-center ml-12">
              <h1 className="text-xl xl:text-2xl font-bold whitespace-nowrap">
                <span style={{ color: '#0891b2' }}>EDUKASI MASYARAKAT</span>
                <span style={{ color: '#0891b2' }} className="ml-2">DUSUN KALIBULUS</span>
              </h1>
            </div>

            {/* Right - Menu Navigation dengan spacing yang lebih baik */}
            <div className="flex gap-3 mr-16">
              {edukasiMenus.map((menu) => {
                const IconComponent = menu.icon;
                const isActive = activeSection === menu.id;
                
                return (
                  <a
                    key={menu.id}
                    href={menu.href}
                    className={`
                      group flex items-center gap-2 px-3 py-2.5 rounded-lg
                      transition-all duration-300 ease-out font-medium text-sm whitespace-nowrap
                      cursor-pointer relative z-10
                      ${isActive 
                        ? 'bg-cyan-600 text-white shadow-lg transform scale-105' 
                        : 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 border border-transparent hover:border-cyan-200'
                      }
                    `}
                    // Add click handler for debugging
                    onClick={(e) => {
                      console.log('Menu clicked:', menu.name, menu.href);
                      // Don't prevent default - let the link work normally
                    }}
                  >
                    <IconComponent 
                      size={16} 
                      className={`
                        transition-all duration-300 pointer-events-none
                        ${isActive ? 'text-white' : 'text-cyan-600 group-hover:text-cyan-700 group-hover:scale-110'}
                      `}
                    />
                    <span className="uppercase tracking-wide font-semibold pointer-events-none">
                      {menu.name}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="w-1 h-1 bg-white rounded-full pointer-events-none" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden py-4 space-y-4">
          {/* Centered Title for Mobile */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold">
              <span style={{ color: '#0891b2' }}>EDUKASI MASYARAKAT</span>
            </h1>
          </div>
          
          {/* Mobile Menu dengan spacing yang lebih baik */}
          <div className="flex overflow-x-auto scrollbar-hide gap-3 px-2 py-2">
            <div className="flex gap-3 min-w-max">
              {edukasiMenus.map((menu) => {
                const IconComponent = menu.icon;
                const isActive = activeSection === menu.id;
                
                return (
                  <a
                    key={menu.id}
                    href={menu.href}
                    className={`
                      group flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap
                      transition-all duration-300 ease-out font-medium text-xs
                      cursor-pointer relative z-10
                      ${isActive 
                        ? 'bg-cyan-600 text-white shadow-lg' 
                        : 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 border border-transparent hover:border-cyan-200'
                      }
                    `}
                    // Add click handler for debugging
                    onClick={(e) => {
                      console.log('Mobile menu clicked:', menu.name, menu.href);
                      // Don't prevent default - let the link work normally
                    }}
                  >
                    <IconComponent 
                      size={14} 
                      className={`
                        transition-all duration-300 pointer-events-none
                        ${isActive ? 'text-white' : 'text-cyan-600 group-hover:text-cyan-700'}
                      `}
                    />
                    <span className="uppercase tracking-wide font-semibold pointer-events-none">
                      {menu.name}
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="w-1 h-1 bg-white rounded-full pointer-events-none" />
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

export default EdukasiSecondBar;