// src/components/HowItWorks.jsx
import React from 'react'

// Step data
const steps = [
    {
        title: 'Choose an Action',
        description: 'Pick the tool you need — QuickPDF offers all-in-one features.',
    },
    {
        title: 'Upload Your File',
        description: 'Select the PDF you want to edit, merge, compress, or convert.'
    },
    {
        title: 'Download the File',
        description: 'Get your processed PDF instantly. No sign-up, no waiting.'
    }
]

function HowItWorks() {
    return (
        <section className="px-6 py-15 md:py-20 border-b border-gray-800 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-2">How It Works ?</h2>
                <h2 className="text-center md:text-xl text-[#adadad]">
                    Just 3 simple steps to get things done quickly and securely.
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 py-5 md:py-6 gap-5 items-stretch">
                {steps.map((step, index) => {
                    const content = (
                        <div className="box h-full">
                            <div className="flex flex-col h-full bg-gray-800 border-2 border-gray-700 p-6 rounded-xl hover:shadow-lg hover:border-[#EB5E28] transition-all">
                                <div className="flex gap-3 items-center mb-4 text-[#FFFCF2] group-hover:scale-110 transition-transform">
                                    <h2 className="text-xl font-bold">{step.title}</h2>
                                </div>
                                <p className="text-[#adadad] flex-grow">{step.description}</p>
                            </div>
                        </div>
                    )
                    return step.href ? (
                        <a key={index} href={step.href}>
                            {content}
                        </a>
                    ) : (
                        <React.Fragment key={index}>{content}</React.Fragment>
                    )
                })}
            </div>
        </section>
    )
}

export default HowItWorks
