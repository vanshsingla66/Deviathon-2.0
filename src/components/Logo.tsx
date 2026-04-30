import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'scale-75',
    md: 'scale-100',
    lg: 'scale-110 md:scale-120',
  };

  const textSizes = {
    sm: 'text-[1.2rem]',
    md: 'text-[clamp(1.5rem,2.5vw,2.2rem)]',
    lg: 'text-[clamp(2.5rem,5vw,4.5rem)]',
  };

  const trishulaSizes = {
    sm: 'w-6 h-10',
    md: 'w-[clamp(1.5rem,2vw,2rem)] h-[clamp(2.5rem,3.5vw,3.5rem)]',
    lg: 'w-[clamp(3rem,5vw,4.5rem)] h-[clamp(5rem,8vw,7rem)]',
  };

  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center group cursor-pointer transition-all duration-300 ${className} ${sizeClasses[size]}`}
    >
      <div className="flex items-center gap-0 font-display uppercase tracking-[-0.05em] leading-none select-none">
        {/* DEV Part */}
        <div className={`flex items-center ${textSizes[size]} font-black`}>
          <span className="text-[#78C28A]">D</span>
          <div className="relative flex items-center justify-center">
            <span className="text-[#78C28A]">E</span>
            <div className="absolute flex flex-col gap-[2px] mt-[0.1em] transition-transform group-hover:scale-y-125">
              <div className="w-3 h-[2px] bg-white"></div>
              <div className="w-4 h-[2px] bg-white"></div>
              <div className="w-3 h-[2px] bg-white"></div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <span className="text-[#78C28A]">V</span>
            <div className="absolute top-[20%] w-[2px] h-[40%] bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
          </div>
        </div>

        {/* Trishula Icon */}
        <div className={`mx-1 ${trishulaSizes[size]} flex items-center justify-center relative`}>
          <svg viewBox="0 0 40 100" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-transform group-hover:scale-110 duration-700">
            <path d="M20 95 L20 15 M10 35 L10 25 Q10 15 20 15 Q30 15 30 25 L30 35 M20 15 L20 5 M5 35 Q5 20 20 20 Q35 20 35 35" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M12 55 L28 65 M12 65 L28 55" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* @THON Part */}
        <div className={`flex items-center ${textSizes[size]} font-black`}>
          <span className="text-[#78C28A]">@</span>
          <span className="text-[#6495ED]">THON</span>
        </div>
      </div>
      
      {/* Sanskrit Tagline */}
      <div className="mt-[-0.2rem] text-[clamp(0.6rem,1vw,0.8rem)] font-medium tracking-[0.1em] text-[#78C28A]/80 flex flex-col items-center">
        <span className="font-sans">प्रभावार्थ नवोन्मेष:</span>
        <div className="w-1/2 h-[1px] bg-linear-to-r from-transparent via-[#78C28A] to-transparent mt-1 transform origin-center transition-transform group-hover:scale-x-150 duration-500"></div>
      </div>
    </div>
  );
};
