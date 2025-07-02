import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  const closeMenu = () => {
    setIsMobileNavOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between bg-black items-center px-6 py-5 md:py-6 md:px-10 text-[#FFFCF2] border-b border-gray-800">
      {/* Logo */}
      <div className="flex gap-2 items-center logo">
        <img src="/icons/navbar/icon1.png" alt="PDF Logo" className="h-7 md:h-8" />
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-xl md:text-2xl font-bold text-[#FFFCF2]">
            QuickPDF
          </h1>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div>
        <img
          src="/icons/navbar/menu.png"
          alt="Open menu"
          onClick={toggleMobileNav}
          className="h-5 md:hidden cursor-pointer"
          aria-label="Open menu"
          role="button"
        />
      </div>

      {/* Mobile Nav Links */}
      <ul className={`fixed top-0 right-0 h-full w-full p-10 pt-20 text-center bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileNavOpen ? "translate-x-0" : "translate-x-full"}`}>
        <img
          src="/icons/navbar/close.png"
          alt="Close menu"
          onClick={toggleMobileNav}
          className="h-4 absolute top-7 right-7 cursor-pointer"
        />
        <li className="py-5">
          <Link to="/" onClick={closeMenu} className="hover:text-[#ff5816]">Home</Link>
        </li>
        <li className="py-5">
          <Link to="/contact" onClick={closeMenu} className="hover:text-[#ff5816]">Contact</Link>
        </li>
        <li className="py-5">
          <Link to="/tools" onClick={closeMenu} className="border-2 border-[#EB5E28] bg-[#EB5E28] hover:bg-[#ff5816] px-6 py-1.5 rounded-full text-[#FFFCF2] font-semibold">
            Tools
          </Link>
        </li>
      </ul>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-8">
        <li>
          <Link to="/" className="hover:text-[#ff5816]">Home</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-[#ff5816]">Contact</Link>
        </li>
        <li>
          <Link to="/tools" className="border-2 border-[#EB5E28] bg-[#EB5E28] hover:bg-[#ff5816] px-6 py-1.5 rounded-full text-[#FFFCF2] font-semibold">
            Tools
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
