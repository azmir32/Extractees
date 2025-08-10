import type { PropsWithChildren, ReactNode } from 'react'

interface SectionProps extends PropsWithChildren {
  id?: string
  title?: ReactNode
  subtitle?: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-6xl px-4">
        {(title || subtitle) && (
          <header className="mb-8">
            {typeof title === 'string' ? (
              <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            ) : (
              title
            )}
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}


