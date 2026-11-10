import Link from 'next/link'
export default function AdminPage() {
  return <main className="max-w-2xl mx-auto px-6 py-16"><h1 className="text-2xl font-bold mb-4">Administrator access unavailable</h1><p role="status">Administrator actions are temporarily unavailable. A validated administrator identity and role must be configured before listings can be reviewed or changed. Public search and verified-owner claim tools remain available.</p><Link className="inline-block mt-6 underline" href="/listings">Return to public directory</Link></main>
}
