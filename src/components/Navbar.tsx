import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Normalize path for active comparisons (handles trailing slash)
  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Best Reusable Tumblers', path: '/articles/best-reusable-tumblers/' },
    { label: 'Insulated Tumblers', path: '/articles/insulated-tumblers/' },
    { label: 'How to Clean a Tumbler', path: '/articles/how-to-clean-a-tumbler/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Blog header notice */}
      <div className="bg-[#EBF0EA] border-b border-[#D7E2D5] px-4 py-1.5 text-center text-xs font-medium text-[#3E4C3D] flex items-center justify-center gap-2">
        <span>Tumbler Studio · The Reusable Drinkware & Hydration Blog</span>
        <span aria-hidden="true">·</span>
        <span className="hidden sm:inline text-[#647863]">In-depth guides on materials, thermal insulation & care</span>
      </div>

      {/* Main Blog Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#2C2E2B] whitespace-nowrap shrink-0 hover:text-[#8F9E8B] transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-[#8F9E8B] flex items-center justify-center text-white text-xs font-semibold shadow-xs">
              TS
            </span>
            <div className="flex flex-col">
              <span className="font-display leading-tight">Tumbler Studio</span>
              <span className="text-[10px] tracking-wider uppercase text-[#868C81] font-normal">
                Drinkware & Tumbler Blog
              </span>
            </div>
          </a>

          {/* 4 Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#555A52]">
            {navLinks.map((link) => {
              const isActive =
                normalize(currentPath) === normalize(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#2C2E2B] ${
                    isActive ? 'text-[#2C2E2B] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C86D51] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Reading Hub quick button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/articles/best-reusable-tumblers/"
              onClick={(e) => handleLinkClick(e, '/articles/best-reusable-tumblers/')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3E4C3D] bg-[#EBF0EA] hover:bg-[#DDE6DC] rounded-full transition-colors border border-[#D5E2D3] cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8F9E8B]" />
              <span>Explore Guides</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#555A52] hover:text-[#2C2E2B] hover:bg-[#F2ECE1] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D5] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive =
                normalize(currentPath) === normalize(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EBF0EA] text-[#3E4C3D] font-semibold'
                      : 'text-[#555A52] hover:bg-[#F2ECE1] hover:text-[#2C2E2B]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
