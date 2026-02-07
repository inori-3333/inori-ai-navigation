import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  logoUrl: string | null;
  screenshotUrl: string | null;
  views: number;
  createdAt: Date;
}

export interface ToolFilters {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getTools(filters: ToolFilters = {}): Promise<{
  tools: Tool[];
  total: number;
  totalPages: number;
}> {
  const { category, search, sort = 'popular', page = 1, limit = 20 } = filters;
  
  const where: any = {
    isApproved: true,
  };

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const orderBy: any = sort === 'popular' 
    ? { views: 'desc' }
    : { createdAt: 'desc' };

  const [tools, total] = await Promise.all([
    prisma.tool.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.tool.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return { tools, total, totalPages };
}

export async function getToolById(id: string): Promise<Tool | null> {
  return prisma.tool.findUnique({
    where: { id },
  }) as Promise<Tool | null>;
}

export async function incrementViews(id: string): Promise<void> {
  await prisma.tool.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
}

export async function createSubmission(data: {
  name: string;
  description: string;
  url: string;
  category: string;
}): Promise<void> {
  await prisma.submission.create({
    data: {
      ...data,
      isApproved: false,
    },
  });
}

export function getDomainFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export function generateLogoUrl(url: string): string {
  const domain = getDomainFromUrl(url);
  return `https://logo.clearbit.com/${domain}`;
}

export function generateScreenshotUrl(url: string): string {
  return `https://image.thum.io/get/width/1024/crop/768/${url}`;
}
