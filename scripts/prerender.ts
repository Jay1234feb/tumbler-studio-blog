import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const articles = [
  {
    slug: 'best-reusable-tumblers',
    seoTitle: "Best Reusable Tumblers Guide: Materials, Insulation & Buying Tips | Tumbler Studio",
    metaDescription: "Learn how to choose the best reusable tumblers. Comprehensive guide covering stainless steel vs glass materials, leakproof lids, insulation, and buying advice.",
    mainKeyword: "best reusable tumblers",
    relatedKeywords: ["eco-friendly travel mugs", "reusable drinkware guide"]
  },
  {
    slug: 'insulated-tumblers',
    seoTitle: "Insulated Tumblers Explained: How Double-Wall Vacuum Insulation Works | Tumbler Studio",
    metaDescription: "Understand how insulated tumblers work. Explore double-wall vacuum technology, temperature retention principles, material choices, and how to pick the right one.",
    mainKeyword: "insulated tumblers",
    relatedKeywords: ["double wall vacuum insulation", "temperature retention drinkware"]
  },
  {
    slug: 'how-to-clean-a-tumbler',
    seoTitle: "How to Clean a Tumbler: Deep Cleaning, Gasket Care & Odour Removal | Tumbler Studio",
    metaDescription: "Master how to clean a tumbler properly. Learn daily washing steps, how to sanitize silicone lid gaskets, remove stubborn coffee odours, and avoid common cleaning mistakes.",
    mainKeyword: "how to clean a tumbler",
    relatedKeywords: ["clean tumbler lid gasket", "remove coffee odour from tumbler"]
  },
  {
    slug: 'stainless-steel-vs-plastic-tumblers',
    seoTitle: "Stainless Steel vs. Plastic Tumblers: Materials, Health & Durability Compared | Tumbler Studio",
    metaDescription: "Compare stainless steel vs plastic tumblers. Discover differences in chemical safety, thermal insulation, durability, taste retention, and environmental impact.",
    mainKeyword: "stainless steel vs plastic tumblers",
    relatedKeywords: ["BPA free travel cups", "metal vs plastic drinkware"]
  },
  {
    slug: 'how-to-choose-the-right-tumbler-size',
    seoTitle: "How to Choose the Right Tumbler Size: 12oz, 16oz, 20oz, 24oz & 32oz Guide | Tumbler Studio",
    metaDescription: "Find your ideal tumbler capacity. Explore our guide on 12oz to 40oz drinkware sizes for espresso, daily commuting, vehicle cupholders, and all-day hydration.",
    mainKeyword: "how to choose the right tumbler size",
    relatedKeywords: ["tumbler capacity guide", "best tumbler size for coffee"]
  },
  {
    slug: 'how-long-do-insulated-tumblers-keep-drinks-cold',
    seoTitle: "How Long Do Insulated Tumblers Keep Drinks Cold? Thermal Retention Tested | Tumbler Studio",
    metaDescription: "Discover how long insulated tumblers keep drinks cold. Learn the science of ice retention, temperature decay factors, pre-chilling methods, and lid impact.",
    mainKeyword: "how long do insulated tumblers keep drinks cold",
    relatedKeywords: ["tumbler ice retention hours", "keep water cold in insulated mug"]
  },
  {
    slug: 'are-reusable-tumblers-eco-friendly',
    seoTitle: "Are Reusable Tumblers Really Eco-Friendly? Carbon Footprint & Lifecycle Analysis | Tumbler Studio",
    metaDescription: "Investigate whether reusable tumblers are truly eco-friendly. Examine manufacturing emissions, break-even usage milestones, and plastic cup reduction data.",
    mainKeyword: "are reusable tumblers eco friendly",
    relatedKeywords: ["reusable cup environmental impact", "stainless steel tumbler carbon footprint"]
  },
  {
    slug: 'how-to-remove-smells-from-a-tumbler',
    seoTitle: "How to Remove Smells from a Tumbler: Deep Deodorizing Hacks for Lids & Steel | Tumbler Studio",
    metaDescription: "Eliminate stubborn coffee, sour milk, and mildew odours from your tumbler. Safe, natural deodorizing solutions using baking soda, vinegar, lemon, and oven curing.",
    mainKeyword: "how to remove smells from a tumbler",
    relatedKeywords: ["deodorize silicone tumbler lid", "get coffee smell out of travel mug"]
  },
  {
    slug: 'tumbler-lid-and-straw-types-explained',
    seoTitle: "Tumbler Lid and Straw Types Explained: Magnetic, Slider, Flip & Straw Caps | Tumbler Studio",
    metaDescription: "Comprehensive breakdown of tumbler lid and straw styles. Compare magnetic sliders, push-fit caps, flip locks, silicone straws, and stainless steel sipping tubes.",
    mainKeyword: "tumbler lid and straw types explained",
    relatedKeywords: ["best tumbler lid styles", "reusable straw materials comparison"]
  },
  {
    slug: 'how-to-prevent-tumbler-leaks-and-spills',
    seoTitle: "How to Prevent Tumbler Leaks and Spills: Gasket Care, Pressure & Seal Solutions | Tumbler Studio",
    metaDescription: "Stop your travel tumbler from leaking and dripping. Discover why gaskets fail, how to equalize internal steam pressure, and how to maintain airtight seals.",
    mainKeyword: "how to prevent tumbler leaks and spills",
    relatedKeywords: ["stop travel mug leaking in bag", "fix tumbler silicone seal gasket"]
  }
];

console.log(`Generating static pre-rendered HTML pages for ${articles.length} articles...`);

for (const article of articles) {
  let customHtml = baseHtml;

  // Replace title
  customHtml = customHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${article.seoTitle}</title>`
  );

  // Replace meta description
  customHtml = customHtml.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${article.metaDescription.replace(/"/g, '&quot;')}" />`
  );

  // Replace meta keywords
  const keywords = `${article.mainKeyword}, ${article.relatedKeywords.join(', ')}, tumbler studio`;
  if (customHtml.includes('name="keywords"')) {
    customHtml = customHtml.replace(
      /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i,
      `<meta name="keywords" content="${keywords.replace(/"/g, '&quot;')}" />`
    );
  } else {
    customHtml = customHtml.replace(
      '</head>',
      `  <meta name="keywords" content="${keywords.replace(/"/g, '&quot;')}" />\n</head>`
    );
  }

  // Replace OpenGraph title & description
  customHtml = customHtml.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${article.seoTitle.replace(/"/g, '&quot;')}" />`
  );

  customHtml = customHtml.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${article.metaDescription.replace(/"/g, '&quot;')}" />`
  );

  // Replace Twitter title & description
  customHtml = customHtml.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${article.seoTitle.replace(/"/g, '&quot;')}" />`
  );

  customHtml = customHtml.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${article.metaDescription.replace(/"/g, '&quot;')}" />`
  );

  // 1. Write to dist/articles/<slug>/index.html
  const articleDir = path.join(distDir, 'articles', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });
  fs.writeFileSync(path.join(articleDir, 'index.html'), customHtml, 'utf-8');

  // 2. Also write to dist/articles/<slug>.html (for direct clean URL without slash)
  const articleHtmlFile = path.join(distDir, 'articles', `${article.slug}.html`);
  fs.writeFileSync(articleHtmlFile, customHtml, 'utf-8');

  console.log(`✓ Generated static page for /articles/${article.slug}/`);
}

console.log('All 10 static article pages successfully generated in dist/articles/!');
