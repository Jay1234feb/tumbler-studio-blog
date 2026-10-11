import React, { useState } from 'react';
import { Mail, Check, BookOpen, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F2ECE1] border-t border-[#E5DFD3] text-[#474B43] mt-24">
      {/* Blog editorial banner */}
      <div className="border-b border-[#E5DFD3]/80 bg-[#FAF8F5]/70 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#3E4C3D] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2C2E2B]">Independent Drinkware Guides</h4>
              <p className="text-xs text-[#6C7069]">Evidence-based guides on materials, vacuum physics & care</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FAF0EC] flex items-center justify-center text-[#C86D51] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2C2E2B]">Hygiene & Sanitization</h4>
              <p className="text-xs text-[#6C7069]">Step-by-step methods to clean silicone gaskets & straws</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#3E4C3D] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2C2E2B]">Sustainable Daily Living</h4>
              <p className="text-xs text-[#6C7069]">Reducing disposable single-use plastic waste responsibly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#8F9E8B] flex items-center justify-center text-white text-xs font-semibold">
                TS
              </span>
              <span className="text-lg font-bold tracking-tight text-[#2C2E2B] font-display">
                Tumbler Studio
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6C7069] max-w-sm">
              Tumbler Studio is an educational publication dedicated to the art and science of reusable drinkware. We demystify double-wall vacuum thermodynamics, compare food-grade materials, and share actionable cleaning protocols for daily hydration enthusiasts.
            </p>
            <div className="text-xs text-[#6C7069]">
              <span>Curated in pastel sage green, warm cream, and terracotta tones.</span>
            </div>
          </div>

          {/* Core Blog Articles */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
              Comprehensive Blog Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/articles/best-reusable-tumblers/"
                  onClick={(e) => handleLink(e, '/articles/best-reusable-tumblers/')}
                  className="hover:text-[#2C2E2B] transition-colors block"
                >
                  Best Reusable Tumblers Guide
                </a>
              </li>
              <li>
                <a
                  href="/articles/insulated-tumblers/"
                  onClick={(e) => handleLink(e, '/articles/insulated-tumblers/')}
                  className="hover:text-[#2C2E2B] transition-colors block"
                >
                  Insulated Tumblers & Thermal Physics
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-to-clean-a-tumbler/"
                  onClick={(e) => handleLink(e, '/articles/how-to-clean-a-tumbler/')}
                  className="hover:text-[#2C2E2B] transition-colors block"
                >
                  How to Deep Clean a Tumbler & Gasket
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-xs text-[#8F9E8B] font-semibold mt-1"
                >
                  ← Return to Blog Homepage
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Readers dispatch */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
              Drinkware Dispatch
            </h4>
            <p className="text-xs text-[#6C7069] leading-relaxed">
              Receive new material evaluations, temperature retention studies, and maintenance guides.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#EBF0EA] border border-[#D7E2D5] rounded-lg text-xs font-medium text-[#3E4C3D]">
                <Check className="w-4 h-4 text-[#3E4C3D]" />
                <span>Thank you for subscribing to Tumbler Studio.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#989D94] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reader@example.com"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D7D2C7] rounded-lg text-[#2C2E2B] placeholder-[#989D94] focus:outline-none focus:ring-1 focus:ring-[#8F9E8B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#C86D51] hover:bg-[#B1583D] rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-[#868A81]">Educational content only. Zero spam.</p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B8077] gap-3">
          <p>© 2026 Tumbler Studio — The Tumbler & Drinkware Blog. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Material Science</span>
            <span aria-hidden="true">·</span>
            <span>Thermal Insulation</span>
            <span aria-hidden="true">·</span>
            <span>Drinkware Sanitization</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
