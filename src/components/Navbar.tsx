import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [articlesDropdownOpen, setArticlesDropdownOpen] = useState(false);

  // Normalize path for active comparisons (handles trailing slash)
  const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

  const mainNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Best Reusable Tumblers', path: '/articles/best-reusable-tumblers/' },
    { label: 'Insulated Tumblers', path: '/articles/insulated-tumblers/' },
    { label: 'How to Clean a Tumbler', path: '/articles/how-to-clean-a-tumbler/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    setArticlesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Blog header notice */}
      <div className="bg-[#EBF0EA] border-b border-[#D7E2D5] px-4 py-1.5 text-center text-xs font-medium text-[#3E4C3D] flex items-center justify-center gap-2">
        <span>Tumbler Studio · The Reusable Drinkware & Hydration Blog</span>
        <span aria-hidden="true">·</span>
        <span className="hidden sm:inline text-[#647863]">10 Comprehensive guides on materials, thermal insulation & care</span>
      </div>

      {/* Main Blog Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
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

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#555A52]">
            {mainNavLinks.map((link) => {
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

            {/* All 10 Guides Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setArticlesDropdownOpen(!articlesDropdownOpen)}
                className="flex items-center gap-1 py-1 text-sm font-medium text-[#555A52] hover:text-[#2C2E2B] cursor-pointer transition-colors"
                aria-expanded={articlesDropdownOpen}
              >
                <span>All 10 Guides</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${articlesDropdownOpen ? 'rotate-180 text-[#C86D51]' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {articlesDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-80 bg-white border border-[#E8E2D5] rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setArticlesDropdownOpen(false)}
                >
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8F9E8B] border-b border-[#F2ECE1]">
                    Complete Hydration Library (10 Guides)
                  </div>
                  <div className="max-h-96 overflow-y-auto py-1 divide-y divide-[#FAF8F5]">
                    {ARTICLES.map((art, idx) => (
                      <a
                        key={art.slug}
                        href={art.url}
                        onClick={(e) => handleLinkClick(e, art.url)}
                        className={`block px-3.5 py-2 text-xs transition-colors hover:bg-[#F4F0E8] ${
                          normalize(currentPath) === normalize(art.url)
                            ? 'bg-[#EBF0EA] font-semibold text-[#3E4C3D]'
                            : 'text-[#3D4039]'
                        }`}
                      >
                        <span className="font-mono text-[#8F9E8B] mr-1.5 text-[10px]">{String(idx + 1).padStart(2, '0')}.</span>
                        <span>{art.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Reading Hub quick button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/#all-guides"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/#all-guides');
                const el = document.getElementById('all-guides');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onNavigate('/');
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3E4C3D] bg-[#EBF0EA] hover:bg-[#DDE6DC] rounded-full transition-colors border border-[#D5E2D3] cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8F9E8B]" />
              <span>Browse 10 Articles</span>
            </a>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#555A52] hover:text-[#2C2E2B] hover:bg-[#F2ECE1] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown with all 10 articles */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D5] px-4 pt-3 pb-5 space-y-2 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8F9E8B]">
              Quick Links
            </div>
            {mainNavLinks.map((link) => {
              const isActive =
                normalize(currentPath) === normalize(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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

            <div className="pt-2 border-t border-[#E8E2D5] px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8F9E8B]">
              All 10 Blog Articles
            </div>
            <div className="space-y-1">
              {ARTICLES.map((art, idx) => (
                <a
                  key={art.slug}
                  href={art.url}
                  onClick={(e) => handleLinkClick(e, art.url)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    normalize(currentPath) === normalize(art.url)
                      ? 'bg-[#EBF0EA] text-[#3E4C3D] font-semibold'
                      : 'text-[#555A52] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span className="truncate pr-2">
                    <span className="font-mono text-[#8F9E8B] mr-1">{idx + 1}.</span> {art.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
