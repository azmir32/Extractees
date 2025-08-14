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
  const [filters, setFilters] = React.useState({ q: '', status: 'all' })
  const [open, setOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<DocumentRecord | undefined>(undefined)
  const { docs, addOptimisticFiles } = useMockDocuments([
    { id: '1', filename: 'Receipt-INV-001.pdf', mimeType: 'application/pdf', size: 12000, uploadedAt: new Date().toISOString(), status: 'saved', tags: [], parsed: { merchant: 'Store MY', amount: 289, currency: 'MYR', date: '2025-11-04' }, amount: 289, currency: 'MYR', txnDate: '2025-11-04' },
    { id: '2', filename: 'Grab-2025-10-02.png', mimeType: 'image/png', size: 4000, uploadedAt: new Date().toISOString(), status: 'parsed', tags: [], parsed: { merchant: 'Grab', amount: 18.5, currency: 'MYR', date: '2025-10-02' }, amount: 18.5, currency: 'MYR', txnDate: '2025-10-02' },
  ])

  const filtered = docs.filter((d) => {
    const matchQ = filters.q ? (d.filename + (d.parsed?.merchant ?? '')).toLowerCase().includes(filters.q.toLowerCase()) : true
    const matchStatus = filters.status === 'all' ? true : d.status === filters.status
    return matchQ && matchStatus
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
              onChange={setFilters}
              onUploadClick={() => { /* fallback */ }}
            />
          </div>
          <div className="mt-4">
            <UploadDropzone onFiles={(files) => addOptimisticFiles(files)} />
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


