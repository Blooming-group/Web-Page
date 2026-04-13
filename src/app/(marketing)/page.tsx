import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { AboutBrief } from '@/components/sections/AboutBrief'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <AboutBrief />
      <CTA />
    </>
  )
}
