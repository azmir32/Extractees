import * as React from 'react'
import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'
import { VaultToolbar } from '../features/vault/VaultToolbar'
import { DocumentsTable } from '../features/vault/DocumentsTable'
import { DocumentsTableVirtual } from '../features/vault/DocumentsTableVirtual'
import { DetailDrawer } from '../features/vault/DetailDrawer'
import type { DocumentRecord } from '../features/vault/types'
import { useMockDocuments } from '../features/vault/useVaultMocks'
import { UploadDropzone } from '../features/vault/UploadDropzone'

function VaultPage() {
  const [filters, setFilters] = React.useState<{ q: string; status: string; from?: string; to?: string; vendorId?: string; categoryId?: string; tags: string }>({ q: '', status: 'all', from: undefined, to: undefined, vendorId: undefined, categoryId: undefined, tags: '' })
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<DocumentRecord | undefined>(undefined)
  const { docs, addOptimisticFiles, progress, cancelUpload, retryUpload } = useMockDocuments([
    { id: '1', filename: 'Receipt-INV-001.pdf', mimeType: 'application/pdf', size: 12000, uploadedAt: new Date().toISOString(), status: 'saved', tags: [], parsed: { merchant: 'Store MY', amount: 289, currency: 'MYR', date: '2025-11-04' }, amount: 289, currency: 'MYR', txnDate: '2025-11-04' },
    { id: '2', filename: 'Grab-2025-10-02.png', mimeType: 'image/png', size: 4000, uploadedAt: new Date().toISOString(), status: 'parsed', tags: [], parsed: { merchant: 'Grab', amount: 18.5, currency: 'MYR', date: '2025-10-02' }, amount: 18.5, currency: 'MYR', txnDate: '2025-10-02' },
  ])

  const filtered = docs.filter((d) => {
    const matchQ = filters.q ? (d.filename + (d.parsed?.merchant ?? '')).toLowerCase().includes(filters.q.toLowerCase()) : true
    const matchStatus = filters.status === 'all' ? true : d.status === filters.status
    const matchVendor = filters.vendorId ? d.vendorId === filters.vendorId : true
    const matchCategory = filters.categoryId ? d.categoryId === filters.categoryId : true
    const dateVal = d.txnDate ?? d.uploadedAt?.slice(0,10)
    const matchFrom = filters.from ? (dateVal ? dateVal >= filters.from : false) : true
    const matchTo = filters.to ? (dateVal ? dateVal <= filters.to : false) : true
    const matchTags = filters.tags ? filters.tags.split(',').map(t=>t.trim().toLowerCase()).every(tag => d.tags.map(x=>x.toLowerCase()).includes(tag)) : true
    return matchQ && matchStatus && matchVendor && matchCategory && matchFrom && matchTo && matchTags
  })

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <SidebarTrigger />
            <AppHeader />
          </div>
          <h1 className="text-xl font-semibold">Vault</h1>
          <p className="mt-1 text-sm text-muted-foreground">All processed documents live here. Filter and search your receipts.</p>
          <div className="mt-4">
            <VaultToolbar
              value={filters}
              onChange={(v) => {
                setFilters({ q: v.q, status: v.status, from: v.from, to: v.to, vendorId: v.vendorId, categoryId: v.categoryId, tags: v.tags ?? '' })
                const params = new URLSearchParams()
                Object.entries(v).forEach(([k,val]) => {
                  if (val) params.set(k, String(val))
                })
                history.replaceState(null, '', `/dashboard/vault?${params.toString()}`)
              }}
              onUploadClick={() => { /* fallback */ }}
              vendors={[{id:'grab',name:'Grab'},{id:'store-my',name:'Store MY'}]}
              categories={[{id:'lifestyle',name:'Lifestyle'},{id:'office',name:'Office'}]}
            />
          </div>
          <div className="mt-4">
            <UploadDropzone onFiles={(files) => addOptimisticFiles(files)} />
            {/* Show uploading items progress */}
            <div className="mt-3 grid gap-2">
              {docs.filter(d => d.id.startsWith('tmp_')).map(d => (
                <div key={d.id} className="rounded-lg border border-border bg-card p-3 text-sm flex items-center gap-3">
                  <div className="flex-1 truncate">{d.filename}</div>
                  <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${progress[d.id] ?? 0}%` }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs underline" onClick={() => cancelUpload(d.id)}>Cancel</button>
                    <button className="text-xs underline" onClick={() => retryUpload(d.id)}>Retry</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 hidden xl:block">
            <DocumentsTableVirtual
              documents={filtered}
              onOpen={(doc) => { setCurrent(doc); setOpen(true) }}
            />
          </div>
          <div className="mt-4 xl:hidden">
            <DocumentsTable
              documents={filtered}
              onOpen={(doc) => { setCurrent(doc); setOpen(true) }}
            />
          </div>

          <DetailDrawer open={open} onOpenChange={setOpen} document={current} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard/vault',
  component: () => (
    <SignedIn>
      <VaultPage />
    </SignedIn>
  ),
})


