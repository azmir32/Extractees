import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-react'
import { SocialFooter } from './sections/SocialFooter'
import { ThemeProvider } from './providers/ThemeProvider'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-dvh flex flex-col bg-background text-foreground">
            <div className="flex-1">
              <RouterProvider router={router} />
            </div>
            <SocialFooter />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
)
