import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | InoriのAI Navigation',
  description: 'Learn more about InoriのAI Navigation and our mission to curate the best AI tools.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
          Curating the <span className="text-primary-600 italic">Future</span> of AI
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          InoriのAI Navigation is a hand-picked directory of over 200+ artificial intelligence tools, 
          designed to empower creators, developers, and entrepreneurs.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-semibold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            The AI landscape is moving at breakneck speed. Every day, dozens of new tools are launched, 
            making it harder to find the ones that actually deliver value. 
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to cut through the noise. We manually review and categorize the most innovative 
            AI applications to help you find the perfect solution for your specific needs, whether 
            you're writing code, generating artwork, or automating your marketing.
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 text-white shadow-2xl">
          <div className="space-y-4">
            <div className="text-4xl font-bold">200+</div>
            <div className="text-primary-100">Curated AI Tools</div>
            <div className="h-px bg-white/20 my-4" />
            <div className="text-4xl font-bold">25+</div>
            <div className="text-primary-100">Specialized Categories</div>
            <div className="h-px bg-white/20 my-4" />
            <div className="text-4xl font-bold">Daily</div>
            <div className="text-primary-100">Updates & Reviews</div>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-3xl font-display font-semibold text-slate-900 text-center">Why Inori?</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 text-2xl">
              🎯
            </div>
            <h3 className="font-bold text-slate-900">Quality First</h3>
            <p className="text-sm text-slate-500">We don't just list every tool. We select the ones that truly matter.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 text-2xl">
              🏷️
            </div>
            <h3 className="font-bold text-slate-900">Easy Discovery</h3>
            <p className="text-sm text-slate-500">Intuitive categorization and powerful search to save you time.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 text-2xl">
              🤝
            </div>
            <h3 className="font-bold text-slate-900">Community Driven</h3>
            <p className="text-sm text-slate-500">Built for and by the AI community. Your submissions keep us growing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
