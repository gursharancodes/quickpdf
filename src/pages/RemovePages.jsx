import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function RemovePages() {
    const [pdfFile, setPdfFile] = useState(null);
    const [removedPdfUrl, setRemovedPdfUrl] = useState(null);
    const [pageNumbersInput, setPageNumbersInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handlePDFChange = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
        setRemovedPdfUrl(null);
        setPageNumbersInput('');
        setError('');
    };

    const handlePageNumbersChange = (e) => {
        setPageNumbersInput(e.target.value);
    };

    const handleRemovePages = async () => {
        if (!pdfFile) {
            setError('Please upload a PDF file.');
            return;
        }

        // Validate the input page numbers
        const pagesToRemove = pageNumbersInput
            .split(',')
            .map((page) => page.trim())
            .filter((page) => page !== '')
            .map((page) => parseInt(page, 10));

        if (pagesToRemove.some((page) => isNaN(page))) {
            setError('Please enter valid page numbers.');
            return;
        }

        setIsProcessing(true);
        setError('');
        setProgress(10); // start progress

        try {
            const existingPdfBytes = await pdfFile.arrayBuffer();
            setProgress(30); // loading progress
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const totalPages = pdfDoc.getPages().length;

            // Ensure page numbers are within range
            const invalidPages = pagesToRemove.filter((page) => page < 1 || page > totalPages);
            if (invalidPages.length > 0) {
                setError(`Page numbers must be between 1 and ${totalPages}.`);
                return;
            }

            // Remove the selected pages
            const pagesToRemoveSet = new Set(pagesToRemove);
            const remainingPages = pdfDoc.getPages().filter((_, index) => !pagesToRemoveSet.has(index + 1));

            // Create a new PDF with the remaining pages
            const newPdfDoc = await PDFDocument.create();
            setProgress(50); // creating new PDF progress
            for (const page of remainingPages) {
                const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pdfDoc.getPages().indexOf(page)]);
                newPdfDoc.addPage(copiedPage);
            }

            setProgress(70); // copying pages progress
            // Generate the new PDF
            const pdfBytes = await newPdfDoc.save();
            setProgress(90); // saving progress
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setRemovedPdfUrl(url);
            setProgress(100); // completed
        } catch (err) {
            console.error('Error removing pages:', err);
            setError('Something went wrong while removing pages.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setPdfFile(null);
        setPageNumbersInput('');
        setRemovedPdfUrl(null);
        setError('');
        setIsProcessing(false);
        setProgress(0); // reset progress
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Remove Pages from PDF</h1>
                <p className="text-[#adadad] text-lg">Upload your PDF and enter the page numbers to remove.</p>
            </div>

            {!removedPdfUrl && (
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

                    {/* Page Numbers Input */}
                    <div className="mt-10 bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 pt-5 pb-2 font-semibold text-2xl">Enter page numbers to remove (comma-separated)</p>
                        <input
                            type="text"
                            value={pageNumbersInput}
                            onChange={handlePageNumbersChange}
                            className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-900 text-white"
                            placeholder="Example: 1, 2, 5, 7"
                        />
                        <button
                            onClick={handleRemovePages}
                            className="mt-6 mb-3 inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition"
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : 'Remove Pages'}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    </div>
                </div>
            )}

            {/* Progress */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Removing selected pages...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download */}
            {removedPdfUrl && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">PDF without Removed Pages</h3>
                    <p className="text-[#adadad] mb-6">Click below to download your file.</p>
                    <a
                        href={removedPdfUrl}
                        download="modified.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download PDF
                    </a>
                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Remove Pages from Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}
