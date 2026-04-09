'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, BarChart3, Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Auto Time Tracking',
    description: 'Automatically logs your coding sessions across all major IDEs.',
    icon: Clock,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Detailed Analytics',
    description: 'Deep dive into your productivity patterns with visual heatmaps.',
    icon: BarChart3,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    title: 'Goal Setting',
    description: 'Set daily, weekly, and monthly targets to stay on track.',
    icon: Target,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    title: 'Achievement Badges',
    description: 'Gamify your coding journey with unlockable rewards and levels.',
    icon: Award,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
            Supercharge Your <br />
            <span className="text-primary">Workflow</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Everything you need to master your time and become a more efficient developer.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card group glass p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-4"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {feature.description}
              </p>
              
              <div className="mt-8 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
