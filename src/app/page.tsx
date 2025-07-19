import { AnalyticsDashboardPreview } from '@/components/layout/analytics-dashboard-preview'
import { CTASection } from '@/components/layout/cta-section'
import { FeatureSection } from '@/components/layout/feature-section'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/layout/hero-section'
import { StarsSections } from '@/components/layout/stats-section'
import { Testimonials } from '@/components/layout/testemonials'

export default function Home() {
  return (
    <div className="from-background via-background to-primary/5 min-h-screen bg-gradient-to-br">
      <HeroSection />
      <StarsSections />
      <FeatureSection />
      <AnalyticsDashboardPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
