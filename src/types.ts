export interface ArticleSection {
  h2: string;
  isQuestionH2?: boolean;
  directAnswer?: string;
  subsections?: {
    h3: string;
    content: string[];
  }[];
  content: string[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  tips?: string[];
}

export interface Article {
  slug: string;
  url: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  heroImage: string;
  heroImageAlt: string;
  wordCount: number;
  summary: string;
  sections: ArticleSection[];
  relatedArticleSlugs: string[];
}
