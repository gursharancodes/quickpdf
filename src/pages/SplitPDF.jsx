import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SplitPDF() {
    const [file, setFile] = useState(null);
    const [pageRange, setPageRange] = useState('');
    const [splitPdfUrl, setSplitPdfUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const parsePageRange = (rangeStr, totalPages) => {
        const pages = new Set();

        const parts = rangeStr.split(',');
        parts.forEach(part => {
            const [start, end] = part.split('-').map(num => parseInt(num.trim()));
            if (!isNaN(start)) {
                if (end && !isNaN(end)) {
                    for (let i = start; i <= end; i++) {
                        if (i >= 1 && i <= totalPages) pages.add(i);
                    }
                } else {
                    if (start >= 1 && start <= totalPages) pages.add(start);
                }
            }
        });

        return Array.from(pages).sort((a, b) => a - b).map(p => p - 1); // 0-based
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setSplitPdfUrl(null);
        setProgress(0);
        setError('');
    };

    const handleSplit = async () => {
        if (!file) return setError('Please upload a PDF file.');
        if (!pageRange.trim()) return setError('Enter page numbers to extract.');

        setIsProcessing(true);
        setProgress(0);
        setSplitPdfUrl(null);
        setError('');

        try {
            const existingPdfBytes = await file.arrayBuffer();
            const originalPdf = await PDFDocument.load(existingPdfBytes);
            const totalPages = originalPdf.getPageCount();
            const pageIndices = parsePageRange(pageRange, totalPages);

            if (pageIndices.length === 0) {
                setIsProcessing(false);
                return setError('No valid pages found in range.');
            }

            const newPdf = await PDFDocument.create();
            const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);

            copiedPages.forEach((page, i) => {
                newPdf.addPage(page);
                setProgress(((i + 1) / copiedPages.length) * 100);
            });

            const splitPdfBytes = await newPdf.save();
            const blob = new Blob([splitPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setSplitPdfUrl(url);
        } catch (err) {
            console.error(err);
            setError('Something went wrong while splitting the PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPageRange('');
        setSplitPdfUrl(null);
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
                <h1 className="text-4xl font-bold mb-3">Split PDF</h1>
                <p className="text-[#adadad] text-lg">
                    Separate specific pages or split entire PDF files into multiple documents effortlessly.
                </p>
            </div>

            {/* Upload Area */}
            {!splitPdfUrl && (
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
                            <p className="text-sm text-[#adadad]">Select the file you want to split</p>
                        </div>
                        <input
                            type="file"
                            id="pdfUpload"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {/* Page range input */}
                    <div className="mt-6">
                        <label htmlFor="pageRange" className="block mb-2 text-left font-medium text-[#FFFCF2]">
                            Enter page range to split (e.g. 1-3, 5):
                        </label>
                        <input
                            type="text"
                            id="pageRange"
                            value={pageRange}
                            onChange={(e) => setPageRange(e.target.value)}
                            placeholder="e.g. 1-3, 5"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    <button
                        className={`mt-8 font-semibold py-3 px-8 rounded-xl transition-all ${file && pageRange ? 'bg-[#EB5E28] text-white hover:bg-[#d44f1e]' : 'bbg-[#EB5E28] text-white opacity-50 cursor-not-allowed'
                            }`}
                        onClick={handleSplit}
                        disabled={!file || !pageRange}
                    >
                        Split PDF
                    </button>
                </div>
            )}

            {/* Progress */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Splitting in progress...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download Area */}
            {splitPdfUrl && (
                <div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg"
                >
                    <h3 className="text-2xl font-bold mb-2">Your split file is ready</h3>
                    <p className="text-[#adadad] mb-6">Click below to download the extracted PDF pages.</p>

                    <a
                        href={splitPdfUrl}
                        download="split.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download Split PDF
                    </a>

                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Split Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}