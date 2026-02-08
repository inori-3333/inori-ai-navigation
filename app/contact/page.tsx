import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | InoriのAI Navigation',
  description: 'Get in touch with the InoriのAI Navigation team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Get in Touch</h1>
        <p className="text-xl text-slate-500">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-display font-semibold text-slate-900">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                📧
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-slate-500">hello@inori-ai.navigation</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                💬
              </div>
              <div>
                <p className="font-semibold text-slate-900">Discord</p>
                <a href="https://discord.com/users/1173200430965211197" className="text-primary-600 hover:underline">Join our community</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                📺
              </div>
              <div>
                <p className="font-semibold text-slate-900">Bilibili</p>
                <a href="https://space.bilibili.com/23514500" className="text-primary-600 hover:underline">Watch our reviews</a>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="btn-primary w-full py-3">Send Message</button>
        </form>
      </div>
    </div>
  );
}
