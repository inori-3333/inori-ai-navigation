import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDomainFromUrl } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Increment view count
    await prisma.tool.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to increment views:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
