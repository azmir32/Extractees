import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { useTheme } from '../providers/useTheme'
import { MobileTabBar } from '../components/MobileTabBar'
import { TaxDeadlineReminder } from '../components/TaxDeadlineReminder'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      {/* Global top banner with countdown */}
      <TaxDeadlineReminder form="BE" banner />
      <header className="border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/70 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-6">
          <Link to={"/"} className="font-semibold">Extractees</Link>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <select
              aria-label="Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
              className="text-xs rounded-[var(--radius)] border border-border bg-background px-2 py-1 text-foreground hover:bg-muted"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <SignedOut>
              <SignInButton>
                <button className="text-sm rounded-[var(--radius)] px-3 py-1.5 border border-border hover:bg-muted">Login</button>
              </SignInButton>
              <SignUpButton>
                <button className="interactive-elevate text-sm rounded-[var(--radius)] bg-primary text-primary-foreground px-3 py-1.5 shadow-sm">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-4 sm:py-6">
        <Outlet />
      </main>
      <div className="mt-auto">
        {/* Minimal and clean footer with live KL time and socials */}
        <div id="_footer_mount" />
      </div>
      <MobileTabBar />
    </div>
  )
}


