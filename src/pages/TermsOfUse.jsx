import React from "react";

const TermsOfUse = () => {
    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Terms of Services</h1>
                <p className="text-[#adadad] text-base">Effective Date: April 21, 2025</p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl space-y-10 text-[#ccc] leading-relaxed">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                    <p>By using QuickPDF, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use our service.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">2. Use of Service</h2>
                    <p>QuickPDF is provided for lawful use only. You agree not to misuse the service or attempt unauthorized access to any part of the platform.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">3. File Handling</h2>
                    <p>Uploaded files are processed temporarily and deleted automatically after 1 hour. We do not view or store your files permanently.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">4. Service Availability</h2>
                    <p>We strive to keep QuickPDF running smoothly but cannot guarantee uninterrupted access. Downtime may occur for updates or unforeseen issues.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
                    <p>QuickPDF is provided "as-is" without warranties. We are not liable for any damages resulting from the use or inability to use our service.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">6. Modifications</h2>
                    <p>We may update these Terms of Use from time to time. Continued use after changes implies acceptance of the new terms.</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-3">7. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, feel free to reach out:
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

export default TermsOfUse;
