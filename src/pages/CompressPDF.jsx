import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
// import { motion } from 'framer-motion';

export default function CompressPDF() {
    const [file, setFile] = useState(null);
    const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setCompressedPdfUrl(null);
        setProgress(0);
        setError('');
        if (selectedFile) {
            handleCompress(selectedFile);
        }
    };

    const handleCompress = async (selectedFile) => {
        if (!selectedFile) {
            setError('No file selected. Please upload a valid PDF.');
            return;
        }

        // 20MB limit check
        if (selectedFile.size > 20 * 1024 * 1024) {
            setError('File too large. Max allowed size is 20MB.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setProgress(10); // start progress

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            setProgress(40);

            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            setProgress(60);

            // Strip metadata
            pdfDoc.setTitle('');
            pdfDoc.setAuthor('');
            pdfDoc.setSubject('');
            pdfDoc.setKeywords([]);
            pdfDoc.setProducer('');
            pdfDoc.setCreator('');
            // pdfDoc.setCreationDate(undefined);
            // pdfDoc.setModificationDate(undefined);
            setProgress(80);

            const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
            const blob = new Blob([compressedBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setCompressedPdfUrl(url);
            setProgress(100);
        } catch (err) {
            console.error('Compression error:', err); // logs real error in browser
            setError('Something went wrong while compressing the PDF. Make sure the file isn’t encrypted or corrupted.');
        } finally {
            setIsProcessing(false);
        }
    };


    const handleReset = () => {
        setFile(null);
        setCompressedPdfUrl(null);
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
                <h1 className="text-4xl font-bold mb-3">Compress PDF</h1>
                <p className="text-[#adadad] text-lg">
                    Reduce the size of your PDF file for faster sharing and easier storage.
                </p>
            </div>

            {/* Upload Area */}
            {!compressedPdfUrl && (
                <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                    <label
                        htmlFor="pdfUpload"
                        className="block w-full border-2 border-dashed border-gray-600 rounded-xl py-12 px-4 cursor-pointer hover:border-[#EB5E28] transition"
                    >
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img src="/icons/tools/upload.png" alt="Upload" className="h-10 opacity-80" />
                            <p className="text-lg font-semibold">
                                {file ? file.name : 'Click to upload your PDF'}
                            </p>
                            <p className="text-sm text-[#adadad]">Max size: 20MB · One file only</p>
                        </div>
                        <input
                            type="file"
                            id="pdfUpload"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Compressing your file...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download Area */}
            {compressedPdfUrl && (
                <div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg"
                >
                    <h3 className="text-2xl font-bold mb-2">Your compressed PDF is ready</h3>
                    <p className="text-[#adadad] mb-6">Click below to download your optimized file.</p>

                    <a
                        href={compressedPdfUrl}
                        download="compressed.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download Compressed PDF
                    </a>

                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Compress Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}
