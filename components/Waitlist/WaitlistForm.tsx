'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2 } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.waitlist-reveal', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef'],
      });
    }, 1500);
  };

  return (
    <section id="waitlist" className="py-32 px-6">
      <div ref={formRef} className="waitlist-reveal max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] border border-white/5 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
            Join the <span className="text-primary">Waitlist</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-medium text-lg">
            Be the first to know when we launch and get exclusive early-bird perks.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">You&apos;re on the list!</h3>
              <p className="text-gray-400">We&apos;ll reach out to you soon at {email}.</p>
              <button 
                onClick={() => {setStatus('idle'); setEmail('');}}
                className="text-primary font-bold hover:underline mt-4"
              >
                Add another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto pt-4">
              <div className="flex-grow relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <div className="absolute inset-0 rounded-2xl border border-primary opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-primary hover:bg-secondary disabled:opacity-50 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Join Now
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
          
          <p className="text-xs text-gray-500 font-medium">
            Join 2,500+ developers already waiting. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
