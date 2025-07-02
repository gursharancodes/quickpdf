import React from 'react'
import { Link } from 'react-router-dom'

// Tool data
const tools = [
    {
        title: 'Merge PDFs',
        description: 'Combine multiple PDF files into a single document quickly and effortlessly.',
        icon: 'icons/tools/merge.png',
        alt: 'merge-icon',
        link: '/tools/merge' // Link to the Merge PDF page
    },
    {
        title: 'Split PDF',
        description: 'Extract pages or divide a PDF into separate files with just a few clicks.',
        icon: 'icons/tools/split.png',
        alt: 'split-icon',
        link: '/tools/split' // Link to the Split PDF page
    },
    {
        title: 'Compress PDF',
        description: 'Reduce your PDF file size without compromising quality or readability.',
        icon: 'icons/tools/compression.png',
        alt: 'compression-icon',
        link: '/tools/compress' // Link to the Compress PDF page
    },
    {
        title: 'PDF to Image',
        description: 'Convert your PDF pages into high-quality image files instantly.',
        icon: 'icons/tools/toimage.png',
        alt: 'toimage-icon',
        link: '/tools/pdf-to-image' // Link to PDF to Image page
    },
    {
        title: 'Image to PDF',
        description: 'Convert your images into high-quality PDF files instantly.',
        icon: 'icons/tools/toimage.png',
        alt: 'toimage-icon',
        link: '/tools/image-to-pdf' // Link to Image to PDF page
    },
    {
        title: 'Add Watermark',
        description: 'Easily add text or image watermarks to your documents or images.',
        icon: 'icons/tools/watermark.png',
        alt: 'watermark-icon',
        link: '/tools/add-watermark' // Link to Add Watermark page
    },
    {
        title: 'Remove Pages',
        description: 'Quickly remove unwanted pages from your PDF files with ease.',
        icon: 'icons/tools/removepages.png',
        alt: 'remove-pages-icon',
        link: '/tools/remove-pages' // Link to Remove Pages page
    },
    {
        title: 'Add Pages',
        description: 'Insert new pages into your PDF files or merge documents seamlessly.',
        icon: 'icons/tools/addpages.png',
        alt: 'add-pages-icon',
        link: '/tools/add-pages' // Link to Add Pages page
    },
    {
        title: 'Sign PDF',
        description: 'Digitally sign your PDF documents for a professional finish.',
        icon: 'icons/tools/signpdf.png',
        alt: 'sign-pdf-icon',
        link: '/tools/sign-pdf' // Link to Sign PDF page
    }
]

function Tools() {
    return (
        <section className="px-6 relative py-15 md:py-20 border-b border-gray-800 max-w-4xl mx-auto">
            {/* Background Radial Gradient Circle */}
            <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[60vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]"></div>
            <div className="mb-8">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-[#FFFCF2] mb-2">Our Tools</h2>
                <h2 className="text-center md:text-xl text-[#adadad]">No limits, no ads — just fast tools that work.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-5 md:py-6 gap-5 items-stretch">
                {tools.map((tool, index) => (
                    <Link key={index} to={tool.link} className="box cursor-pointer h-full">
                        <div className="flex flex-col h-full bg-gray-800 border-2 border-gray-700 p-6 rounded-xl hover:shadow-lg hover:border-[#EB5E28] transition-all">
                            <div className="flex gap-3 items-center mb-4 text-[#FFFCF2] group-hover:scale-110 transition-transform">
                                <img src={tool.icon} alt={tool.alt} className="h-7" />
                                <h2 className="text-xl font-bold">{tool.title}</h2>
                            </div>
                            <p className="text-[#adadad] flex-grow">{tool.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Tools
