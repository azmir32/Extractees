import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { SignedIn, RedirectToSignIn, UserButton } from '@clerk/clerk-react'

function AppShell() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-semibold">Extractees</Link>
            <span className="text-xs text-muted-foreground">App</span>
          </div>
          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-10">
        {/* Intentionally blank - start designing here */}
      </main>
    </div>
  )
}

function AppRouteComponent() {
  return (
    <>
      <SignedIn>
        <AppShell />
      </SignedIn>
      <RedirectToSignIn />
    </>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/app',
  component: AppRouteComponent,
})


