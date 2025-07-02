import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

export default function PDFToImage() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImages([]);
        setProgress(0);
        setError('');
        if (selectedFile) {
            convertToImages(selectedFile);
        }
    };

    const convertToImages = async (selectedFile) => {
        if (!selectedFile || selectedFile.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        if (selectedFile.size > 20 * 1024 * 1024) {
            setError('File too large. Max allowed size is 20MB.');
            return;
        }

        setIsProcessing(true);
        setProgress(10);

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            setProgress(30);

            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const totalPages = pdf.numPages;
            setProgress(50);

            const pageImages = [];
            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 2 });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;

                pageImages.push(canvas.toDataURL());
                setProgress(50 + Math.round((pageNum / totalPages) * 40)); // smooth progress
            }

            setImages(pageImages);
            setProgress(100);
        } catch (err) {
            console.error('Conversion error:', err);
            setError('Failed to convert PDF. Make sure the file is not encrypted or corrupted.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setImages([]);
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
                <h1 className="text-4xl font-bold mb-3">PDF to Image</h1>
                <p className="text-[#adadad] text-lg">
                    Convert every page of your PDF into high-quality images.
                </p>
            </div>

            {/* Upload Area */}
            {!images.length && (
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
                    <p className="text-lg mb-2">Converting your PDF to images...</p>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-[#EB5E28] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Image Results */}
            {images.length > 0 && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">Your Images Are Ready</h3>
                    <p className="text-[#adadad] mb-6">Right-click on any image to save it, or screenshot them.</p>

                    <div className="grid sm:grid-cols-2 gap-2 mt-8">
                        {images.map((img, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-xl overflow-hidden shadow p-4 flex flex-col items-center">
                                <img src={img} alt={`Page ${idx + 1}`} className="w-full mb-2 rounded" />
                                <p className="text-sm text-[#adadad] mb-2">Page {idx + 1}</p>
                                <a
                                    href={img}
                                    download={`page-${idx + 1}.png`}
                                    className="inline-block bg-[#EB5E28] text-white text-sm font-semibold rounded-lg py-1.5 px-4 hover:bg-[#d44f1e] transition"
                                >
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>


                    <button
                        onClick={handleReset}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-10 cursor-pointer"
                    >
                        Convert Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}
