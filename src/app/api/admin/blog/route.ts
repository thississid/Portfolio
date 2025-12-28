import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, slug, content, excerpt, tags, readTime, author, date } = data;

    // Validation
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Create MDX file content
    const mdxContent = `---
title: "${title}"
date: "${date || new Date().toISOString()}"
excerpt: "${excerpt || ''}"
author: "${author || 'Gundelly Siddartha Yadav'}"
tags: [${tags ? tags.split(',').map((t: string) => `"${t.trim()}"`).join(', ') : ''}]
readTime: "${readTime || '5 min read'}"
---

${content}
`;

    // Save file to blog directory
    const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.mdx`);
    await writeFile(filePath, mdxContent, 'utf-8');

    return NextResponse.json(
      { message: 'Blog post created successfully', slug },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { slug, ...rest } = data;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Update logic here (similar to POST)
    // For now, just return success
    return NextResponse.json(
      { message: 'Blog post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Delete logic here
    // For now, just return success
    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
