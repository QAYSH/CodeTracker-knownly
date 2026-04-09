'use client';

import { Github, Twitter, Linkedin, Code2, ArrowUp } from 'lucide-react';
import gsap from 'gsap';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5" style={{ backgroundColor: 'var(--mobile-menu-bg)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tighter">
            <Code2 className="w-8 h-8 text-primary" />
            <span>CodeTrack</span>
          </div>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            The premium productivity tracker designed for the next generation of developers. 
            Automate your growth, one commit at a time.
          </p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-display font-bold text-lg">Product</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-display font-bold text-lg">Company</h4>
          <ul className="space-y-4 text-gray-500 font-medium">
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
        <p className="text-sm text-gray-500 font-medium">
          © 2026 CodeTrack Inc. All rights reserved.
        </p>
        
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
        >
          Back to top
          <div className="w-8 h-8 glass rounded-full flex items-center justify-center group-hover:-translate-y-1 transition-transform">
            <ArrowUp className="w-4 h-4" />
          </div>
        </button>
      </div>
    </footer>
  );
}
