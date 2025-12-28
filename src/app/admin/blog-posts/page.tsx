'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  status: 'published' | 'draft';
  views: number;
  tags: string[];
}

// Fetch blog posts from API
async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/admin/blog', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Fetch blog posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleDeletePost = (slug: string) => {
    setPosts(posts.filter(p => p.slug !== slug));
  };

  const handlePostSaved = () => {
    // Reload posts after saving
    fetchBlogPosts().then(setPosts).catch(console.error);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-gray-400">Manage your blog content</p>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="px-6 py-3 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:shadow-[0_0_20px_rgba(var(--neon-cyan),0.4)] transition-all flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
          <span>New Post</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <FilterButton
              active={filterStatus === 'all'}
              onClick={() => setFilterStatus('all')}
              label="All"
              count={posts.length}
            />
            <FilterButton
              active={filterStatus === 'published'}
              onClick={() => setFilterStatus('published')}
              label="Published"
              count={posts.filter((p) => p.status === 'published').length}
            />
            <FilterButton
              active={filterStatus === 'draft'}
              onClick={() => setFilterStatus('draft')}
              label="Drafts"
              count={posts.filter((p) => p.status === 'draft').length}
            />
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      {showEditor ? (
        <BlogEditor onClose={() => setShowEditor(false)} onSave={handlePostSaved} />
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--neon-cyan))] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading posts...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-xl mb-2">No posts found</p>
              <p className="text-sm">Try adjusting your filters or create a new post</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <BlogPostItem key={post.id} post={post} onDelete={handleDeletePost} />
            ))
          )}
        </div>
      )}

      {/* Stats Footer */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg hover:border-opacity-50 transition-all">
            <p className="text-sm text-gray-400 mb-1">Total Posts</p>
            <p className="text-2xl font-bold text-[rgb(var(--neon-cyan))]">{posts.length}</p>
            <p className="text-xs text-gray-500 mt-1">
              {posts.filter(p => p.status === 'published').length} published
            </p>
          </div>
          <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-green))] border-opacity-30 rounded-lg hover:border-opacity-50 transition-all">
            <p className="text-sm text-gray-400 mb-1">Total Views</p>
            <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">
              {posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {posts.filter(p => p.views > 0).length} posts with views
            </p>
          </div>
          <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg hover:border-opacity-50 transition-all">
            <p className="text-sm text-gray-400 mb-1">Avg. Views per Post</p>
            <p className="text-2xl font-bold text-[rgb(var(--neon-purple))]">
              {posts.length > 0 ? Math.round(posts.reduce((sum, post) => sum + post.views, 0) / posts.length) : 0}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {posts.reduce((max, post) => Math.max(max, post.views), 0)} max views
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-[rgb(var(--neon-cyan))] text-white hover:shadow-[0_0_15px_rgba(var(--neon-cyan),0.4)]'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {label} ({count})
    </button>
  );
}

function BlogPostItem({ post, onDelete }: { post: BlogPost; onDelete: (slug: string) => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog?slug=${post.slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      onDelete(post.slug);
    } catch (error) {
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-6 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg hover:border-opacity-60 transition-all group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold group-hover:text-[rgb(var(--neon-cyan))] transition-colors">
              {post.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                post.status === 'published'
                  ? 'bg-green-500 bg-opacity-20 text-green-400'
                  : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
              }`}
            >
              {post.status}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            /{post.slug} • {new Date(post.date).toLocaleDateString()} • {post.views} views
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs border border-[rgb(var(--neon-cyan))] border-opacity-30 text-[rgb(var(--neon-cyan))] rounded hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-20 hover:border-opacity-60 hover:shadow-[0_0_8px_rgba(var(--neon-cyan),0.3)] transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button className="px-4 py-2 text-[rgb(var(--neon-cyan))] border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg hover:bg-[rgb(var(--neon-cyan))] hover:bg-opacity-20 hover:border-opacity-60 hover:shadow-[0_0_10px_rgba(var(--neon-cyan),0.3)] transition-all">
            Edit
          </button>
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 text-red-500 border border-red-500 border-opacity-30 rounded-lg hover:bg-red-500 hover:bg-opacity-20 hover:border-opacity-60 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)] transition-all disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <button className="px-4 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogEditor({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    readTime: '',
    status: 'draft',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Title, slug, and content are required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save');
      }

      onSave();
      onClose();
    } catch (error: any) {
      alert(error.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }));
  };

  return (
    <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Blog Post</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ✕
        </button>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="Enter post title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="post-slug"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Excerpt</label>
          <textarea
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none"
            placeholder="Brief description of the post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Content (MDX) <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={16}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none resize-none font-mono text-sm"
            placeholder="# Your markdown content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="nextjs, typescript, tutorial"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Read Time</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full px-4 py-2 bg-transparent border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg focus:border-opacity-100 focus:outline-none"
              placeholder="5 min read"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={saving}
            className="px-8 py-3 bg-[rgb(var(--neon-cyan))] text-white rounded-lg hover:shadow-[0_0_20px_rgba(var(--neon-cyan),0.4)] transition-all disabled:opacity-50"
          >
            {saving ? 'Publishing...' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={saving}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-8 py-3 bg-transparent border border-gray-600 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
