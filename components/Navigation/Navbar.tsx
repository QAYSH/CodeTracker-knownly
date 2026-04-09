'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Code2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from('.nav-item', {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    });

    // Scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add('glass', 'py-4');
        navRef.current?.classList.remove('py-6');
      } else {
        navRef.current?.classList.remove('glass', 'py-4');
        navRef.current?.classList.add('py-6');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.from('.mobile-nav-item', {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
      });
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Waitlist', href: '#waitlist' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 px-6 md:px-12 flex items-center justify-between"
    >
      <div className="nav-item flex items-center gap-2 font-display text-2xl font-bold tracking-tighter">
        <Code2 className="w-8 h-8 text-primary" />
        <span>CodeTrack</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-item text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <button className="nav-item px-6 py-2 bg-primary hover:bg-secondary rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
          Get Started
        </button>
      </div>

      <button
        className="nav-item md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-full md:w-80 bg-dark-deep z-50 p-12 flex flex-col gap-8 translate-x-full shadow-2xl border-l border-white/10"
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-6 mt-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-nav-item text-3xl font-display font-bold hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="mobile-nav-item mt-4 px-8 py-4 bg-primary rounded-xl text-xl font-bold">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
