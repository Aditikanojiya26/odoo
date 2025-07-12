// src/components/Navbar.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

gsap.registerPlugin(useGSAP); 

const Navbar = () => {
  const navRef = useRef();

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []); // run once on mount

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Workflow", path: "/workflow" },
    { name: "Pricing", path: "/pricing" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 py-3 text-black font-[Poppins] text-[18px] shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <NavLink to="/" className="hover:text-red-500 transition">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-semibold">VirtualR</span>
        </div>
        </NavLink>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-8 bg-white/10 px-6 py-2 rounded-full shadow-md">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-semibold"
                    : "hover:text-red-500 transition"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden lg:flex gap-4">
          <NavLink
            to="/signin"
            className=" px-4 py-2 border rounded-full hover:bg-white hover:text-black transition"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="text-white px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full hover:brightness-110 transition"
          >
            Create Account
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
