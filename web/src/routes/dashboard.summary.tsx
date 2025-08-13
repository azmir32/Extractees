import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'

function SummaryPage() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <SidebarTrigger />
            <AppHeader />
          </div>
          <h1 className="text-xl font-semibold">Summary</h1>
          <p className="mt-1 text-sm text-muted-foreground">Totals by relief category for Malaysia Personal Tax.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Total deductible</div>
              <div className="mt-1 text-2xl font-semibold">RM0.00</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Non-deductible</div>
              <div className="mt-1 text-2xl font-semibold">RM0.00</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm text-muted-foreground">Top category</div>
              <div className="mt-1 text-2xl font-semibold">—</div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="text-sm font-medium">Export</div>
            <div className="mt-2 text-sm text-muted-foreground">CSV and PDF export coming soon.</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard/summary',
  component: () => (
    <SignedIn>
      <SummaryPage />
    </SignedIn>
  ),
})


