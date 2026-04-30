import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Who can participate?",
    a: "Students from any university across the country can participate. We welcome all skill levels, from beginners to experienced developers."
  },
  {
    q: "What is the team size?",
    a: "Teams can consist of 2 to 4 members. If you're a lone wolf, don't worry! We'll have networking sessions to help you find teammates."
  },
  {
    q: "Are there any registration fees?",
    a: "Absolutely not! Deviathon 2.0 is completely free for all participants, including food, swag, and workshops."
  },
  {
    q: "What if I don't have an idea?",
    a: "That's fine! We'll have several pre-hackathon ideation workshops and mentors on-site to help you find a problem to solve."
  }
];

interface AccordionItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onClick: () => void;
  key?: React.Key;
}

const AccordionItem = ({ q, a, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className={`border-b border-white/10 transition-all duration-300 ${isOpen ? 'bg-white/5 border-l-2 border-l-aurora rounded-r-xl' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-8 px-6 flex justify-between items-center text-left hover:text-aurora transition-colors"
      >
        <span className={`font-display text-lg md:text-xl font-bold tracking-tight ${isOpen ? 'text-white' : 'text-slate-400 italic'}`}>{q}</span>
        {isOpen ? <Minus className="w-5 h-5 text-aurora" /> : <Plus className="w-5 h-5 text-iris" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-6 text-slate-400 text-sm leading-relaxed max-w-2xl">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-[clamp(10rem,15vw,20rem)] px-6 max-w-5xl mx-auto z-10 relative">
      <div className="text-center mb-32">
        <h2 className="font-display text-[clamp(3rem,10vw,8rem)] font-black mb-8 uppercase tracking-tighter italic">FAQ<span className="text-aurora">'s</span></h2>
        <p className="text-white/20 uppercase tracking-[0.4em] font-bold text-[clamp(0.6rem,0.8vw,0.75rem)]">Accessing central knowledge base...</p>
      </div>
      
      <div className="flex flex-col border-t border-white/10">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            q={faq.q}
            a={faq.a}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};
