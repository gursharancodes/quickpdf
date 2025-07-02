import React from "react";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
      {/* Radial Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]"></div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-[#adadad] text-lg">
          Have questions, proposals, or collaboration ideas? Connect with us
          directly through the details below.
        </p>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-8 bg-gray-800 border-2 rounded-2xl p-8 shadow-xl transition-all">
        {/* Email Block */}
        <div className="flex items-start">
          <div className="p-3 px-4 bg-gray-700 rounded-full flex items-center justify-center">
            <Mail className="text-[#EB5E28]" size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-[#EB5E28] mb-1">Email</h2>
            <a
              href="mailto:support@quickpdf.app"
              className="text-base underline transition"
            >
              support@quickpdf.app
            </a>
          </div>
        </div>

        {/* Phone Block */}
        <div className="flex items-start">
          <div className="p-3 px-4 bg-gray-700 rounded-full flex items-center justify-center">
            <Phone className="text-[#EB5E28]" size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-[#EB5E28] mb-1">Phone</h2>
            <a
              href="tel:+1234567890"
              className="text-base underline transition"
            >
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mt-16 text-center">
        <button
          className="font-semibold py-3 px-8 rounded-xl transition-all bg-[#EB5E28] text-white hover:bg-[#d44f1e] cursor-pointer"
          onClick={() => (window.location = "mailto:support@quickpdf.app")}
        >
          Send Email
        </button>
      </div>
    </section>
  );
}
