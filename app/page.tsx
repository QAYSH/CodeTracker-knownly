'use client';

import Navbar from '@/components/Navigation/Navbar';
import Hero from '@/components/Hero/Hero';
import FeaturesGrid from '@/components/Features/FeaturesGrid';
import PricingSection from '@/components/Pricing/PricingSection';
import WaitlistForm from '@/components/Waitlist/WaitlistForm';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import BackgroundParticles from '@/components/ui/BackgroundParticles';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <BackgroundParticles />
        <CustomCursor />
        <Navbar />
        <Hero />
        <FeaturesGrid />
        <PricingSection />
        <WaitlistForm />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
