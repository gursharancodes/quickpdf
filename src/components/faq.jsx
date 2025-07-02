// src/components/FAQ.jsx
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
    {
        question: 'Is QuickPDF really free to use?',
        answer: 'Yes! All basic tools are free with no signup needed.',
    },
    {
        question: 'Are my files stored on your servers?',
        answer: 'Nope. Files are processed in-browser or deleted immediately after processing for your privacy.',
    },
    {
        question: 'Is there a file size limit?',
        answer: 'There’s a soft file size cap (~20MB) to keep performance smooth.',
    },
    {
        question: 'Does it work on mobile devices?',
        answer: 'Yes! QuickPDF is fully responsive and works on phones, tablets, and desktops.',
    },
]

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="bg-black text-white px-6 py-20 border-t border-gray-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-10">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-2 border-gray-700 rounded-xl p-4 cursor-pointer bg-gray-800 hover:border-[#EB5E28] transition"
                            onClick={() => toggle(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="sm:text-lg">{faq.question}</h3>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            {openIndex === index && (
                                <p className="text-gray-400 mt-6">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ
