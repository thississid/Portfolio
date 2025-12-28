import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PROJECTS_FILE = path.join(process.cwd(), 'src/data/projects.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'src/data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read projects from file
async function readProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write projects to file
async function writeProjects(projects: any[]) {
  await ensureDataDir();
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

// GET - List all projects
export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { title, description, tech, status, githubUrl, liveUrl } = data;
    
    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const projects = await readProjects();
    
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      tech: Array.isArray(tech) ? tech : tech.split(',').map((t: string) => t.trim()).filter(Boolean),
      status: status || 'in-progress',
      ...(githubUrl && { githubUrl }),
      ...(liveUrl && { liveUrl }),
    };
    
    projects.push(newProject);
    await writeProjects(projects);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// PUT - Update existing project
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, title, description, tech, status, githubUrl, liveUrl } = data;
    
    if (!id || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const projects = await readProjects();
    const index = projects.findIndex((p: any) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = {
      ...projects[index],
      title,
      description,
      tech: Array.isArray(tech) ? tech : tech.split(',').map((t: string) => t.trim()).filter(Boolean),
      status: status || 'in-progress',
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
    };
    
    await writeProjects(projects);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Project updated successfully',
      project: projects[index]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    
    const projects = await readProjects();
    const filteredProjects = projects.filter((p: any) => p.id !== id);
    
    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    await writeProjects(filteredProjects);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Project deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
