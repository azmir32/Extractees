import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppHeader } from '../components/AppHeader'

function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <SidebarTrigger />
            <AppHeader />
          </div>
          {props.children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function DashboardHome() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your capture activity at a glance.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Receipts" value="0" />
        <MetricCard label="Total Spent" value="RM0.00" />
        <MetricCard label="Deductible" value="RM0.00" />
        <MetricCard label="Vendors" value="0" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm mb-2 font-medium">Get started</div>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Copy your forwarding address (coming soon) and email a receipt</li>
            <li>Drop a PDF in Extraction to test parsing</li>
            <li>Visit Summary to view totals</li>
          </ol>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm mb-2 font-medium">Recent activity</div>
          <div className="text-sm text-muted-foreground">No activity yet</div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function DashboardGate() {
  return (
    <>
      <SignedIn>
        <DashboardHome />
      </SignedIn>
      <SignedOut>
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 text-center">
          <div className="text-lg font-semibold">Please sign in to continue</div>
          <div className="mt-3 text-sm text-muted-foreground">Access your dashboard after signing in.</div>
          <div className="mt-4">
            <SignInButton>
              <button className="rounded-[var(--radius)] border border-border px-3 py-1.5 hover:bg-muted text-sm">Sign in</button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard',
  component: DashboardGate,
})


