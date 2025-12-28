export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gundelly Siddartha Yadav',
    alternateName: 'Siddartha Yadav',
    description: 'Full-stack developer specializing in AI/ML, LLM integration, and cloud-based application deployment.',
    url: 'https://sid-port-pi.vercel.app',
    image: 'https://yourdomain.com/icon.png',
    sameAs: [
      'https://github.com/thississid',
      'https://linkedin.com/in/thississid',
    ],
    jobTitle: 'AI/ML Specialist & Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'PiResearch Labs',
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
    url: `https://yourdomain.com/blog/${post.slug}`,
  };
}
