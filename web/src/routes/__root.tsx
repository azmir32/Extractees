import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/70 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-6">
          <Link to={"/"} className="font-semibold">Extractees</Link>
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <button className="text-sm rounded-[var(--radius)] px-3 py-1.5 border border-border hover:bg-muted">Login</button>
              </SignInButton>
              <SignUpButton>
                <button className="text-sm rounded-[var(--radius)] bg-primary text-primary-foreground px-3 py-1.5 shadow-sm">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-8">
        <Outlet />
      </main>
      <div className="mt-auto">
        {/* Minimal and clean footer with live KL time and socials */}
        <div id="_footer_mount" />
      </div>
    </div>
  )
}


