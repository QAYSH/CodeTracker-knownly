'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started.',
    features: ['Auto Time Tracking', 'Basic Analytics', '1 Goal at a time', 'Community Support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9,
    description: 'For serious developers.',
    features: ['Everything in Free', 'Advanced Analytics', 'Unlimited Goals', 'Custom Badges', 'Priority Support'],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Team',
    price: 29,
    description: 'For coding squads.',
    features: ['Everything in Pro', 'Team Dashboards', 'Shared Goals', 'API Access', 'Dedicated Account Manager'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
            Simple <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-medium">
            Choose the plan that fits your coding journey. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Price animation
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: plan.price,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => setPrice(Math.floor(obj.val)),
        });
      },
    });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [plan.price]);

  return (
    <div
      ref={cardRef}
      className={`pricing-card relative glass p-10 rounded-[3rem] border transition-colors duration-500 flex flex-col h-full perspective-1000 ${
        plan.popular ? 'border-primary bg-primary/5' : 'border-white/5'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-primary/50">
          <Sparkles className="w-3 h-3" />
          Most Popular
        </div>
      )}

      <div className="mb-8" style={{ transform: 'translateZ(50px)' }}>
        <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-display font-black">${price}</span>
          <span className="text-gray-500 font-bold">/month</span>
        </div>
        <p className="text-gray-400 mt-4 font-medium">{plan.description}</p>
      </div>

      <div className="space-y-4 mb-12 flex-grow" style={{ transform: 'translateZ(30px)' }}>
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 ${
          plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'glass hover:bg-white/10'
        }`}
        style={{ transform: 'translateZ(40px)' }}
      >
        {plan.cta}
      </button>
    </div>
  );
}
