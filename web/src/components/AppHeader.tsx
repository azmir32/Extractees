import { Link, useRouterState } from '@tanstack/react-router'

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const parts = pathname.split('/').filter(Boolean)

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
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <span className="text-muted-foreground/60">/</span>}
              {i < crumbs.length - 1 ? (
                <Link to={c.href} className="hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )}


