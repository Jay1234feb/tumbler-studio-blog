import React, { useEffect } from 'react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigate,
}) => {
  // Sync document head metadata on article view
  useEffect(() => {
    document.title = article.seoTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        'content',
        `${article.mainKeyword}, ${article.relatedKeywords.join(', ')}, tumbler studio`
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', article.seoTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', article.metaDescription);
    }

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', article.seoTitle);
    }

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', article.metaDescription);
    }
  }, [article]);

  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to parse contextual markdown internal links: [Anchor Text](/articles/slug/)
  const renderContentWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    if (!linkRegex.test(text)) return text;
    linkRegex.lastIndex = 0;

    const elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        elements.push(text.substring(lastIdx, match.index));
      }
      const label = match[1];
      const targetUrl = match[2];
      elements.push(
        <a
          key={match.index}
          href={targetUrl}
          onClick={(e) => handleLink(e, targetUrl)}
          className="font-medium text-[#C86D51] hover:text-[#B1583D] underline underline-offset-2 decoration-[#C86D51]/50 hover:decoration-[#B1583D] transition-colors"
        >
          {label}
        </a>
      );
      lastIdx = linkRegex.lastIndex;
    }

    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }

    return elements;
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation with Descriptive Internal Link */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-[#6C7069] pb-4 border-b border-[#E8E2D5]">
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => handleLink(e, '/')}
            className="hover:text-[#2C2E2B] transition-colors flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Blog Home</span>
          </a>
          <span aria-hidden="true">/</span>
          <span>Articles</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#2C2E2B] font-medium truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-[#7B8077]">
          <span>~{article.wordCount} words</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
      </nav>

      {/* Article Header & EXACTLY ONE H1 */}
      <header className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
          Tumbler Studio · In-Depth Drinkware Guide
        </div>

        {/* The single H1 on this page */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C2E2B] font-display leading-[1.18] text-balance">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#555A52] leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* Author & Publication metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#6C7069] pt-2 border-t border-[#E8E2D5]/60">
          <div className="flex items-center gap-1.5 font-medium text-[#2C2E2B]">
            <User className="w-3.5 h-3.5 text-[#8F9E8B]" />
            <span>{article.author.name}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="text-[#6C7069]">{article.author.role}</div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#989D94]" />
            <span>{article.publishedDate}</span>
          </div>
          <span aria-hidden="true">·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#989D94]" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

      {/* Unique Optimized Hero Image with Descriptive Alt Text */}
      <div className="relative rounded-2xl overflow-hidden bg-[#F4F0E8] border border-[#E8E2D5] shadow-xs">
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          referrerPolicy="no-referrer"
          className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover"
        />
        <div className="p-3 bg-[#FAF8F5] border-t border-[#E8E2D5] text-[11px] text-[#7B8077] italic text-center">
          {article.heroImageAlt}
        </div>
      </div>

      {/* Table of Contents jump navigation */}
      <div className="p-6 bg-[#F2ECE1] border border-[#E5DFD3] rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C2E2B]">
          <BookOpen className="w-4 h-4 text-[#8F9E8B]" />
          <span>Table of Contents</span>
        </div>
        <ul className="space-y-2 text-xs text-[#555A52]">
          {article.sections.map((sec, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-mono text-[#8F9E8B]">{String(i + 1).padStart(2, '0')}.</span>
              <a
                href={`#section-${i}`}
                className="hover:text-[#2C2E2B] hover:underline transition-colors"
              >
                {sec.h2}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Article Content Sections */}
      <div className="space-y-12 text-[#3D4039] leading-relaxed">
        {article.sections.map((section, idx) => (
          <section
            key={idx}
            id={`section-${idx}`}
            className="space-y-4 scroll-mt-24 pt-6 border-t border-[#E8E2D5]/70 first:border-t-0"
          >
            {/* Logical H2 Heading */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#2C2E2B] font-display leading-snug">
              {section.h2}
            </h2>

            {/* If question-based H2, render prominent Direct Answer Callout */}
            {section.isQuestionH2 && section.directAnswer && (
              <div className="p-5 bg-[#FAF0EC] border border-[#ECD7CF] rounded-xl space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#C86D51] text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Direct Answer</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#8C3F27] leading-relaxed">
                  {section.directAnswer}
                </p>
              </div>
            )}

            {/* Body Paragraphs with Contextual Internal Links */}
            <div className="space-y-4 text-sm sm:text-base text-[#474B43]">
              {section.content.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {renderContentWithLinks(p)}
                </p>
              ))}
            </div>

            {/* Subsections with H3 Headings */}
            {section.subsections && (
              <div className="space-y-6 pt-3">
                {section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#2C2E2B] font-display">
                      {sub.h3}
                    </h3>
                    {sub.content.map((subP, subPIdx) => (
                      <p key={subPIdx} className="text-sm sm:text-base text-[#474B43] leading-relaxed">
                        {renderContentWithLinks(subP)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Comparison or Technical Table */}
            {section.tableData && (
              <div className="my-6 border border-[#E8E2D5] rounded-xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F4F0E8] border-b border-[#E8E2D5] text-[#2C2E2B]">
                        {section.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 font-bold whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE9DF]">
                      {section.tableData.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={`hover:bg-[#FAF8F5] transition-colors ${
                            rIdx === 0 ? 'bg-[#FAF8F5]/80 font-medium' : ''
                          }`}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-3 text-[#4A4E46] ${
                                cIdx >= 3 ? 'tabular-nums font-mono text-[11px]' : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {section.tableData.caption && (
                  <div className="p-2.5 bg-[#F9F7F4] border-t border-[#E8E2D5] text-[11px] text-[#7B8077] italic text-center">
                    {section.tableData.caption}
                  </div>
                )}
              </div>
            )}

            {/* Editorial Tips Box */}
            {section.tips && (
              <div className="p-4 bg-[#EBF0EA] border border-[#D5E2D3] rounded-xl space-y-2 text-xs">
                <div className="font-bold text-[#3E4C3D] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Practical Takeaways</span>
                </div>
                <ul className="space-y-1.5 text-[#30402F]">
                  {section.tips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8F9E8B] mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Internal Navigation Between Articles & Homepage */}
      <div className="pt-10 border-t border-[#E8E2D5] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#2C2E2B] font-display">
              Continue Reading on Tumbler Studio
            </h3>
            <p className="text-xs text-[#6C7069]">
              Explore our related drinkware science and maintenance guides.
            </p>
          </div>
          <a
            href="/"
            onClick={(e) => handleLink(e, '/')}
            className="text-xs font-semibold text-[#8F9E8B] hover:text-[#2C2E2B] flex items-center gap-1"
          >
            <span>Back to All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <a
              key={rel.slug}
              href={rel.url}
              onClick={(e) => handleLink(e, rel.url)}
              aria-label={`Read guide: ${rel.title}`}
              className="group p-4 bg-white border border-[#E8E2D5] rounded-xl flex gap-4 hover:border-[#D9D2C4] hover:shadow-sm transition-all"
            >
              <img
                src={rel.heroImage}
                alt={rel.heroImageAlt}
                referrerPolicy="no-referrer"
                className="w-20 h-20 object-cover rounded-lg bg-[#F4F0E8] shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#8F9E8B] font-semibold uppercase tracking-wider">
                    {rel.readTime}
                  </div>
                  <h4 className="text-xs font-bold text-[#2C2E2B] group-hover:text-[#C86D51] transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[11px] font-medium text-[#6C7069] flex items-center gap-1 mt-2">
                  <span className="group-hover:text-[#C86D51] transition-colors">Read {rel.mainKeyword} guide</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};
