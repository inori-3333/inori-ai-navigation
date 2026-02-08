import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | InoriのAI Navigation',
  description: 'Our terms of service and usage guidelines.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 prose prose-slate prose-lg">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-8 text-center">Terms of Service</h1>
      
      <p className="text-slate-500 italic text-center mb-12">Effective Date: February 9, 2026</p>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By accessing InoriのAI Navigation, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
      </section>

      <section className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">2. Use License</h2>
        <p>
          Permission is granted to temporarily use our directory for personal, non-commercial transitory viewing only. 
          You may not:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Modify or copy the materials.</li>
          <li>Use the materials for any commercial purpose.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
        </ul>
      </section>

      <section className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">3. Disclaimer</h2>
        <p>
          The tools listed on InoriのAI Navigation are provided "as is". We do not warrant the accuracy, 
          likely results, or reliability of the tools linked on our platform. The inclusion of any link 
          does not imply endorsement by InoriのAI Navigation.
        </p>
      </section>

      <section className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">4. Limitations</h2>
        <p>
          In no event shall InoriのAI Navigation or its suppliers be liable for any damages arising out of the 
          use or inability to use the materials on the website.
        </p>
      </section>
    </div>
  );
}
