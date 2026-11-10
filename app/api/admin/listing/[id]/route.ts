import { NextResponse } from 'next/server'

// No trusted administrator mechanism is currently provisioned. Cookie presence
// or client-supplied fields are never authority to mutate a directory listing.
export async function PATCH() {
  return NextResponse.json({ error: 'Administrator actions are unavailable until a validated administrator identity and role are configured.', code: 'administrator_access_not_configured' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
}
