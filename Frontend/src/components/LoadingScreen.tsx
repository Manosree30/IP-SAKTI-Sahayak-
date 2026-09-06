import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MortarPestleGraphic } from './MortarPestleGraphic';
import { AyurLogo } from './AyurLogo';
import { useApp } from '../context/AppContext';

export const LoadingScreen: React.FC = () => {
  const { isLoadingScreen, finishLoadingTransition } = useApp();
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  // Animated dots effect
  useEffect(() => {
    if (!isLoadingScreen) return;
    const interval = setInterval(() => {
      setActiveDotIndex((prev) => (prev + 1) % 7);
    }, 280);
    return () => clearInterval(interval);
  }, [isLoadingScreen]);

  return (
    <AnimatePresence>
      {isLoadingScreen && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none bg-[#3A160F]"
        >
          {/* Rich wooden gradient backdrop with Ayurvedic ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, rgba(111, 29, 24, 0.45) 0%, rgba(58, 22, 15, 0.85) 55%, #250F0A 100%),
                radial-gradient(circle at 50% 50%, rgba(184, 149, 90, 0.12) 0%, transparent 60%)
              `
            }}
          />

          {/* Subtle botanical silhouettes in the corners */}
          <div className="absolute -top-12 -left-12 w-64 h-64 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="#E6D3B3">
              <path d="M40,160 Q80,110 90,40 Q130,100 160,160 Q100,140 40,160 Z" />
              <path d="M20,120 Q60,90 70,20 Q100,80 130,120 Z" />
            </svg>
          </div>
          <div className="absolute -bottom-12 -right-12 w-72 h-72 opacity-20 pointer-events-none rotate-180">
            <svg viewBox="0 0 200 200" fill="#E6D3B3">
              <path d="M40,160 Q80,110 90,40 Q130,100 160,160 Q100,140 40,160 Z" />
              <path d="M20,120 Q60,90 70,20 Q100,80 130,120 Z" />
            </svg>
          </div>

          {/* Central Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
            {/* Top Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center mb-6"
            >
              <AyurLogo size="lg" variant="dark" />
              <p className="mt-3 text-sm md:text-base tracking-widest text-[#E6D3B3]/90 font-light">
                AI-Powered IP & Regulatory Guidance for Ayurveda
              </p>
            </motion.div>

            {/* Mortar & Pestle Graphic with Hero Lighting */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative my-4"
            >
              <MortarPestleGraphic size={260} glow={true} />
            </motion.div>

            {/* Animated Loading Dots (• • • • • • •) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 my-4"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const isActive = i === activeDotIndex;
                return (
                  <motion.span
                    key={i}
                    animate={{
                      scale: isActive ? 1.6 : 1,
                      opacity: isActive ? 1 : 0.4,
                      color: isActive ? '#E2C78E' : '#B8955A'
                    }}
                    transition={{ duration: 0.25 }}
                    className="text-lg leading-none font-bold inline-block"
                  >
                    •
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Subtitle text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.6 }}
              className="text-xs md:text-sm tracking-wide text-[#E6D3B3]/80 italic font-serif"
            >
              Loading your Ayurvedic intelligence...
            </motion.p>

            {/* Skip / Enter workspace button for instant convenience */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={finishLoadingTransition}
              className="mt-8 text-xs text-[#E6D3B3]/60 hover:text-[#F5E8D2] tracking-wider uppercase border border-[#B8955A]/20 hover:border-[#B8955A]/50 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              Enter Workspace &rarr;
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
