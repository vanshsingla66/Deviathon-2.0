import React from 'react';
import { motion } from 'motion/react';

const sponsors = [
  { name: 'QuantumX', logo: 'QX' },
  { name: 'AuroraSoft', logo: 'AS' },
  { name: 'Nebula Labs', logo: 'NL' },
  { name: 'Vortex AI', logo: 'VX' },
  { name: 'Binary Star', logo: 'BS' },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-48 border-y border-white/5 bg-midnight/30 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-10 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-4 block">Powering the Helix</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter">Strategic <span className="text-iris italic">Nexus</span></h2>
        </div>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-20 py-12 pr-20"
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="group/logo relative w-64 h-32 glass rounded-sm flex items-center justify-center p-10 grayscale opacity-30 transition-all duration-700 hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:border-iris/50"
            >
              <div className="absolute inset-0 bg-linear-to-br from-iris/10 via-transparent to-aurora/10 opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              <span className="font-display font-black text-4xl group-hover/logo:text-chrome transition-all tracking-tighter uppercase italic">
                {sponsor.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
