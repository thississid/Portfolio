export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gundelly Siddartha Yadav',
    alternateName: 'Siddartha Yadav',
    description: 'AI engineer building agentic AI, LLM systems, and production ML — reliable workflows, backends, and governance dashboards.',
    url: 'https://sid-port-pi.vercel.app',
    image: 'https://sid-port-pi.vercel.app/icon.png',
    sameAs: [
      'https://github.com/thississid',
      'https://linkedin.com/in/thississid',
    ],
    jobTitle: 'AI Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Techolution',
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'KL University',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Full-Stack Development',
      'Python',
      'TensorFlow',
      'LangChain',
      'React',
      'Next.js',
    ],
  };
}

export function generateBlogPostStructuredData(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.date,
    keywords: post.tags.join(', '),
    url: `https://sid-port-pi.vercel.app/blog/${post.slug}`,
  };
}
