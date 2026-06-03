import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!adminUser) redirect('/')

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-brand-indigo text-white px-6 py-3 flex items-center justify-between">
        <span className="font-semibold text-sm">FindTrademarkAttorney — Admin</span>
        <span className="text-blue-200 text-xs">{user.email}</span>
      </div>
      {children}
    </div>
  )
}
