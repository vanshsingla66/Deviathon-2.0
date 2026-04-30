import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { animate, stagger, random } from 'animejs';

interface CountdownItemProps {
  label: string;
  value: number;
  key?: React.Key;
}

const CountdownItem = ({ label, value }: CountdownItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-24 md:w-28 md:h-32 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl group transition-all duration-500 hover:border-aurora/50">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`font-mono text-4xl md:text-6xl font-extrabold tracking-tighter ${label === 'Seconds' ? 'text-aurora chrome-shadow' : 'text-chrome'}`}
          >
            {value < 10 ? `0${value}` : value}
          </motion.span>
        </AnimatePresence>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 group-hover:bg-aurora/20 transition-colors" />
      </div>
      <span className="mt-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/30">{label}</span>
    </div>
  );
};

export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 14, minutes: 35, seconds: 12 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      animate(letters, {
        opacity: [0, 1],
        translateX: () => [random(-20, 20), 1],
        translateY: () => [random(-20, 20), 1],
        filter: ['blur(10px)', 'blur(0px)'],
        delay: stagger(60), // Faster stagger
        duration: 1200,
        easing: 'easeOutQuart' // Smoother easing
      });

      animate(letters, {
        skewX: () => [0, random(-5, 5), 0],
        filter: ['contrast(100%)', 'contrast(150%)', 'contrast(100%)'],
        delay: stagger(80, { start: 2500 }),
        duration: 800,
        loop: true,
        easing: 'easeInOutQuad'
      });
    }

    return () => clearInterval(timer);
  }, []);

  const titleText = "Deviathon";
  const versionText = "2.0";

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-7xl"
      >
        <div className="space-y-4 mb-16">
          <motion.span 
            initial={{ letterSpacing: '0.1em', opacity: 0 }}
            animate={{ letterSpacing: '0.8em', opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-iris font-mono text-[clamp(0.7rem,1vw,0.85rem)] uppercase block mb-8 font-medium"
          >
            Google Developer Student Clubs
          </motion.span>
          
          <div className="flex flex-col items-center">
            <h1 ref={titleRef} className="font-display text-[clamp(3.5rem,12vw,8.5rem)] font-bold leading-[0.85] tracking-[-0.04em] uppercase text-white perspective-1000">
              {titleText.split('').map((char, i) => (
                <span key={i} className="letter inline-block">
                  {char}
                </span>
              ))}
            </h1>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="font-mono text-[clamp(1.5rem,5vw,4.5rem)] font-extralight text-aurora italic tracking-[-0.08em] mt-[-0.2em]"
            >
              {versionText}
            </motion.span>
          </div>
          
          <p className="font-sans text-[clamp(1rem,1.8vw,1.25rem)] font-light text-slate-400 mt-12 tracking-[0.2em] flex items-center justify-center gap-8 text-balance uppercase">
            <span className="h-px w-16 bg-white/10 hidden md:block" />
            Disrupt • Build • Innovate
            <span className="h-px w-16 bg-white/10 hidden md:block" />
          </p>
        </div>

        <div className="flex gap-4 md:gap-12 justify-center mb-32 scale-90 md:scale-100 font-mono">
          <CountdownItem label="Days" value={timeLeft.days} />
          <CountdownItem label="Hours" value={timeLeft.hours} />
          <CountdownItem label="Minutes" value={timeLeft.minutes} />
          <CountdownItem label="Seconds" value={timeLeft.seconds} />
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-chrome text-midnight font-black rounded-sm text-xl uppercase tracking-tighter overflow-hidden shadow-[0_0_50px_rgba(226,232,240,0.2)]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-iris via-white to-aurora opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 transition-colors group-hover:text-midnight">Secure Your Spot</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="px-12 py-6 bg-white/[0.02] border border-white/10 hover:border-white/20 text-chrome font-bold rounded-sm uppercase tracking-[0.3em] text-xs transition-all backdrop-blur-md"
          >
            View Challenges
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
