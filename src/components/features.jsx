// src/components/Features.jsx
import React from 'react'

// Feature data
const features = [
    {
        icon: 'icons/whyChoose/secure.png',
        title: 'Secure & Private',
        description: 'Your files are never stored. Everything is processed locally or deleted instantly.',
        alt: 'secure-icon'
    },
    {
        icon: 'icons/whyChoose/speed.png',
        title: 'Blazing Fast',
        description: 'Optimized tools to handle PDFs instantly without waiting around.',
        alt: 'speed-icon'
    },
    {
        icon: 'icons/whyChoose/nologin.png',
        title: 'No Login Needed',
        description: 'Use all tools without signing up — just upload and go.',
        alt: 'no-login-icon'
    },
    // {
    //     icon: 'icons/whyChoose/smartphone.png',
    //     title: 'Mobile Friendly',
    //     description: 'QuickPDF works perfectly on phones, tablets, and desktops.',
    //     alt: 'mobile-icon'
    // }
]

function Features() {
    return (
        <section id="tools" className="px-6 py-15 md:py-20 border-b border-gray-800 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-2">
                    Why Choose QuickPDF?
                </h2>
                <h2 className="text-center md:text-xl text-[#adadad]">
                    Simple. Fast. Secure. Everything you need in one place.
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 md:py-6 gap-5 items-stretch">
                {features.map((feature, index) => (
                    <div key={index} className="box h-full">
                        <div className="flex flex-col h-full bg-gray-800 border-2 border-gray-700 p-6 rounded-xl hover:shadow-lg hover:border-[#EB5E28] transition-all">
                            <div className="flex gap-3 items-center mb-4 text-[#FFFCF2] group-hover:scale-110 transition-transform">
                                <img src={feature.icon} alt={feature.alt} className="h-7" />
                                <h2 className="text-xl font-bold">{feature.title}</h2>
                            </div>
                            <p className="text-[#adadad] flex-grow">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Features
