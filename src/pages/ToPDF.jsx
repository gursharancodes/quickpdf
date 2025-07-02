import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function ImageToPDF() {
    const [files, setFiles] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setPdfUrl(null);
        setProgress(0);
        setError('');

        if (selectedFiles.length > 0) {
            convertToPDF(selectedFiles);
        }
    };

    const convertToPDF = async (selectedFiles) => {
        setIsProcessing(true);
        setError('');
        setProgress(10);

        try {
            const pdfDoc = await PDFDocument.create();

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];

                const reader = new FileReader();
                const dataUrl = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const imgBytes = await fetch(dataUrl).then((res) => res.arrayBuffer());

                let img;
                if (file.type === 'image/jpeg') {
                    img = await pdfDoc.embedJpg(imgBytes);
                } else {
                    img = await pdfDoc.embedPng(imgBytes);
                }

                const page = pdfDoc.addPage([img.width, img.height]);
                page.drawImage(img, {
                    x: 0,
                    y: 0,
                    width: img.width,
                    height: img.height,
                });

                setProgress(10 + Math.round((i / selectedFiles.length) * 80));
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setPdfUrl(url);
            setProgress(100);
        } catch (err) {
            console.error('Image to PDF Error:', err);
            setError('Something went wrong while converting images. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setPdfUrl(null);
        setProgress(0);
        setError('');
        setIsProcessing(false);
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            {/* Radial Background */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]"></div>

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Image to PDF</h1>
                <p className="text-[#adadad] text-lg">
                    Convert your JPG or PNG images into a single PDF file.
                </p>
            </div>

            {/* Upload Area */}
            {!pdfUrl && (
                <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                    <label
                        htmlFor="imageUpload"
                        className="block w-full border-2 border-dashed border-gray-600 rounded-xl py-12 px-4 cursor-pointer hover:border-[#EB5E28] transition"
                    >
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img src="/icons/tools/upload.png" alt="Upload" className="h-10 opacity-80" />
                            <p className="text-lg font-semibold">
                                {files.length > 0 ? `${files.length} image(s) selected` : 'Click to upload images'}
                            </p>
                            <p className="text-sm text-[#adadad]">JPG or PNG · Max 20MB each</p>
                        </div>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Converting images to PDF...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download Area */}
            {pdfUrl && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">Your PDF is Ready</h3>
                    <p className="text-[#adadad] mb-6">Click the button below to download your file.</p>

                    <a
                        href={pdfUrl}
                        download="converted.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download PDF
                    </a>

                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Convert Another
                    </button>
                </div>
            )}
        </section>
    );
}
