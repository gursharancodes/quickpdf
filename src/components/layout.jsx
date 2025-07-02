import React from 'react'
import Navbar from './navbar.jsx'
import Footer from './footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet /> {/* 👈 This will render the page content */}
            </main>
            <Footer />
        </>
    )
}