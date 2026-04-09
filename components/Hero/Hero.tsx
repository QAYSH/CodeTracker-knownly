'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tiltContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline();

      tl.from('.hero-reveal', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
      })
      .from('.stat-card', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.5');

      // Parallax Background
      gsap.to('.hero-bg-shapes', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animated Gradient
      gsap.to('.gradient-mesh', {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    });

    // 3D Tilt Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!tiltContainerRef.current) return;
      const rect = tiltContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      gsap.to(tiltContainerRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!tiltContainerRef.current) return;
      gsap.to(tiltContainerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const section = sectionRef.current;
    section?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      section?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const stats = [
    { label: 'Interns', value: '2,500+' },
    { label: 'Hours Tracked', value: '50K+' },
    { label: 'Success Rate', value: '94%' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden perspective-1000"
    >
      {/* Background Elements */}
      <div className="gradient-mesh absolute inset-0 -z-10 opacity-30 blur-[100px] bg-[radial-gradient(circle_at_50%_50%,#6366f1,transparent_50%),radial-gradient(circle_at_100%_0%,#d946ef,transparent_50%),radial-gradient(circle_at_0%_100%,#8b5cf6,transparent_50%)] bg-[length:200%_200%]" />
      
      <div className="hero-bg-shapes absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl w-full text-center space-y-8" style={{ transformStyle: 'preserve-3d' }}>
        <div className="hero-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase text-primary border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          New: Version 2.0 is out
        </div>

        <div ref={tiltContainerRef} className="space-y-8" style={{ transformStyle: 'preserve-3d' }}>
          <h1
            ref={headingRef}
            className="hero-reveal text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.9]"
            style={{ transform: 'translateZ(50px)' }}
          >
            Track Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-pink-500">
              Coding Journey
            </span>
          </h1>

          <p 
            className="hero-reveal text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium"
            style={{ transform: 'translateZ(30px)' }}
          >
            The ultimate productivity companion for developers. Automate your time tracking, 
            earn badges, and reach your coding goals faster.
          </p>
        </div>

        <div className="hero-reveal flex flex-wrap items-center justify-center gap-4 pt-4">
          <Magnetic>
            <button className="px-8 py-4 bg-primary hover:bg-secondary rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              Start Tracking Free
            </button>
          </Magnetic>
          <Magnetic>
            <button className="px-8 py-4 glass hover:bg-white/10 rounded-full text-lg font-bold flex items-center gap-2 transition-all">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card glass p-8 rounded-3xl text-center space-y-2 border border-white/5"
            >
              <div className="text-4xl font-display font-black text-current">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
