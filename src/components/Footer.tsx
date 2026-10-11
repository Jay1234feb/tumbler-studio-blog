import React, { useState } from 'react';
import { Mail, Check, BookOpen, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/articles';

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
              <h4 className="text-sm font-semibold text-[#2C2E2B]">10 In-Depth Research Guides</h4>
              <p className="text-xs text-[#6C7069]">Evidence-based drinkware guides on materials, physics & care</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#FAF0EC] flex items-center justify-center text-[#C86D51] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2C2E2B]">Hygiene & Sanitization</h4>
              <p className="text-xs text-[#6C7069]">Step-by-step methods to clean silicone gaskets, straws & lids</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#3E4C3D] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2C2E2B]">Sustainable Daily Living</h4>
              <p className="text-xs text-[#6C7069]">Empowering daily reduction of single-use disposable plastics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand bio */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#8F9E8B] flex items-center justify-center text-white text-xs font-semibold shadow-xs">
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

            {/* Newsletter */}
            <div className="pt-2 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
                Drinkware Dispatch
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-[#EBF0EA] border border-[#D7E2D5] rounded-lg text-xs font-medium text-[#3E4C3D]">
                  <Check className="w-4 h-4 text-[#3E4C3D]" />
                  <span>Subscribed to Tumbler Studio Dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-3.5 h-3.5 text-[#989D94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reader@example.com"
                      required
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-[#FAF8F5] border border-[#D7D2C7] rounded-lg text-[#2C2E2B] placeholder-[#989D94] focus:outline-none focus:ring-1 focus:ring-[#8F9E8B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C86D51] hover:bg-[#B1583D] rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Section 1: Materials & Buying Guides */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
              Buying & Material Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/articles/best-reusable-tumblers/"
                  onClick={(e) => handleLink(e, '/articles/best-reusable-tumblers/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  01. Best Reusable Tumblers Guide
                </a>
              </li>
              <li>
                <a
                  href="/articles/stainless-steel-vs-plastic-tumblers/"
                  onClick={(e) => handleLink(e, '/articles/stainless-steel-vs-plastic-tumblers/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  02. Stainless Steel vs. Plastic Tumblers
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-to-choose-the-right-tumbler-size/"
                  onClick={(e) => handleLink(e, '/articles/how-to-choose-the-right-tumbler-size/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  03. How to Choose the Right Tumbler Size
                </a>
              </li>
              <li>
                <a
                  href="/articles/are-reusable-tumblers-eco-friendly/"
                  onClick={(e) => handleLink(e, '/articles/are-reusable-tumblers-eco-friendly/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  04. Are Reusable Tumblers Really Eco-Friendly?
                </a>
              </li>
              <li>
                <a
                  href="/articles/tumbler-lid-and-straw-types-explained/"
                  onClick={(e) => handleLink(e, '/articles/tumbler-lid-and-straw-types-explained/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  05. Tumbler Lid and Straw Types Explained
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2: Thermal Science & Care Guides */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
              Thermal Science & Care Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/articles/insulated-tumblers/"
                  onClick={(e) => handleLink(e, '/articles/insulated-tumblers/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  06. Insulated Tumblers & Thermal Physics
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-long-do-insulated-tumblers-keep-drinks-cold/"
                  onClick={(e) => handleLink(e, '/articles/how-long-do-insulated-tumblers-keep-drinks-cold/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  07. How Long Do Tumblers Keep Drinks Cold?
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-to-clean-a-tumbler/"
                  onClick={(e) => handleLink(e, '/articles/how-to-clean-a-tumbler/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  08. How to Clean a Tumbler (Daily & Deep)
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-to-remove-smells-from-a-tumbler/"
                  onClick={(e) => handleLink(e, '/articles/how-to-remove-smells-from-a-tumbler/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  09. How to Remove Smells from a Tumbler
                </a>
              </li>
              <li>
                <a
                  href="/articles/how-to-prevent-tumbler-leaks-and-spills/"
                  onClick={(e) => handleLink(e, '/articles/how-to-prevent-tumbler-leaks-and-spills/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#555A52]"
                >
                  10. How to Prevent Tumbler Leaks and Spills
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="hover:text-[#2C2E2B] transition-colors block text-[#8F9E8B] font-semibold pt-1"
                >
                  ← Return to Blog Homepage
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#E5DFD3] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B8077] gap-3">
          <p>© 2026 Tumbler Studio — The Tumbler & Drinkware Blog. All 10 Guides Published.</p>
          <div className="flex items-center gap-3">
            <span>Food-Grade 18/8 Steel</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Micron Vacuum Insulation</span>
            <span aria-hidden="true">·</span>
            <span>Zero Microplastics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
