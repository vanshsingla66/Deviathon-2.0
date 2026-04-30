import React, { useEffect, Suspense, useState } from 'react';
import Lenis from 'lenis';
import { TrishulCursor } from './components/TrishulCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Sponsors } from './components/Sponsors';
import { FAQ } from './components/FAQ';
import { Register } from './components/Register';
import { ScrollTop } from './components/ScrollTop';
import { Scene3D } from './components/Scene3D';
import { motion, AnimatePresence } from 'motion/react';

import { Logo } from './components/Logo';

const LoadingScreen = () => (
  <motion.div 
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="fixed inset-0 bg-midnight z-[100] flex flex-col items-center justify-center gap-8 perspective-1000"
  >
    <motion.div 
      animate={{ 
        rotate: [45, 225, 45],
        scale: [1, 1.2, 1],
        boxShadow: [
          "0 0 20px rgba(129,140,248,0.2)",
          "0 0 60px rgba(129,140,248,0.6)",
          "0 0 20px rgba(129,140,248,0.2)"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-16 h-16 bg-linear-to-br from-iris to-aurora rounded-sm rotate-45 flex items-center justify-center font-display font-black text-midnight text-2xl"
    >
      D
    </motion.div>
    <div className="flex flex-col items-center gap-2 overflow-hidden">
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-mono text-[10px] uppercase tracking-[0.8em] text-iris"
      >
        Accessing Dimension
      </motion.p>
      <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-linear-to-r from-transparent via-aurora to-transparent w-full"
        />
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure 3D scene and assets are somewhat ready
    const timer = setTimeout(() => setIsLoading(false), 2000);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Prevents jumping when scrolling before fully loaded
      autoRaf: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-midnight selection:bg-iris selection:text-midnight overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <TrishulCursor />
      <ScrollTop />
      
      {/* 3D Background Scene - Kept outside of LoadingScreen to pre-render */}
      <Scene3D />
      
      <Navbar />
      
      <main className={`relative z-10 w-full overflow-hidden flex flex-col gap-32 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <About />
        <Timeline />
        <Register />
        <Sponsors />
        <FAQ />
      </main>

      <footer className={`relative z-10 py-32 px-6 border-t border-white/5 bg-midnight/80 backdrop-blur-xl transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex flex-col items-start gap-4 text-left">
             <Logo size="md" className="!items-start" />
            <p className="text-white/20 text-sm max-w-sm font-light leading-relaxed">
              Pushing the boundaries of human potential through code and collaboration. The ultimate test of endurance and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-left">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Connect</span>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">Twitter</a>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">Discord</a>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Resources</span>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">Guide</a>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">API Docs</a>
              <a href="#" className="text-chrome hover:text-aurora transition-colors text-sm">Templates</a>
            </div>
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Updates</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Email" className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-xs focus:border-iris outline-none w-32" />
                <button className="bg-iris text-midnight px-4 py-2 rounded-sm text-[10px] font-black uppercase">Join</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-bold tracking-[0.6em] text-white/10">© MMXXVI DEVIATHON CORE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-chrome transition-colors">Privacy</a>
            <a href="#" className="hover:text-chrome transition-colors">Conduct</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
