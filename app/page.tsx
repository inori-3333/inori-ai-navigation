import { Metadata } from 'next';
import ToolGrid from '@/components/ToolGrid';
import { getTools } from '@/lib/tools';
import { getCategories } from '@/lib/categories';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'InoriのAI Navigation | Discover the Best AI Tools',
  description: 'A curated directory of 200+ AI tools for productivity, marketing, development, design, and more. Discover, search, and submit AI tools.',
};

interface HomeProps {
  searchParams: {
    category?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category || '';
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'popular';
  
  const { tools, total, totalPages } = await getTools({
    category,
    search,
    sort,
    page,
    limit: 20,
  });
  
  const categories = await getCategories();

  return (
    <div className="page-transition">
      <ToolGrid
        tools={tools}
        categories={categories}
        total={total}
        totalPages={totalPages}
        currentPage={page}
        currentCategory={category}
        currentSearch={search}
        currentSort={sort}
      />
    </div>
  );
}
