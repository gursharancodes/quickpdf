import React from 'react'
import { Link } from "react-router-dom"

function Hero() {
    return (
        <main className="flex relative flex-col justify-center items-center h-[60vh] lg:min-h-[100vh] py-10 md:py-15 border-b border-gray-800 mt-10">
            {/* Background Radial Gradient Circle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[200px] lg:h-[500px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-50 pointer-events-none z-[-1]"></div>

            {/* Hero Content */}
            <div className="hero-content w-full h-full md:w-2/3 mx-auto flex justify-center text-center items-center">
                <div className="flex flex-col justify-center items-center w-[80vw]">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#FFFCF2] leading-tight">
                        Convert, Merge, Compress PDFs in Seconds.
                    </h1>
                    <p className="text-sm md:text-base py-3 text-[#adadad]">
                        QuickPDF is your all-in-one PDF toolkit. No limits, no ads — just fast tools that work.
                    </p>
                    <Link
                        to="/tools" // This will navigate to /tools when clicked
                        className="mt-5 border-2 border-[#EB5E28] bg-[#EB5E28] hover:bg-[#ff5816] px-6 py-1.5 rounded-full text-[#FFFCF2] md:text-lg font-semibold"
                    >
                        Try Tools Now
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Hero
