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
    seoTitle: "Best Reusable Tumblers Buying Guide | Tumbler Studio",
    metaDescription: "Find the best reusable tumblers for coffee and cold drinks. Compare stainless steel and ceramic designs with leakproof lids in this Tumbler Studio buyer guide.",
    mainKeyword: "best reusable tumblers",
    relatedKeywords: ["best reusable tumbler with straw", "best reusable cups"]
  },
  {
    slug: 'insulated-tumblers',
    seoTitle: "Insulated Tumbler Guide: Double-Wall Tech | Tumbler Studio",
    metaDescription: "Learn how an insulated tumbler uses double-wall vacuum technology to keep drinks hot or cold for hours without condensation. Read the Tumbler Studio guide.",
    mainKeyword: "insulated tumbler",
    relatedKeywords: ["insulated tumbler stainless", "insulated vacuum tumbler"]
  },
  {
    slug: 'how-to-clean-a-tumbler',
    seoTitle: "How to Clean a Tumbler: Deep Cleaning Tips | Tumbler Studio",
    metaDescription: "Learn how to clean a tumbler properly with our step-by-step guide. Sanitize silicone lid gaskets, remove coffee stains, and eliminate stubborn odours easily.",
    mainKeyword: "how to clean a tumbler",
    relatedKeywords: ["how to clean tumbler lid", "how to clean insulated tumbler"]
  },
  {
    slug: 'stainless-steel-vs-plastic-tumblers',
    seoTitle: "Stainless Steel vs Plastic Tumblers | Tumbler Studio",
    metaDescription: "Compare stainless steel vs plastic tumblers for daily drinks. Discover key differences in health safety, insulation, durability, and taste at Tumbler Studio.",
    mainKeyword: "stainless steel vs plastic tumblers",
    relatedKeywords: ["stainless steel tumbler benefits", "plastic vs metal travel mug"]
  },
  {
    slug: 'how-to-choose-the-right-tumbler-size',
    seoTitle: "How to Choose the Right Tumbler Size | Tumbler Studio",
    metaDescription: "Learn how to choose the right tumbler size for coffee, commuting, and all-day hydration. Compare 12oz to 40oz drinkware capacities at Tumbler Studio.",
    mainKeyword: "how to choose the right tumbler size",
    relatedKeywords: ["tumbler size comparison", "best tumbler size for coffee"]
  },
  {
    slug: 'how-long-do-insulated-tumblers-keep-drinks-cold',
    seoTitle: "How Long Do Insulated Tumblers Stay Cold? | Tumbler Studio",
    metaDescription: "Discover how long do insulated tumblers keep drinks cold. Learn the science of ice retention, real temperature testing, and pre-chilling tips at Tumbler Studio.",
    mainKeyword: "how long do insulated tumblers keep drinks cold",
    relatedKeywords: ["tumbler ice retention", "keep drinks cold in insulated tumbler"]
  },
  {
    slug: 'are-reusable-tumblers-eco-friendly',
    seoTitle: "Are Reusable Tumblers Eco-Friendly? | Tumbler Studio",
    metaDescription: "Are reusable tumblers eco friendly? Explore carbon lifecycle data, break-even usage milestones, and plastic reduction benefits in this Tumbler Studio guide.",
    mainKeyword: "are reusable tumblers eco friendly",
    relatedKeywords: ["reusable tumbler environmental impact", "eco friendly travel mugs"]
  },
  {
    slug: 'how-to-remove-smells-from-a-tumbler',
    seoTitle: "How to Remove Smells from a Tumbler | Tumbler Studio",
    metaDescription: "Discover how to remove smells from a tumbler using baking soda, vinegar, and natural deodorizing hacks for stubborn coffee odours on stainless steel and lids.",
    mainKeyword: "how to remove smells from a tumbler",
    relatedKeywords: ["remove coffee smell from tumbler", "how to clean smelly tumbler lid"]
  },
  {
    slug: 'tumbler-lid-and-straw-types-explained',
    seoTitle: "Tumbler Lid and Straw Types Explained | Tumbler Studio",
    metaDescription: "Explore tumbler lid and straw types explained in detail. Compare magnetic sliders, flip caps, silicone straws, and splash-proof closures at Tumbler Studio.",
    mainKeyword: "tumbler lid and straw types explained",
    relatedKeywords: ["tumbler lid types", "reusable tumbler straws"]
  },
  {
    slug: 'how-to-prevent-tumbler-leaks-and-spills',
    seoTitle: "How to Prevent Tumbler Leaks and Spills | Tumbler Studio",
    metaDescription: "Learn how to prevent tumbler leaks and spills with gasket maintenance, steam pressure tips, and leakproof seal troubleshooting from Tumbler Studio experts.",
    mainKeyword: "how to prevent tumbler leaks and spills",
    relatedKeywords: ["leakproof tumbler lids", "stop tumbler from leaking"]
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
