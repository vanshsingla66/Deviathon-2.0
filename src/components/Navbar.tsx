import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import gsap from 'gsap';

import { Logo } from './Logo';

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsAtTop(window.scrollY < 50);
    };
    
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(linksRef.current, {
        y: -10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: '#about' },
    { name: 'Timeline', id: '#timeline' },
    { name: 'Sponsors', id: '#sponsors' },
    { name: 'FAQ', id: '#faq' },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isAtTop ? 0 : -20, 
        opacity: isAtTop ? 1 : 0,
        pointerEvents: isAtTop ? 'auto' : 'none'
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-transparent border-none"
    >
      <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      
      <div className="hidden md:flex gap-12 items-center font-bold text-[clamp(0.6rem,0.8vw,0.7rem)] text-white/40 uppercase tracking-[0.4em]">
        {navLinks.map((link, i) => (
          <a 
            key={link.name} 
            href={link.id}
            ref={el => { if (el) linksRef.current[i] = el!; }}
            onClick={(e) => {
              e.preventDefault();
              handleScroll(link.id);
            }}
            className="hover:text-chrome transition-colors"
          >
            {link.name}
          </a>
        ))}
        <motion.button 
          ref={el => { if (el) linksRef.current[navLinks.length] = el!; }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleScroll('#register')}
          className="px-8 py-3 bg-chrome text-midnight font-black rounded-sm hover:bg-iris transition-colors shadow-2xl"
        >
          REGISTER
        </motion.button>
      </div>

      <div className="md:hidden">
        <Menu className="w-6 h-6 text-white" />
      </div>
    </motion.nav>
  );
};
