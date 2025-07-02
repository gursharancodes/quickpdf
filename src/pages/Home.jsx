import React from 'react'
import Hero from '../components/hero.jsx'
import Tools from '../components/tools.jsx'
import Features from '../components/features.jsx'
import HowItWorks from '../components/howItWorks.jsx'
import FAQ from '../components/faq.jsx'

export default function Home() {
    return (
        <div>
            <Hero />
            <Tools />
            <HowItWorks />
            <Features />
            <FAQ />
        </div>
    )
}
