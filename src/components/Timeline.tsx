import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const milestones = [
  { date: 'MAY 15', title: 'Registrations Open', desc: 'Secure your spot and build your dream team in our digital arena.' },
  { date: 'JUN 01', title: 'Idea Submission', desc: 'Submit your disruptive concept. Our algorithm will evaluate the potential for scale and impact.' },
  { date: 'JUN 15', title: 'Hackathon Begins', desc: '48 hours of pure, unadulterated building. Coffee, code, and cosmic creativity.' },
  { date: 'JUN 17', title: 'Grand Finale', desc: 'Showcase your MVP to our elite jury panel and claim your spot in the hall of legends.' },
];

const TimelineItem = ({ item, index, isLast }: { item: typeof milestones[0], index: number, isLast: boolean }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex justify-center items-center w-full mb-32 md:mb-64">
      {/* Node Dot on the line */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 z-20 w-4 h-4 md:w-6 md:h-6 bg-midnight border-2 border-iris rounded-full shadow-[0_0_20px_rgba(129,140,248,0.5)] flex items-center justify-center"
      >
        <div className="w-1 md:w-2 h-1 md:h-2 bg-iris rounded-full animate-pulse" />
      </motion.div>

      <div className={`flex flex-col md:flex-row w-full items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content Block */}
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -50 : 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className={`w-full md:w-[45%] ${isEven ? 'text-center md:text-right' : 'text-center md:text-left'} px-6 md:px-12`}
        >
          <span className="font-mono text-[clamp(0.6rem,0.8vw,0.75rem)] font-bold text-iris tracking-[0.5em] mb-4 block uppercase py-1 px-3 bg-white/[0.03] inline-block rounded-sm">
            {item.date}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-black mb-4 text-chrome uppercase tracking-tighter">
            {item.title}
          </h3>
          <p className="text-white/30 text-sm md:text-base leading-relaxed font-light italic max-w-md mx-auto md:mx-0 inline-block">
            {item.desc}
          </p>
        </motion.div>

        {/* Spacer for Centering */}
        <div className="hidden md:block w-[10%]" />
        
        {/* Empty space for alternating layout */}
        <div className="hidden md:block w-[45%]" />
      </div>
    </div>
  );
};

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="timeline" className="py-64 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-48">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-iris font-mono text-xs uppercase tracking-[0.8em] mb-4"
          >
            Chronology
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,8vw,6rem)] font-black text-chrome uppercase tracking-tighter"
          >
            The <span className="text-iris italic">Ascension</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl py-20 min-h-[1000px]">
          {/* Central Vertical Line Background */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05]" />
          
          {/* Animated Growth Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-iris shadow-[0_0_15px_rgba(129,140,248,0.4)] z-10"
          />

          <div className="relative flex flex-col pt-20">
            {milestones.map((item, i) => (
              <TimelineItem 
                key={i} 
                item={item} 
                index={i} 
                isLast={i === milestones.length - 1} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
