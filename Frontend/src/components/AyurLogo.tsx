import React from 'react';

interface AyurLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'wood';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AyurLogo: React.FC<AyurLogoProps> = ({
  size = 'md',
  variant = 'light',
  showSubtitle = false,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const isLightText = variant === 'dark' || variant === 'wood';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Ayurvedic Leaf & Shield Crest */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#8E241C] to-[#5C1611] p-1.5 shadow-md border border-[#B8955A]/30`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Subtle gold outer circle ring */}
          <circle cx="20" cy="20" r="17" stroke="#E6D3B3" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          
          {/* Central Ayurvedic Neem/Tulsi twin leaves */}
          {/* Left Leaf */}
          <path 
            d="M20 32 C12 28, 9 20, 11 12 C16 11, 21 16, 20 32 Z" 
            fill="#EFE0C5" 
            opacity="0.95"
          />
          {/* Right Leaf */}
          <path 
            d="M20 32 C28 28, 31 20, 29 12 C24 11, 19 16, 20 32 Z" 
            fill="#F5E8D2" 
          />
          {/* Center Leaf Rib */}
          <path d="M20 12 L20 32" stroke="#8E241C" strokeWidth="1.2" strokeLinecap="round" />
          {/* Small gold bud */}
          <circle cx="20" cy="10" r="2" fill="#B8955A" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif tracking-wide font-bold leading-tight ${textSizes[size]} ${isLightText ? 'text-[#F5E8D2]' : 'text-[#3A160F]'}`}>
          AyurGuard
        </span>
        {showSubtitle && (
          <span className={`text-xs tracking-wider uppercase ${isLightText ? 'text-[#E6D3B3]/75' : 'text-[#6F1D18]'}`}>
            AI-Powered IP & Regulatory Guidance
          </span>
        )}
      </div>
    </div>
  );
};
