import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'

function InboxPage() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <SidebarTrigger />
            <AppHeader />
          </div>
          <h1 className="text-xl font-semibold">Inbox</h1>
          <p className="mt-1 text-sm text-muted-foreground">Forward receipts to your unique address. We’ll ingest and queue them for extraction.</p>
          <div className="mt-4 grid gap-6 xl:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-sm font-medium">Forwarding address</div>
              <div className="mt-2 text-sm text-muted-foreground">user@yourid.extractees.com (placeholder)</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-sm font-medium">Recent emails</div>
              <div className="mt-2 text-sm text-muted-foreground">No emails yet</div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard/inbox',
  component: () => (
    <SignedIn>
      <InboxPage />
    </SignedIn>
  ),
})


