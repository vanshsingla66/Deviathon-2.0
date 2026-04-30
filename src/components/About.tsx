import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0.3,
        z: -10,
        filter: 'none',
      },
      {
        opacity: 1,
        z: 0,
        filter: 'none',
        stagger: 0.02,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

  const text = "Deviathon 2.0 at GLA University is a premier national-level hackathon where India’s brightest minds converge to code, create, and disrupt. Join this 72-hour innovation marathon from June 15 - 18 to compete for a ₹5L+ prize pool, exclusive internship offers, and the chance to solve real-world challenges alongside industry experts.";

  return (
    <section id="about" ref={containerRef} className="relative py-[clamp(10rem,15vw,20rem)] px-6 max-w-7xl mx-auto z-10 perspective-1000">
      <div className="flex flex-col gap-24">
        <div className="flex items-center gap-8">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-[2px] grow bg-linear-to-r from-iris via-aurora to-transparent origin-left" 
          />
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(0.6rem,1vw,0.75rem)] font-bold uppercase tracking-[0.8em] text-iris whitespace-nowrap chrome-shadow"
          >
            The Visionary Core
          </motion.span>
        </div>
        
        <div ref={textRef} className="font-sans text-[clamp(1.25rem,3vw,2.2rem)] font-normal leading-[1.6] tracking-tight text-white flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] border-l border-white/20 pl-12 py-2 bg-white/[0.03] rounded-r-3xl">
          {text.split(' ').map((word, i) => (
            <span key={i} className="char inline-block transition-all duration-500 transform-style-3d hover:text-white">
              {word}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mt-32">
          {[
            { label: 'Prizes', value: '₹5L+' },
            { label: 'Timeline', value: '72 HOURS' },
            { label: 'Builders', value: '500+' },
            { label: 'Ecosystem', value: 'GLA UNIV' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1, ease: 'easeOut' }}
              className="flex flex-col gap-4 group cursor-pointer"
            >
              <span className="text-[clamp(2rem,4vw,3rem)] font-display font-black text-aurora group-hover:text-chrome transition-all duration-500 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[clamp(0.6rem,0.8vw,0.75rem)] uppercase font-bold tracking-[0.5em] text-slate-500 group-hover:text-iris transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
