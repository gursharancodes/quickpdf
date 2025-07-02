import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 <img src="icons/navbar/icon1.png" alt="" className='inline h-5'/> QuickPDF. &nbsp;All rights reserved.</p>
                <p>
                    <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link> |
                    <Link to="/terms-of-services" className="hover:text-gray-400"> Terms of Service</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
