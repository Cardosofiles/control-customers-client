import { FeatureSection } from '@/components/layout/feature-section'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/layout/hero-section'
import { SupportSection } from '@/components/layout/suport-section'

export default function Home() {
  return (
    <div className="py-3">
      <HeroSection />
      <FeatureSection />
      <SupportSection />
      <Footer />
    </div>
  )
}
