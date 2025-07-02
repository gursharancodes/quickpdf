import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Don't import Router here
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import ToolsPage from './pages/ToolsPage';

import CompressPDF from './pages/CompressPDF';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import PDFToImage from './pages/ToImage';
import ImageToPDF from './pages/ToPDF';
import AddWatermark from './pages/Watermark';
import RemovePages from './pages/RemovePages';
import AddPages from './pages/AddPages';
import SignPDF from './pages/SignPDF';

import ContactPage from './pages/ContactPage';  
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ToolsPage />} />

        <Route path="/tools/compress" element={<CompressPDF />} />
        <Route path="/tools/merge" element={<MergePDF />} />
        <Route path="/tools/split" element={<SplitPDF />} />
        <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
        <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
        <Route path="/tools/add-watermark" element={<AddWatermark />} />
        <Route path="/tools/remove-pages" element={<RemovePages />} />
        <Route path="/tools/add-pages" element={<AddPages />} />
        <Route path="/tools/sign-pdf" element={<SignPDF />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-services" element={<TermsOfUse />} />
        <Route path="/contact" element={<ContactPage />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
