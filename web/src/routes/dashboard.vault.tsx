import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'

function VaultPage() {
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
          <p className="mt-1 text-sm text-muted-foreground">All processed documents live here. Filter and search coming soon.</p>
          <div className="mt-4 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Empty state: no documents yet
          </div>
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


