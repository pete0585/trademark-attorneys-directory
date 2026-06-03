import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers email.received events via Svix — extract from payload.data when present
  const emailData = (payload.type === 'email.received' && payload.data)
    ? (payload.data as Record<string, unknown>)
    : payload

  const fromEmail = (emailData.from as string) ?? ''
  const fromName = ''
  const subject = (emailData.subject as string) ?? ''
  const bodyText = (emailData.text as string) ?? ''
  const bodyHtml = (emailData.html as string) ?? ''

  if (!fromEmail) {
    return NextResponse.json({ error: 'Missing from email' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  await supabase.from('inbound_emails').insert({
    directory: 'trademark-attorneys',
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    listing_id: null,
    listing_slug: null,
    processed: false,
  })

  return NextResponse.json({ received: true })
}
