import React from 'react';
import Image from 'next/image';

const Footer = ({ 
  logoImage = "/assets/logo-kab-sleman.png",
  logoAlt = "Logo Dusun Kalibulus",
  address = {
    line1: "Dusun Kalibulus, Kalurahan Bimomartani",
    line2: "Kapanewon Ngemplak, Kabupaten Sleman", 
    line3: "Daerah Istimewa Yogyakarta"
  },
  copyright = "© 2025. All rights reserved.",
  links = [
    { label: "Website Kalurahan Bimomartani", href: "https://bimomartanisid.slemankab.go.id/" },
    { label: "Website Kapanewon Ngemplak", href: "https://ngemplak.slemankab.go.id/" }
  ]
}) => {
  return (
    <footer className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white py-6 lg:py-8">
      <div className="container-custom">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-6">
          
          {/* Left Section - Logo and Address */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image 
                src={logoImage} 
                alt={logoAlt} 
                width={70}
                height={84}
                className="transition-transform duration-300 hover:scale-105 filter brightness-110"
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iODQiIHZpZXdCb3g9IjAgMCA3MCA4NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9Ijg0IiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
              />
            </div>
            
            {/* Address */}
            <div className="flex-1">
              <address className="not-italic text-white/95 leading-relaxed">
                <div className="text-sm sm:text-base font-medium space-y-0.5">
                  <div className="font-semibold text-white">{address.line1}</div>
                  <div className="text-white/90">{address.line2}</div>
                  <div className="text-white/90">{address.line3}</div>
                </div>
              </address>
            </div>
          </div>
          
          {/* Right Section - Navigation Links */}
          <div className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Jelajahi:
              </h3>
              <nav className="space-y-1">
                {links.map((link, index) => (
                  <div key={index}>
                    <a 
                      href={link.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white/80 hover:text-white hover:underline transition-all duration-200 text-sm lg:text-base font-medium"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Copyright */}
        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-center items-center">
            <p className="text-white/70 text-sm text-center">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;