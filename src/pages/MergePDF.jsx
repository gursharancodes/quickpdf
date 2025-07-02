import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePDF() {
    const [files, setFiles] = useState([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        handleNewFiles(selectedFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type === 'application/pdf');
        handleNewFiles(droppedFiles);
    };

    const handleNewFiles = (incomingFiles) => {
        setError('');
        setFiles(incomingFiles);
        if (incomingFiles.length < 2) {
            setError('Please select at least two PDF files to merge.');
            return;
        }
        mergePdfs(incomingFiles);
    };

    const mergePdfs = async (pdfFiles) => {
        setIsProcessing(true);
        setProgress(0);
        setMergedPdfUrl(null);

        const mergedPdf = await PDFDocument.create();
        const progressStep = 100 / pdfFiles.length;

        for (let i = 0; i < pdfFiles.length; i++) {
            const arrayBuffer = await pdfFiles[i].arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach((page) => mergedPdf.addPage(page));
            setProgress((prev) => Math.min(prev + progressStep, 100));
        }

        const mergedBytes = await mergedPdf.save();
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setMergedPdfUrl(url);

        setIsProcessing(false);
    };

    const handleMergeMore = () => {
        setFiles([]);
        setMergedPdfUrl(null);
        setProgress(0);
        setIsProcessing(false);
        setError('');
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            {/* Radial Background */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]"></div>

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Merge PDF Files</h1>
                <p className="text-[#adadad] text-lg">
                    Combine multiple PDF files into one seamless document. Secure, quick, and entirely free.
                </p>
            </div>

            {/* Upload Area */}
            {!isProcessing && !mergedPdfUrl && (
                <div
                    className={`bg-gray-800 border-2 rounded-2xl p-8 text-center shadow-xl transition-all ${dragOver ? 'border-[#EB5E28] bg-gray-700' : 'border-gray-700 hover:border-[#EB5E28]'
                        }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    <label
                        htmlFor="pdfUpload"
                        className="block w-full border-2 border-dashed border-gray-600 rounded-xl py-12 px-4 cursor-pointer hover:border-[#EB5E28] transition"
                    >
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img src="/icons/tools/upload.png" alt="Upload" className="h-10 opacity-80" />
                            <p className="text-lg font-semibold">
                                {files.length > 0
                                    ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                                    : 'Click or drag to upload PDF files'}
                            </p>
                            <p className="text-sm text-[#adadad]">Supports multiple files · Max size: 20MB each</p>
                        </div>
                        <input
                            type="file"
                            id="pdfUpload"
                            accept=".pdf"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    {/* File preview */}
                    {files.length > 0 && (
                        <ul className="text-left mt-4 text-sm text-[#adadad] max-h-40 overflow-y-auto">
                            {files.map((file, i) => (
                                <li key={i} className="mb-1">
                                    • {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </li>
                            ))}
                        </ul>
                    )}

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    <button
                        className={`mt-8 font-semibold py-3 px-8 rounded-xl transition-all ${files.length >= 2
                                ? 'bg-[#EB5E28] text-white hover:bg-[#d44f1e]'
                                : 'bg-[#EB5E28] text-white opacity-50 cursor-not-allowed'
                            }`}
                        onClick={() => mergePdfs(files)}
                        disabled={files.length < 2}
                    >
                        Merge PDFs
                    </button>
                </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
                <div className="mt-8 text-center">
                    <p className="text-lg mb-2">Merging in progress...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Download Area */}
            {mergedPdfUrl && (
                <div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg"
                >
                    <h3 className="text-2xl font-bold mb-2">Your merged file is ready</h3>
                    <p className="text-[#adadad] mb-6">Click below to download your final PDF.</p>

                    <a
                        href={mergedPdfUrl}
                        download="merged.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download Merged PDF
                    </a>

                    <button
                        onClick={handleMergeMore}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2"
                    >
                        Merge More Files
                    </button>
                </div>
            )}
        </section>
    );
}