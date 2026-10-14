import React, { useState } from 'react';
import { ARTICLES } from '../data/articles';
import {
  ArrowRight,
  BookOpen,
  ThermometerSnowflake,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  Filter
} from 'lucide-react';
import heroSageImg from '../assets/images/IMG_0649.JPG';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'buying' | 'thermal' | 'care'>('all');

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter 10 articles into categories
  const filteredArticles = ARTICLES.filter((art) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'buying') {
      return [
        'best-reusable-tumblers',
        'stainless-steel-vs-plastic-tumblers',
        'how-to-choose-the-right-tumbler-size',
        'are-reusable-tumblers-eco-friendly'
      ].includes(art.slug);
    }
    if (filterCategory === 'thermal') {
      return [
        'insulated-tumblers',
        'how-long-do-insulated-tumblers-keep-drinks-cold',
        'tumbler-lid-and-straw-types-explained'
      ].includes(art.slug);
    }
    if (filterCategory === 'care') {
      return [
        'how-to-clean-a-tumbler',
        'how-to-remove-smells-from-a-tumbler',
        'how-to-prevent-tumbler-leaks-and-spills'
      ].includes(art.slug);
    }
    return true;
  });

  // Spotlight 3 articles for top featured section
  const spotlightArticles = ARTICLES.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section: Introducing the Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
              <Compass className="w-3.5 h-3.5 text-[#C86D51]" />
              <span>The Independent Drinkware Publication · 10 Guides Published</span>
            </div>

            {/* Exactly ONE H1 on the homepage */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C2E2B] font-display leading-[1.15] text-balance">
              The Modern Guide to Reusable Tumblers, Thermal Physics, and Care
            </h1>

            <p className="text-base sm:text-lg text-[#555A52] leading-relaxed max-w-2xl text-pretty">
              Welcome to Tumbler Studio — an informative drinkware blog exploring the science of double-wall vacuum insulation, food-grade materials, leakproof lid engineering, and practical sanitization protocols across 10 in-depth articles.
            </p>

            {/* Core editorial topics */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-[#4B5047] pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8F9E8B]" />
                <span>Material Science & Ergonomics</span>
              </div>
              <span aria-hidden="true" className="text-[#D0C7B7]">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8F9E8B]" />
                <span>Vacuum Chamber Physics</span>
              </div>
              <span aria-hidden="true" className="text-[#D0C7B7]">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8F9E8B]" />
                <span>Gasket Sanitization Methods</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#all-guides"
                className="px-6 py-3.5 bg-[#C86D51] hover:bg-[#B1583D] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All 10 Guides</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/articles/best-reusable-tumblers/"
                onClick={(e) => handleLink(e, '/articles/best-reusable-tumblers/')}
                className="px-5 py-3.5 bg-white hover:bg-[#F4F0E8] text-[#2C2E2B] text-xs font-semibold rounded-xl border border-[#D9D2C5] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start with Buyer's Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8F9E8B]" />
              </a>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#F4F0E8] border border-[#E8E2D5] shadow-lg group">
              <img
                src={heroSageImg}
                alt="Matte olive-green reusable travel tumbler with textured grip band resting on a wooden cafe table"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] lg:aspect-[16/12] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E2D5] text-xs text-[#555A52] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#2C2E2B]">Featured Study:</span> Daily Reusable Drinkware
                </div>
                <div className="text-[11px] text-[#8F9E8B] font-medium">
                  Olive Green & Natural Wood
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short Introduction to Reusable Tumblers and Drinkware */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F2ECE1] border border-[#E5DFD3] rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
              The Hydration Imperative
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E2B] font-display">
              Why Reusable Drinkware Has Become Essential
            </h2>
            <p className="text-sm sm:text-base text-[#555A52] leading-relaxed">
              Every day, hundreds of millions of disposable coffee cups and single-use plastic bottles are discarded into landfills and waterways. Because disposable paper cups are lined with bonded polyethylene plastic to prevent liquid leakage, the vast majority cannot be recycled through standard municipal facilities.
            </p>
            <p className="text-sm sm:text-base text-[#555A52] leading-relaxed">
              Switching to a durable reusable tumbler addresses this crisis at the root. Engineered from food-grade stainless steel or ceramic-lined alloys, a quality tumbler preserves beverage temperature for 12 to 24 hours, eliminates morning coffee spills in commuter bags, and spares our ecosystems thousands of single-use containers over its lifespan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#DFD8CB]">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF0EA] flex items-center justify-center text-[#3E4C3D] mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Non-Toxic Materials</h3>
              <p className="text-xs text-[#6C7069] leading-relaxed">
                Free from BPA, phthalates, and plastic leaching when handling boiling hot or acidic drinks.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF0EC] flex items-center justify-center text-[#C86D51] mb-2">
                <ThermometerSnowflake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Temperature Precision</h3>
              <p className="text-xs text-[#6C7069] leading-relaxed">
                Retaining iced cold brew below 45°F or pour-over coffee above 140°F through entire workdays.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#EBF0EA] flex items-center justify-center text-[#3E4C3D] mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Daily Sustainability</h3>
              <p className="text-xs text-[#6C7069] leading-relaxed">
                Reaches lifecycle carbon neutrality within 30 days of daily morning coffee use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spotlight Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#E8E2D5]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
              Editorial Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E2B] font-display mt-1">
              Top Featured Drinkware Guides
            </h2>
          </div>
          <p className="text-xs text-[#6C7069] sm:text-right max-w-xs">
            Start with our foundational guides covering buying choices, thermal physics, and daily care.
          </p>
        </div>

        {/* 3 Top Spotlight Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlightArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white border border-[#E8E2D5] rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="relative aspect-[4/3] bg-[#F4F0E8] overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-[#2C2E2B] border border-[#E8E2D5] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8F9E8B]" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6C7069] mb-2">
                    <span className="font-medium text-[#2C2E2B]">{article.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2C2E2B] group-hover:text-[#C86D51] transition-colors leading-snug">
                    <a
                      href={article.url}
                      onClick={(e) => handleLink(e, article.url)}
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-xs text-[#555A52] mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="text-[#8F9E8B] font-semibold text-[11px]">
                    ~{article.wordCount} words
                  </span>

                  <a
                    href={article.url}
                    onClick={(e) => handleLink(e, article.url)}
                    className="font-semibold text-[#C86D51] group-hover:text-[#B1583D] flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Complete Library: All 10 Articles Section */}
      <section id="all-guides" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#E8E2D5]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8F9E8B]">
              Full Publication Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E2B] font-display mt-1">
              All 10 Hydration & Drinkware Articles
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2ECE1] rounded-lg border border-[#E5DFD3]">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-[#2C2E2B] shadow-xs font-semibold'
                  : 'text-[#6C7069] hover:text-[#2C2E2B]'
              }`}
            >
              All 10 Guides
            </button>
            <button
              onClick={() => setFilterCategory('buying')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterCategory === 'buying'
                  ? 'bg-white text-[#2C2E2B] shadow-xs font-semibold'
                  : 'text-[#6C7069] hover:text-[#2C2E2B]'
              }`}
            >
              Buying & Sizing
            </button>
            <button
              onClick={() => setFilterCategory('thermal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterCategory === 'thermal'
                  ? 'bg-white text-[#2C2E2B] shadow-xs font-semibold'
                  : 'text-[#6C7069] hover:text-[#2C2E2B]'
              }`}
            >
              Thermal Science
            </button>
            <button
              onClick={() => setFilterCategory('care')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterCategory === 'care'
                  ? 'bg-white text-[#2C2E2B] shadow-xs font-semibold'
                  : 'text-[#6C7069] hover:text-[#2C2E2B]'
              }`}
            >
              Care & Cleaning
            </button>
          </div>
        </div>

        {/* 10 Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article, index) => (
            <article
              key={article.slug}
              className="bg-white border border-[#E8E2D5] rounded-xl overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="relative aspect-[16/10] bg-[#F4F0E8] overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-semibold text-[#3E4C3D] border border-[#E8E2D5]">
                  Guide #{ARTICLES.findIndex((a) => a.slug === article.slug) + 1}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-medium text-[#2C2E2B] border border-[#E8E2D5]">
                  {article.readTime}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-[#6C7069] mb-1.5 flex items-center gap-1.5">
                    <span>{article.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#2C2E2B] group-hover:text-[#C86D51] transition-colors leading-snug">
                    <a
                      href={article.url}
                      onClick={(e) => handleLink(e, article.url)}
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-xs text-[#555A52] mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs">
                  <span className="text-[#8F9E8B] font-semibold text-[11px]">
                    ~{article.wordCount} words
                  </span>

                  <a
                    href={article.url}
                    onClick={(e) => handleLink(e, article.url)}
                    className="font-semibold text-[#C86D51] group-hover:text-[#B1583D] flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEO Question-Based H2 Headings with Direct Answers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8F9E8B]">
            Expert Hydration Q&A
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C2E2B] font-display">
            Frequently Asked Questions About Reusable Drinkware
          </h2>
          <p className="text-xs text-[#6C7069]">
            Direct answers on drinkware thermodynamics, condensation prevention, and daily benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Question H2 #1 */}
          <div className="p-6 sm:p-7 bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#C86D51]">
              <HelpCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Direct Answer</span>
            </div>

            {/* Question-based H2 heading */}
            <h2 className="text-lg sm:text-xl font-bold text-[#2C2E2B] font-display leading-snug">
              Why switch from single-use cups to high-performance reusable tumblers?
            </h2>

            {/* Direct Answer callout */}
            <div className="p-4 bg-[#FAF0EC] border border-[#ECD7CF] rounded-xl text-xs font-semibold text-[#8C3F27] leading-relaxed">
              <span className="block mb-1 font-bold text-[#A44C30]">Direct Answer:</span>
              Switching to high-performance reusable tumblers eliminates toxic microplastic shedding from disposable polyethylene-lined paper cups, preserves beverage temperature for 12 to 24 hours via double-wall vacuum chambers, and prevents up to 500 disposable cups from entering municipal landfills annually per person.
            </div>

            <p className="text-xs text-[#555A52] leading-relaxed">
              Standard takeaway cups lose their heat within 20 minutes and often leak at the lid seam during transit. A pro-grade reusable tumbler built with 18/8 stainless steel and a threaded gasket seal withstands vigorous commuting, fits into vehicle consoles, and pays for itself within weeks.
            </p>

            <a
              href="/articles/best-reusable-tumblers/"
              onClick={(e) => handleLink(e, '/articles/best-reusable-tumblers/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C86D51] hover:text-[#B1583D] pt-1"
            >
              <span>Read the complete buyer's comparison guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Question H2 #2 */}
          <div className="p-6 sm:p-7 bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[#3E4C3D]">
              <HelpCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Direct Answer</span>
            </div>

            {/* Question-based H2 heading */}
            <h2 className="text-lg sm:text-xl font-bold text-[#2C2E2B] font-display leading-snug">
              How do double-wall insulated tumblers prevent exterior condensation?
            </h2>

            {/* Direct Answer callout */}
            <div className="p-4 bg-[#EBF0EA] border border-[#D5E2D3] rounded-xl text-xs font-semibold text-[#30402F] leading-relaxed">
              <span className="block mb-1 font-bold text-[#3E4C3D]">Direct Answer:</span>
              Double-wall insulated tumblers prevent exterior condensation (sweating) by evacuating all air between two stainless steel walls to create a vacuum void. Because heat cannot transfer across an empty void, the temperature of the cold drink inside never reaches the outer wall, keeping the exterior surface dry and at ambient room temperature.
            </div>

            <p className="text-xs text-[#555A52] leading-relaxed">
              On single-wall glasses, cold liquid cools the outer glass below the atmospheric dew point, forcing ambient water vapor in the air to condense into moisture droplets. In a vacuum-sealed tumbler, the outer wall stays at room temperature, protecting wood furniture, bags, and car holders from water rings.
            </p>

            <a
              href="/articles/insulated-tumblers/"
              onClick={(e) => handleLink(e, '/articles/insulated-tumblers/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E4C3D] hover:text-[#2C2E2B] pt-1"
            >
              <span>Explore the complete vacuum thermal physics guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Section Introducing the Latest Drinkware Tips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#E8E2D5]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
                Practical Tips & Care
              </div>
              <h2 className="text-2xl font-bold text-[#2C2E2B] font-display mt-1">
                Essential Drinkware Care & Maintenance Tips
              </h2>
            </div>
            <a
              href="/articles/how-to-clean-a-tumbler/"
              onClick={(e) => handleLink(e, '/articles/how-to-clean-a-tumbler/')}
              className="text-xs font-semibold text-[#8F9E8B] hover:text-[#2C2E2B] flex items-center gap-1"
            >
              <span>View full cleaning manual</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white border border-[#E8E2D5] rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#8F9E8B]">01</span>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Disassemble Lid Gaskets</h3>
              <p className="text-xs text-[#555A52] leading-relaxed">
                Rinsing alone leaves coffee milk fats trapped under silicone rings. Peel the gasket out weekly for a 15-minute white vinegar or baking soda soak to prevent mold.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E8E2D5] rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#C86D51]">02</span>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Avoid Dishwasher Dry Cycles</h3>
              <p className="text-xs text-[#555A52] leading-relaxed">
                Wash the insulated metal body by hand. The 170°F+ heated drying cycle can fatigue the bottom vacuum brazing weld and dull exterior pastel powder coats.
              </p>
            </div>

            <div className="p-5 bg-white border border-[#E8E2D5] rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#3E4C3D]">03</span>
              <h3 className="text-sm font-bold text-[#2C2E2B]">Pre-Temper for Maximum Hours</h3>
              <p className="text-xs text-[#555A52] leading-relaxed">
                Fill with boiling water for two minutes before pouring morning coffee, or cold water before adding ice. Pre-tempering extends thermal retention by up to 4 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
