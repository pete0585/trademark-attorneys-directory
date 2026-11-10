import type { Listing } from '@/lib/types'
// Fail closed: no direct-browser privileged writes or optimistic success.
export default function AdminTable(_props: { listings: Listing[] }) {
  return <p role="status">Administrator actions are unavailable until a validated administrator identity and role are configured.</p>
}
