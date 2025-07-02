import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function AddPages() {
    const [mainPDF, setMainPDF] = useState(null);
    const [insertPDF, setInsertPDF] = useState(null);
    const [insertIndex, setInsertIndex] = useState('');
    const [outputUrl, setOutputUrl] = useState(null);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleMainPDFChange = (e) => {
        setMainPDF(e.target.files[0]);
        setOutputUrl(null);
        setError('');
    };

    const handleInsertPDFChange = (e) => {
        setInsertPDF(e.target.files[0]);
        setOutputUrl(null);
        setError('');
    };

    const handleInsert = async () => {
        if (!mainPDF || !insertPDF || insertIndex === '') {
            setError('Please upload both PDFs and enter insert index.');
            return;
        }

        setIsProcessing(true);
        setProgress(10);
        setError('');

        try {
            const [mainBytes, insertBytes] = await Promise.all([
                mainPDF.arrayBuffer(),
                insertPDF.arrayBuffer(),
            ]);

            const mainDoc = await PDFDocument.load(mainBytes);
            const insertDoc = await PDFDocument.load(insertBytes);

            const totalPages = mainDoc.getPageCount();
            const index = parseInt(insertIndex, 10);

            if (isNaN(index) || index < 0 || index > totalPages) {
                setError(`Insert index must be between 0 and ${totalPages}`);
                setIsProcessing(false);
                return;
            }

            const insertPages = await mainDoc.copyPages(
                insertDoc,
                insertDoc.getPageIndices()
            );

            insertPages.forEach((page, i) => {
                mainDoc.insertPage(index + i, page);
            });

            setProgress(80);

            const mergedBytes = await mainDoc.save();
            const blob = new Blob([mergedBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            setOutputUrl(url);
            setProgress(100);
        } catch (err) {
            console.error('Error inserting pages:', err);
            setError('Failed to insert pages. Make sure the files are valid PDFs.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setMainPDF(null);
        setInsertPDF(null);
        setInsertIndex('');
        setOutputUrl(null);
        setError('');
        setProgress(0);
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Add Pages to PDF</h1>
                <p className="text-[#adadad] text-lg">
                    Upload your PDF and insert pages from another file at a specific position.
                </p>
            </div>

            {!outputUrl && (
                <div className="space-y-6">
                    {/* Main PDF Upload */}
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 text-2xl font-semibold">Upload Main PDF</p>
                        <input type="file" accept="application/pdf" onChange={handleMainPDFChange} className="text-white bg-gray-900 border w-full border-gray-700 rounded-2xl p-3 md:p-4" />
                    </div>

                    {/* Insert PDF Upload */}
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 text-2xl font-semibold">Upload Pages to Insert</p>
                        <input type="file" accept="application/pdf" onChange={handleInsertPDFChange} className="text-white bg-gray-900 border w-full border-gray-700 rounded-2xl p-3 md:p-4" />
                    </div>

                    {/* Insert Index */}
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 text-xl font-semibold">Insert After Page Number (0 = start, 1 = end)</p>
                        <input
                            type="number"
                            value={insertIndex}
                            onChange={(e) => setInsertIndex(e.target.value)}
                            className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-900 text-white"
                            placeholder="Enter index (e.g., 1)"
                        />
                    </div>

                    <button
                        onClick={handleInsert}
                        className="mt-6 w-full bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Insert Pages'}
                    </button>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Merging PDFs...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Output Download */}
            {outputUrl && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">PDF Updated Successfully</h3>
                    <p className="text-[#adadad] mb-6">Click below to download the updated file.</p>
                    <a
                        href={outputUrl}
                        download="updated.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download PDF
                    </a>
                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Add Pages to Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}
