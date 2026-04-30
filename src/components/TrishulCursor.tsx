import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

export const TrishulCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, velocity: 0 });
  const particles = useRef<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // GSAP Setup
    const xSetter = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySetter = gsap.quickSetter(cursorRef.current, "y", "px");
    const rotateSetter = gsap.quickSetter(cursorRef.current, "rotation", "deg");
    const glowSetter = gsap.quickSetter(cursorRef.current, "filter", "");

    const createParticle = (x: number, y: number, isShockwave = false) => {
      const angle = isShockwave ? Math.random() * Math.PI * 2 : Math.random() * Math.PI * 2;
      const speed = isShockwave ? Math.random() * 8 + 4 : Math.random() * 2 + 1;
      
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + (isShockwave ? 0 : 0.5), // Slight gravity for trail
        life: 1,
        size: Math.random() * 3 + 1,
        color: isHovering ? '#818CF8' : '#EF4444' // Pulse aura turns iris
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      const dx = mouse.current.x - mouse.current.prevX;
      const dy = mouse.current.y - mouse.current.prevY;
      mouse.current.velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Emit particles based on velocity
      const emissionCount = Math.min(Math.floor(mouse.current.velocity / 2), 5);
      for (let i = 0; i < emissionCount; i++) {
        createParticle(mouse.current.x, mouse.current.y);
      }

      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
    };

    const handleClick = () => {
      // Shockwave
      for (let i = 0; i < 30; i++) {
        createParticle(mouse.current.x, mouse.current.y, true);
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    const update = () => {
      // Update SVG Position
      xSetter(mouse.current.x);
      ySetter(mouse.current.y);
      rotateSetter(isHovering ? 45 : 0);
      
      const glowIntensity = Math.min(mouse.current.velocity * 0.5 + (isHovering ? 15 : 8), 30);
      glowSetter(`drop-shadow(0 0 ${glowIntensity}px #EF4444)`);

      // Hover Aura Emission
      if (isHovering && Math.random() > 0.5) {
        createParticle(mouse.current.x + (Math.random() - 0.5) * 20, mouse.current.y + (Math.random() - 0.5) * 20);
      }

      // Update Canvas Particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.size *= 0.98;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    };

    gsap.ticker.add(update);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
      gsap.ticker.remove(update);
    };
  }, [isHovering, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 pointer-events-none z-[10000] flex items-center justify-center transition-transform duration-300 ease-out"
      >
        <svg
          viewBox="0 0 40 100"
          className="w-full h-full"
          style={{ fill: 'none', stroke: '#818CF8', strokeWidth: 4, strokeLinecap: 'round' }}
        >
          {/* Trishul SVG */}
          <path d="M20 95 L20 15" />
          <path d="M10 35 L10 25 Q10 15 20 15 Q30 15 30 25 L30 35" />
          <path d="M20 15 L20 5" />
          <path d="M5 35 Q5 20 20 20 Q35 20 35 35" />
          {/* Damru center part */}
          <path d="M15 55 L25 65 M15 65 L25 55" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
};
