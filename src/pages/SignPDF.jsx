import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SignPDF() {
    const [pdfFile, setPdfFile] = useState(null);
    const [signatureImage, setSignatureImage] = useState(null);
    const [pageNum, setPageNum] = useState('');
    const [signedPdfUrl, setSignedPdfUrl] = useState(null);
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePDFChange = (e) => {
        setPdfFile(e.target.files[0]);
        setSignedPdfUrl(null);
    };

    const handleImageChange = (e) => {
        setSignatureImage(e.target.files[0]);
    };

    const handleSignPDF = async () => {
        if (!pdfFile || !signatureImage || !pageNum) {
            setError('Please select a PDF, signature image, and page number.');
            return;
        }

        setIsProcessing(true);
        setError('');

        try {
            const [pdfBytes, imgBytes] = await Promise.all([
                pdfFile.arrayBuffer(),
                signatureImage.arrayBuffer(),
            ]);

            const pdfDoc = await PDFDocument.load(pdfBytes);
            const img = await pdfDoc.embedPng(imgBytes);
            const pages = pdfDoc.getPages();

            const pageIndex = parseInt(pageNum) - 1;
            if (pageIndex >= pages.length || pageIndex < 0) {
                setError(`Invalid page number. PDF has ${pages.length} pages.`);
                setIsProcessing(false);
                return;
            }

            const page = pages[pageIndex];
            const { width: imgWidth, height: imgHeight } = img.scale(0.3);
            const marginX = 50;
            const marginY = 50;

            page.drawImage(img, {
                x: marginX,
                y: marginY,
                width: imgWidth,
                height: imgHeight,
            });

            const pdfBytesSigned = await pdfDoc.save();
            const blob = new Blob([pdfBytesSigned], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setSignedPdfUrl(url);
        } catch (err) {
            console.error('Error signing PDF:', err);
            setError('Failed to sign PDF. Ensure the files are valid.');
        } finally {
            setIsProcessing(false);
        }
    };

    const resetForm = () => {
        setPdfFile(null);
        setSignatureImage(null);
        setPageNum('');
        setSignedPdfUrl(null);
        setError('');
    };

    return (
        <section className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto text-[#FFFCF2] mt-20">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[100px] h-[100px] lg:w-[400px] lg:h-[400px] rounded-full bg-[radial-gradient(circle,_#EB5E28,_transparent)] blur-3xl opacity-20 pointer-events-none z-[-1]" />

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3">Sign PDF</h1>
                <p className="text-[#adadad] text-lg">
                    Automatically place your signature at the bottom-left of any page.
                </p>
            </div>

            {!signedPdfUrl && (
                <div className="space-y-6">
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 text-xl font-semibold">Upload PDF File</p>
                        <input type="file" accept="application/pdf" onChange={handlePDFChange} className="text-white bg-gray-900 border w-full border-gray-700 rounded-2xl p-3 md:p-4" />
                    </div>

                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-6 text-center shadow-xl hover:border-[#EB5E28] transition-all">
                        <p className="mb-4 text-xl font-semibold">Upload Signature Image (PNG or JPG)</p>
                        <input type="file" accept="image/png,image/jpeg" onChange={handleImageChange} className="text-white bg-gray-900 border w-full border-gray-700 rounded-2xl p-3 md:p-4" />
                    </div>

                    <input
                        type="number"
                        placeholder="Page number to sign"
                        className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700"
                        value={pageNum}
                        onChange={(e) => setPageNum(e.target.value)}
                    />

                    <button
                        onClick={handleSignPDF}
                        className="w-full bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition cursor-pointer"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Signing...' : 'Add Signature'}
                    </button>

                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                </div>
            )}

            {signedPdfUrl && (
                <div className="mt-16 bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">PDF Signed Successfully</h3>
                    <p className="text-[#adadad] mb-6">Click below to download the signed PDF.</p>

                    <a
                        href={signedPdfUrl}
                        download="signed.pdf"
                        className="inline-block bg-[#EB5E28] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d44f1e] transition mb-4"
                    >
                        Download Signed PDF
                    </a>

                    <button
                        onClick={resetForm}
                        className="block mx-auto bg-[#d44f1e] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#d94414] transition mt-2 cursor-pointer"
                    >
                        Sign Another PDF
                    </button>
                </div>
            )}
        </section>
    );
}
