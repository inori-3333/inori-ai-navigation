import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | InoriのAI Navigation',
  description: 'AI tool reviews, guides, and industry insights.',
};

const POSTS = [
  {
    id: 1,
    title: 'Top 10 AI Productivity Tools for 2026',
    excerpt: 'Boost your workflow with these cutting-edge AI applications that are redefining productivity.',
    date: 'Feb 8, 2026',
    category: 'Productivity',
  },
  {
    id: 2,
    title: 'How to Choose the Right LLM for Your Business',
    excerpt: 'Comparing GPT-5, Claude 4, and Gemini 2.0: which one should you choose?',
    date: 'Feb 5, 2026',
    category: 'Analysis',
  },
  {
    id: 3,
    title: 'The Rise of AI-First Design Tools',
    excerpt: 'Why traditional design software is being replaced by AI-native alternatives.',
    date: 'Feb 1, 2026',
    category: 'Design',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">AI Insights</h1>
        <p className="text-xl text-slate-500">Guides, reviews, and the latest news from the world of AI.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <article key={post.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/10 group-hover:opacity-100 transition-opacity" />
               <div className="absolute inset-0 flex items-center justify-center text-4xl">
                 {post.category === 'Design' ? '🎨' : post.category === 'Productivity' ? '⚡' : '🧠'}
               </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 uppercase tracking-wider">
                {post.category}
              </div>
              <h2 className="text-xl font-display font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm line-clamp-2">
                {post.excerpt}
              </p>
              <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{post.date}</span>
                <span className="font-bold text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read More <span>→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
