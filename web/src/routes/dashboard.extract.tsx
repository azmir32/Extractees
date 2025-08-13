import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'

function ExtractionPage() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <SidebarTrigger />
            <AppHeader />
          </div>
          <h1 className="text-xl font-semibold">Document Extraction</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload PDFs or images to see parsed fields before they are saved to your vault.</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 h-64">
              <div className="text-sm font-medium">Dropzone</div>
              <div className="mt-2 text-sm text-muted-foreground">Drag & drop files (placeholder)</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 h-64">
              <div className="text-sm font-medium">Parsed fields</div>
              <div className="mt-2 text-sm text-muted-foreground">Merchant, amount, date, category…</div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard/extract',
  component: () => (
    <SignedIn>
      <ExtractionPage />
    </SignedIn>
  ),
})


