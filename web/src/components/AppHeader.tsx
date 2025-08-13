import { Link, useRouterState } from '@tanstack/react-router'
import { IconGauge, IconMail, IconUpload, IconLock, IconFileText } from '@tabler/icons-react'

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const parts = pathname.split('/').filter(Boolean)

  const iconFor = (label: string) => {
    const key = label.toLowerCase()
    if (key.startsWith('dashboard')) return IconGauge
    if (key.startsWith('inbox')) return IconMail
    if (key.includes('extract')) return IconUpload
    if (key.startsWith('vault')) return IconLock
    if (key.startsWith('summary')) return IconFileText
    return null
  }

  const crumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    ...parts.slice(1).map((p, i) => {
      const href = '/' + parts.slice(0, i + 2).join('/')
      return { label: p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), href }
    }),
  ]

  return (
    <div className="flex items-center justify-between mb-2">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex items-center gap-1 text-muted-foreground">
          {crumbs.map((c, i) => {
            const Icon = iconFor(c.label)
            return (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <span className="text-muted-foreground/60">/</span>}
              {i < crumbs.length - 1 ? (
                <Link to={c.href} className="hover:text-foreground inline-flex items-center gap-1.5">
                  {Icon && <Icon className="size-3.5" />}<span>{c.label}</span>
                </Link>
              ) : (
                <span className="text-foreground font-medium inline-flex items-center gap-1.5">{Icon && <Icon className="size-3.5" />}<span>{c.label}</span></span>
              )}
            </li>
          )})}
        </ol>
      </nav>
    </div>
  )}


