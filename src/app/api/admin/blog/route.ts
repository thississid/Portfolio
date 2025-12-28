import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// GET - List all blog posts
export async function GET() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract frontmatter
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
          const frontmatter = match[1];
          const metadata: any = {};
          
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim().replace(/^["'\[]|["'\]]$/g, '');
              metadata[key.trim()] = value;
            }
          });
          
          return {
            id: file.replace('.mdx', ''),
            title: metadata.title || 'Untitled',
            slug: file.replace('.mdx', ''),
            date: metadata.date || new Date().toISOString().split('T')[0],
            status: metadata.status || 'published',
            views: parseInt(metadata.views || '0'),
            tags: metadata.tags ? metadata.tags.split(',').map((t: string) => t.trim().replace(/"/g, '')) : [],
          };
        }
        
        return null;
      })
    );
    
    return NextResponse.json(posts.filter(Boolean));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, slug, excerpt, content, tags, readTime, status = 'draft' } = data;
    
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const fileName = `${slug}.mdx`;
    const filePath = path.join(BLOG_DIR, fileName);
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    } catch {
      // File doesn't exist, which is what we want
    }
    
    const tagsArray = tags ? tags.split(',').map((t: string) => `"${t.trim()}"`).join(', ') : '';
    const frontmatter = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "${excerpt || ''}"
tags: [${tagsArray}]
readTime: "${readTime || '5 min read'}"
status: "${status}"
views: "0"
---

${content}
`;
    
    await fs.writeFile(filePath, frontmatter, 'utf-8');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post created successfully',
      slug 
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

// PUT - Update existing blog post
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { originalSlug, title, slug, excerpt, content, tags, readTime, status } = data;
    
    if (!originalSlug || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const oldFilePath = path.join(BLOG_DIR, `${originalSlug}.mdx`);
    const newFilePath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    // Read existing file to preserve date and views
    let existingDate = new Date().toISOString().split('T')[0];
    let existingViews = '0';
    
    try {
      const existingContent = await fs.readFile(oldFilePath, 'utf-8');
      const dateMatch = existingContent.match(/date: "([^"]+)"/);
      const viewsMatch = existingContent.match(/views: "([^"]+)"/);
      if (dateMatch) existingDate = dateMatch[1];
      if (viewsMatch) existingViews = viewsMatch[1];
    } catch (error) {
      // File doesn't exist, use defaults
    }
    
    const tagsArray = tags ? tags.split(',').map((t: string) => `"${t.trim()}"`).join(', ') : '';
    const frontmatter = `---
title: "${title}"
date: "${existingDate}"
excerpt: "${excerpt || ''}"
tags: [${tagsArray}]
readTime: "${readTime || '5 min read'}"
status: "${status || 'draft'}"
views: "${existingViews}"
---

${content}
`;
    
    await fs.writeFile(newFilePath, frontmatter, 'utf-8');
    
    // If slug changed, delete old file
    if (originalSlug !== slug) {
      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        // Old file might not exist
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post updated successfully',
      slug 
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE - Delete blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    await fs.unlink(filePath);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
