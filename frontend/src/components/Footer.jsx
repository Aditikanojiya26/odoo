const Footer = () => {
  return (
    <footer className=" py-3 backdrop-blur-md bg-white/5 border-t border-neutral-700/50 font-[Poppins] text-[16px]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6 ">
        
        {/* Left: Brand */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold tracking-tight">VirtualR</h1>
          <p className="text-sm text-black">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>

        {/* Middle: Links */}
        <ul className="flex flex-wrap justify-center gap-8 bg-white/10 shadow-md px-6 py-3 rounded-full text-sm">
          <li><a href="/features" className="hover:text-red-400 transition">Features</a></li>
          <li><a href="/pricing" className="hover:text-red-400 transition">Pricing</a></li>
          <li><a href="/terms" className="hover:text-red-400 transition">Terms</a></li>
          <li><a href="/privacy" className="hover:text-red-400 transition">Privacy</a></li>
          <li><a href="/contact" className="hover:text-red-400 transition">Contact</a></li>
        </ul>

        {/* Right: Credits */}
        <div className="text-sm text-center lg:text-right text-black">
          <p>Built with ❤️ by the VirtualR Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
