'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import Container from './ui/Container';
import SectionTitle from './ui/SectionTitle';
import Card from './ui/Card';
import ShootingStars from './ui/ShootingStars';
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
        <ShootingStars count={3} />
        <Container>
          <SectionTitle title="<BLOG />" color="pink" />
          <div className="text-center py-12">
            <p className="text-[rgb(var(--text-secondary))] font-mono">
              📝 Blog posts coming soon...
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="blog" centerContent>
      <ShootingStars count={3} />
      <Container>
        <SectionTitle title="<BLOG />" color="pink" />

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                selectedTag === null
                  ? 'border-2 border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))]'
                  : 'border border-[rgb(var(--text-secondary))] border-opacity-30 text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--neon-pink))] hover:text-[rgb(var(--neon-pink))]'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                  selectedTag === tag
                    ? 'border-2 border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))]'
                    : 'border border-[rgb(var(--text-secondary))] border-opacity-30 text-[rgb(var(--text-secondary))] hover:border-[rgb(var(--neon-pink))] hover:text-[rgb(var(--neon-pink))]'
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card
                  borderColor={
                    index % 4 === 0
                      ? 'pink'
                      : index % 4 === 1
                      ? 'cyan'
                      : index % 4 === 2
                      ? 'purple'
                      : 'green'
                  }
                  className="h-full flex flex-col hover:scale-105 transition-transform cursor-pointer group"
                >
                  {/* Cover Image Placeholder */}
                  {post.coverImage ? (
                    <div className="w-full h-48 bg-gradient-to-br from-[rgb(var(--neon-pink))] to-[rgb(var(--neon-purple))] rounded-lg mb-4 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-[rgb(var(--neon-pink))] via-[rgb(var(--neon-purple))] to-[rgb(var(--neon-cyan))] opacity-20 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[rgb(var(--neon-pink))] mb-3 font-mono group-hover:text-[rgb(var(--neon-cyan))] transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-4 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[rgb(var(--text-secondary))] border-t border-[rgb(var(--neon-pink))] border-opacity-20 pt-4 mt-auto">
                    <span className="font-mono">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="font-mono">{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded bg-transparent text-[rgb(var(--neon-pink))] border border-[rgb(var(--neon-pink))] border-opacity-50 font-mono"
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
              className="inline-block px-6 py-3 border-2 border-[rgb(var(--neon-pink))] text-[rgb(var(--neon-pink))] rounded-lg font-mono hover:bg-[rgb(var(--neon-pink))] hover:bg-opacity-20 hover:shadow-[0_0_20px_rgb(var(--neon-pink))] transition-all"
            >
              View All Posts →
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
