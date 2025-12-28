# Admin CMS Documentation

## Overview

The admin panel now functions as a complete filesystem-based Content Management System (CMS). All changes made through the admin interface are saved directly to your codebase files.

## Features

### Blog Posts Management
- **Location**: `/admin/blog-posts`
- **Storage**: MDX files in `/src/content/blog/`
- **API**: `/api/admin/blog`

#### Operations:
1. **Create**: Creates a new `.mdx` file with YAML frontmatter
2. **Delete**: Removes the MDX file from the filesystem
3. **Edit**: Updates existing MDX file (coming soon)

#### Blog Post Structure:
```yaml
---
title: "Your Post Title"
date: "2024-01-15"
slug: "your-post-slug"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
status: "published" or "draft"
---

Your markdown content here...
```

### Project Management
- **Location**: `/admin/projects`
- **Storage**: JSON array in `/src/data/projects.json`
- **API**: `/api/admin/projects`

#### Operations:
1. **Create**: Adds new project to JSON file
2. **Delete**: Removes project from JSON file
3. **Edit**: Updates existing project (coming soon)

#### Project Structure:
```json
{
  "id": "unique-id",
  "title": "Project Title",
  "description": "Project description",
  "tech": ["React", "Node.js"],
  "status": "live" | "in-progress" | "archived",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://..."
}
```

## API Routes

### Blog API (`/api/admin/blog/route.ts`)

#### GET
- Returns all blog posts from `/src/content/blog/`
- Parses frontmatter and content
- Returns array of blog post objects

#### POST
- Creates new MDX file
- Auto-generates slug from title if not provided
- Validates required fields (title, content, excerpt)
- Returns created blog post

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Markdown content",
  "excerpt": "Brief description",
  "tags": ["tag1", "tag2"],
  "status": "published"
}
```

#### PUT
- Updates existing blog post
- Can handle slug changes (renames file)
- Updates frontmatter and content

**Request Body:**
```json
{
  "originalSlug": "old-slug",
  "slug": "new-slug",
  "title": "Updated Title",
  "content": "Updated content",
  ...
}
```

#### DELETE
- Removes MDX file from filesystem

**Request Body:**
```json
{
  "slug": "post-slug"
}
```

### Projects API (`/api/admin/projects/route.ts`)

#### GET
- Reads `/src/data/projects.json`
- Returns array of projects

#### POST
- Adds new project to JSON file
- Auto-generates unique ID
- Validates required fields

**Request Body:**
```json
{
  "title": "Project Name",
  "description": "Description",
  "tech": ["React", "Node.js"],
  "status": "live",
  "githubUrl": "https://...",
  "liveUrl": "https://..."
}
```

#### PUT
- Updates existing project
- Finds by ID and replaces

**Request Body:**
```json
{
  "id": "project-id",
  "title": "Updated Title",
  ...
}
```

#### DELETE
- Removes project from JSON array

**Request Body:**
```json
{
  "id": "project-id"
}
```

## How It Works

### File System Operations

Both APIs use Node.js `fs/promises` for file operations:

```typescript
import { promises as fs } from 'fs';
import path from 'path';

// Read file
const content = await fs.readFile(filePath, 'utf-8');

// Write file
await fs.writeFile(filePath, content, 'utf-8');

// Delete file
await fs.unlink(filePath);

// List directory
const files = await fs.readdir(dirPath);
```

### Frontmatter Parsing

Blog posts use YAML frontmatter:

```typescript
const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (match) {
  const frontmatter = match[1]; // YAML content
  const markdown = match[2];    // Markdown content
}
```

### Data Persistence

- **Blog Posts**: Each post is a separate `.mdx` file
- **Projects**: All projects in one `projects.json` file
- **No Database**: Everything is file-based
- **Version Control**: All changes can be committed to Git

## Usage

### Creating a Blog Post

1. Go to `/admin/blog-posts`
2. Click "New Blog Post"
3. Fill in:
   - Title (required)
   - Content in markdown (required)
   - Excerpt (required)
   - Tags (comma-separated)
   - Status (published/draft)
4. Click "Publish" or "Save Draft"
5. File is created at `/src/content/blog/{slug}.mdx`

### Creating a Project

1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in:
   - Project Title (required)
   - Description (required)
   - Technologies (comma-separated)
   - Status (live/in-progress/archived)
   - GitHub URL (optional)
   - Live URL (optional)
4. Click "Create Project"
5. Project is added to `/src/data/projects.json`

### Deleting Content

- Click the "Delete" button on any blog post or project
- Confirm the deletion
- File is immediately removed from the filesystem

## Security

All admin routes are protected by middleware authentication:

```typescript
// middleware.ts
if (pathname.startsWith('/admin')) {
  // Verify credentials
  const authHeader = request.headers.get('authorization');
  // Check against ADMIN_USERNAME and ADMIN_PASSWORD
}
```

Make sure to set these environment variables:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## Future Enhancements

- [ ] Edit functionality for existing posts/projects
- [ ] Image upload and management
- [ ] Bulk operations
- [ ] Preview before publishing
- [ ] Draft auto-save
- [ ] Search and filtering improvements
- [ ] Categories management
- [ ] Analytics integration
- [ ] Content versioning

## Development

When developing locally, changes are immediately visible after:
1. Saving through admin panel
2. Hot reload in development mode
3. No need to restart the dev server

## Deployment

When deploying:
1. Ensure write permissions for the app
2. Consider using a build step to regenerate static pages
3. Or use ISR (Incremental Static Regeneration) for dynamic content

## Troubleshooting

### Blog posts not appearing
- Check file exists in `/src/content/blog/`
- Verify frontmatter format is correct
- Check slug doesn't have special characters

### Projects not saving
- Verify `/src/data/projects.json` exists
- Check file permissions
- Look for JSON syntax errors

### API errors
- Check browser console for error messages
- Verify middleware authentication
- Check server logs for detailed errors
