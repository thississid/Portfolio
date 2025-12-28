import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import ShareButtons from '@/components/ui/ShareButtons';
import ViewCounter from '@/components/ui/ViewCounter';
import { generateBlogPostStructuredData } from '@/lib/structured-data';
import './blog-post.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Siddartha Yadav`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = generateBlogPostStructuredData(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] py-20 px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-pink))] transition-colors mb-8 font-mono text-sm"
          >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-[rgb(var(--neon-pink))] border-opacity-30 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--neon-pink))] mb-4 font-mono">
            {post.title}
          </h1>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[rgb(var(--text-secondary))] font-mono">
            <span className="flex items-center gap-2">
              <span className="text-[rgb(var(--neon-cyan))]">👤</span>
              {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="text-[rgb(var(--neon-green))]">📅</span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="text-[rgb(var(--neon-purple))]">⏱</span>
              {post.readTime}
            </span>
            <span>•</span>
            <ViewCounter slug={params.slug} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded bg-transparent text-[rgb(var(--neon-pink))] border border-[rgb(var(--neon-pink))] border-opacity-50 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="mdx-content">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-[rgb(var(--border))]">
          <ShareButtons 
            url={`/blog/${params.slug}`} 
            title={post.title}
            description={post.excerpt}
          />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-[rgb(var(--neon-cyan))] border-opacity-30">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))] rounded-lg font-mono hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-20 hover:shadow-[0_0_20px_rgb(var(--neon-cyan))] transition-all"
          >
            <span>←</span>
            <span>Back to All Posts</span>
          </Link>
        </footer>
        </article>
      </div>
    </>
  );
}
