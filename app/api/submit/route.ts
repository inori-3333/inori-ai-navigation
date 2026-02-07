import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateLogoUrl, generateScreenshotUrl } from '@/lib/tools';
import { mapCategoryToId } from '@/lib/categories';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, description, category } = body;

    // Validation
    if (!name || !url || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Map category to standardized ID
    const normalizedCategory = mapCategoryToId(category);

    // Check for duplicate URL
    const existingTool = await prisma.tool.findUnique({
      where: { url },
    });

    if (existingTool) {
      return NextResponse.json(
        { error: 'A tool with this URL already exists' },
        { status: 409 }
      );
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        name,
        url,
        description,
        category: normalizedCategory,
        isApproved: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Tool submitted successfully',
      submission,
    });
  } catch (error) {
    console.error('Failed to submit tool:', error);
    return NextResponse.json(
      { error: 'Failed to submit tool' },
      { status: 500 }
    );
  }
}
