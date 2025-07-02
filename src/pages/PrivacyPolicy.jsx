import React from "react";

const PrivacyPolicy = () => {
    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-[#adadad] text-base">Effective Date: April 21, 2025</p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl space-y-10 text-[#ccc] leading-relaxed">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
                    <p>We collect minimal personal data to deliver our services. This includes:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Usage data for performance improvements</li>
                        <li>Temporarily uploaded PDF files for processing</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                    <p>We use your data to operate QuickPDF, enhance user experience, and ensure security. Uploaded files are never stored permanently or used for any other purpose.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">3. File Privacy & Security</h2>
                    <p>All files are securely processed and deleted automatically within 1 hour. HTTPS is used to encrypt your data during transfer.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">4. Third-Party Services</h2>
                    <p>We use secure third-party services for analytics and hosting. These providers comply with modern privacy standards.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">5. Data Retention</h2>
                    <p>PDF files are deleted after processing. Account and usage data are retained as necessary for service operation or legal compliance.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">6. Changes to This Policy</h2>
                    <p>We may update this policy occasionally. Updates will be posted here with the new effective date.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">7. Contact Us</h2>
                    <p>
                        If you have any questions, reach out at:
                        <br />
                        <span className="font-medium">Email:</span> support@quickpdf.app
                        <br />
                        <span className="font-medium">Contact Page:</span>{" "}
                        <a href="/contact" className="text-blue-500 underline hover:text-blue-700">Contact Us</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
