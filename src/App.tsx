/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { ARTICLES } from './data/articles';

// Helper to normalize path by removing trailing slash, query params, hash, or .html extension
const normalizePath = (p: string) => {
  if (p === '/' || !p) return '/';
  let clean = p.split('#')[0].split('?')[0];
  if (clean.endsWith('.html')) clean = clean.slice(0, -5);
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
};

// Robust matcher for finding article by any URL variation
const findArticleByPath = (path: string) => {
  const normalized = normalizePath(path);
  if (normalized === '/') return undefined;
  return ARTICLES.find((a) => {
    const normUrl = normalizePath(a.url);
    const normSlug = normalizePath(a.slug);
    return (
      normUrl === normalized ||
      normSlug === normalized ||
      normalized === `/articles/${normSlug}` ||
      normalized.endsWith(`/${normSlug}`)
    );
  });
};

export default function App() {
  // Read current path from browser, matching against article slugs
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const match = findArticleByPath(window.location.pathname);
    if (match) return match.url;
    return '/';
  });

  // Sync route on popstate (browser back/forward button clicks)
  useEffect(() => {
    const handlePopState = () => {
      const match = findArticleByPath(window.location.pathname);
      if (match) {
        setCurrentPath(match.url);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO head tags when route is homepage
  useEffect(() => {
    if (normalizePath(currentPath) === '/') {
      document.title = 'Tumbler Studio: Reusable & Insulated Tumblers Guide';

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Discover the best reusable tumblers at Tumbler Studio. Explore in-depth guides on double-wall vacuum insulation, leakproof lids, and daily care tips.'
        );
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute(
          'content',
          'reusable tumblers, insulated tumblers, tumbler drinkware blog, tumbler studio'
        );
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute(
          'content',
          'Tumbler Studio: Reusable & Insulated Tumblers Guide'
        );
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          'Discover the best reusable tumblers at Tumbler Studio. Explore in-depth guides on double-wall vacuum insulation, leakproof lids, and daily care tips.'
        );
      }

      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute(
          'content',
          'Tumbler Studio: Reusable & Insulated Tumblers Guide'
        );
      }

      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute(
          'content',
          'Discover the best reusable tumblers at Tumbler Studio. Explore in-depth guides on double-wall vacuum insulation, leakproof lids, and daily care tips.'
        );
      }
    }
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    if (path.startsWith('/#') || path.startsWith('#')) {
      const hash = path.replace(/^\/?#/, '');
      if (normalizePath(currentPath) !== '/') {
        setCurrentPath('/');
        window.history.pushState(null, '', '/');
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    setCurrentPath(path);
    window.history.pushState(null, '', path);
  };

  // Find currently active article if any
  const currentArticle = findArticleByPath(currentPath);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2E2B]">
      {/* Blog Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentArticle ? (
          <ArticlePage
            article={currentArticle}
            onNavigate={handleNavigate}
          />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Blog Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
