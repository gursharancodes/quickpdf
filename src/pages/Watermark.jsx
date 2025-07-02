import React, { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

export default function AddWatermark() {
    const [pdfFile, setPdfFile] = useState(null);
    const [watermarkedPdfUrl, setWatermarkedPdfUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [watermarkText, setWatermarkText] = useState('');
    const [watermarkImage, setWatermarkImage] = useState(null);

    const handlePDFChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
        setWatermarkedPdfUrl(null);
        setProgress(0);
        setError('');
    };

    const handleWatermarkImageChange = (e) => {
        const file = e.target.files[0];
        setWatermarkImage(file);
    };

    const handleAddWatermark = async () => {
        if (!pdfFile) {
            setError('Please upload a PDF file.');
            return;
        }

        setIsProcessing(true);
        setProgress(10);
        setError('');

        try {
            const existingPdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const pages = pdfDoc.getPages();

            let embeddedImage;
            if (watermarkImage) {
                const imgBytes = await watermarkImage.arrayBuffer();
                if (watermarkImage.type === 'image/png') {
                    embeddedImage = await pdfDoc.embedPng(imgBytes);
                } else {
                    embeddedImage = await pdfDoc.embedJpg(imgBytes);
                }
            }

            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            pages.forEach((page) => {
                const { width, height } = page.getSize();

                if (embeddedImage) {
                    const imgWidth = 100;
                    const imgHeight = (embeddedImage.height / embeddedImage.width) * 100;
                    page.drawImage(embeddedImage, {
                        x: width / 2 - imgWidth / 2,
                        y: height / 2 - imgHeight / 2,
                        width: imgWidth,
                        height: imgHeight,
                        opacity: 0.2,
                    });
                }

                if (watermarkText) {
                    page.drawText(watermarkText, {
                        x: width / 2 - watermarkText.length * 4,
                        y: height / 2,
                        size: 30,
                        font,
                        color: rgb(0.7, 0.7, 0.7),
                        rotate: degrees(-30),
                        opacity: 0.3,
                    });
                }
            });

            setProgress(80);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setWatermarkedPdfUrl(url);
            setProgress(100);
        } catch (err) {
            console.error('Watermarking error:', err);
            setError('Something went wrong. Make sure the PDF is valid and try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setPdfFile(null);
        setWatermarkText('');
        setWatermarkImage(null);
        setWatermarkedPdfUrl(null);
        setProgress(0);
        setError('');
        setIsProcessing(false);
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Add Watermark</h1>
                <p className="text-[#adadad] text-lg">
                    Upload a PDF and add a text or image watermark to every page.
                </p>
            </div>

            {!watermarkedPdfUrl && (
                <div className="space-y-6">
                    {/* PDF Upload */}
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <label htmlFor="pdfInput" className="block cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                                <img src="/icons/tools/upload.png" alt="Upload" className="h-10 opacity-80" />
                                <p className="font-semibold text-lg">
                                    {pdfFile ? pdfFile.name : 'Click to upload your PDF'}
                                </p>
                                <p className="text-sm text-[#adadad]">PDF only · Max 20MB</p>
                            </div>
                            <input
                                type="file"
                                id="pdfInput"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handlePDFChange}
                            />
                        </label>
                    </div>

                    {/* Watermark Inputs */}
                    <div className="mt-10 bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 text-center shadow-xl transition-all">
                        <p className="mb-4 font-semibold text-lg">Choose watermark type</p>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter watermark text (optional)"
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-white focus:outline-none"
                            />
                            <div className=''>
                                <label className="text-[#adadad] mb-4 block">or <br /> Upload watermark image</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleWatermarkImageChange}
                                    className="bg-gray-800 border-2 w-full border-gray-700 rounded-2xl p-4 md:p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAddWatermark}
                            className="mt-6 inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Add Watermark'}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </div>
                </div>
            )}

            {/* Progress */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Adding watermark...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download */}
            {watermarkedPdfUrl && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">Watermarked PDF is Ready</h3>
                    <p className="text-[#adadad] mb-6">Click below to download your file.</p>
                    <a
                        href={watermarkedPdfUrl}
                        download="watermarked.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download PDF
                    </a>
                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Add Another
                    </button>
                </div>
            )}
        </section>
    );
}
