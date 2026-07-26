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
  const isSinglePost = displayPosts.length === 1;

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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-3xl text-base leading-relaxed text-[rgb(var(--text-secondary))] md:text-lg"
        >
          Notes on applied AI, machine learning systems, and the engineering decisions behind real projects.
        </motion.p>

        {allTags.length > 0 && (
          <div className="mb-10 flex max-w-5xl gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
            <button
              onClick={() => setSelectedTag(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
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
                className={`shrink-0 px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
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

        <div className={isSinglePost ? 'max-w-5xl' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: Math.min(index * 0.04, 0.14), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
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
                  className={`h-full cursor-pointer overflow-hidden group ${
                    isSinglePost ? 'grid gap-6 p-5 md:grid-cols-[0.82fr_1.18fr] md:p-6' : 'flex flex-col'
                  }`}
                >
                  <div className={`${isSinglePost ? 'min-h-56 md:min-h-full' : 'mb-4 h-48'} relative overflow-hidden rounded-md border border-[rgb(var(--border))] bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(255,255,255,0.76)_45%,rgba(244,114,182,0.12))]`}>
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <span className="w-fit rounded-full border border-[rgb(var(--neon-cyan))]/40 bg-[rgb(var(--surface))]/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.16em] text-[rgb(var(--neon-cyan))]">
                          Research Notes
                        </span>
                        <div className="grid grid-cols-4 gap-2 opacity-45">
                          {Array.from({ length: 12 }).map((_, itemIndex) => (
                            <span key={itemIndex} className="h-1 rounded-full bg-[rgb(var(--neon-cyan))]/55" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[rgb(var(--text-secondary))]">
                      <span className="rounded-full border border-[rgb(var(--border))]/70 bg-[rgb(var(--bg-primary))]/70 px-3 py-1 font-medium uppercase tracking-[0.12em]">
                        Article
                      </span>
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-[rgb(var(--border))]">/</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className={`${isSinglePost ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl'} mb-4 font-semibold leading-tight text-[rgb(var(--text-primary))] transition-colors duration-300 group-hover:text-[rgb(var(--neon-cyan))]`}>
                      {post.title}
                    </h3>

                    <p className={`${isSinglePost ? 'text-base md:text-lg line-clamp-4' : 'text-sm line-clamp-3'} mb-6 leading-relaxed text-[rgb(var(--text-secondary))]`}>
                      {post.excerpt}
                    </p>

                    <div className="mt-auto border-t border-[rgb(var(--border))]/70 pt-4">
                      {post.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, isSinglePost ? 5 : 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-md bg-[rgb(var(--bg-primary))]/55 text-[rgb(var(--text-secondary))] border border-[rgb(var(--border))]/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text-primary))] transition-colors duration-300 group-hover:text-[rgb(var(--neon-cyan))]">
                        Read article
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
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
