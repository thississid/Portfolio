'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const displayPosts = filteredPosts.slice(0, 6); // Show max 6 posts

  if (posts.length === 0) {
    return (
      <Section id="blog" centerContent>
        <Container>
          <SectionTitle title="Blog" color="indigo" />
          <div className="text-center py-12">
            <p className="text-[rgb(var(--text-secondary))]">
              📝 Blog posts coming soon...
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="blog" centerContent>
      <Container>
        <SectionTitle title="Blog" color="indigo" />

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-md text-sm transition-all ${
                selectedTag === null
                  ? 'border border-[rgb(var(--neon-cyan))] bg-[rgb(var(--neon-cyan))]/10 text-[rgb(var(--neon-cyan))]'
                  : 'border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))]'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  selectedTag === tag
                    ? 'border border-[rgb(var(--neon-cyan))] bg-[rgb(var(--neon-cyan))]/10 text-[rgb(var(--neon-cyan))]'
                    : 'border border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--neon-cyan))] hover:text-[rgb(var(--neon-cyan))]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: Math.min(index * 0.04, 0.14), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card
                  borderColor={
                    index % 4 === 0
                      ? 'sakura'
                      : index % 4 === 1
                      ? 'indigo'
                      : index % 4 === 2
                      ? 'terracotta'
                      : 'moss'
                  }
                  className="h-full flex flex-col cursor-pointer group"
                >
                  {/* Cover Image Placeholder */}
                  {post.coverImage ? (
                    <div className="w-full h-48 bg-gradient-to-br from-[rgb(var(--sakura-pink))] to-[rgb(var(--indigo-blue))] rounded-md mb-4 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 rounded-md mb-4 flex items-center justify-center border border-[rgb(var(--border))] bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(244,114,182,0.12))]">
                      <span className="font-mono text-sm uppercase tracking-[0.16em] text-[rgb(var(--neon-cyan))]">Research Notes</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[rgb(var(--text-primary))] mb-3 group-hover:text-[rgb(var(--neon-cyan))] transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[rgb(var(--text-secondary))] border-t border-[rgb(var(--border))]/70 pt-4 mt-auto">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-md bg-[rgb(var(--bg-primary))]/45 text-[rgb(var(--neon-cyan))] border border-[rgb(var(--neon-cyan))]/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        {filteredPosts.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 border border-[rgb(var(--neon-cyan))] text-[rgb(var(--neon-cyan))] rounded-md hover:bg-[rgb(var(--neon-cyan))]/10 transition-all"
            >
              View All Posts →
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
