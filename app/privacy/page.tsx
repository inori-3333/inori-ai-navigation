import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | InoriのAI Navigation',
  description: 'Our privacy policy and data practices.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 prose prose-slate prose-lg">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-8 text-center">Privacy Policy</h1>
      
      <p className="text-slate-500 italic text-center mb-12">Last Updated: February 9, 2026</p>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          At InoriのAI Navigation, we value your privacy. We collect minimal data necessary to provide our services:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Submission Data:</strong> When you submit a tool, we collect the name, URL, and description you provide.</li>
          <li><strong>Analytics:</strong> We use anonymous metrics to track tool popularity (view counts) to improve our recommendations.</li>
          <li><strong>Cookies:</strong> We use essential cookies to remember your preferences and ensure site functionality.</li>
        </ul>
      </section>

      <section className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">2. How We Use Data</h2>
        <p>
          Your data is used exclusively to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Display and categorize AI tools.</li>
          <li>Review and approve user submissions.</li>
          <li>Improve the user experience based on popularity trends.</li>
        </ul>
      </section>

      <section className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">3. Third-Party Services</h2>
        <p>
          We integrate with external services like Clearbit (for logos) and Thum.io (for screenshots). 
          Please refer to their respective privacy policies regarding data handling.
        </p>
      </section>

      <div className="mt-16 p-8 bg-slate-100 rounded-3xl text-center">
        <p className="text-sm text-slate-500">
          Questions about our privacy practices? <br />
          Contact us at <span className="font-semibold">privacy@inori-ai.navigation</span>
        </p>
      </div>
    </div>
  );
}
