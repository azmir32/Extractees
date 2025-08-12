import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '../utils/cn'

interface SectionProps extends PropsWithChildren {
  id?: string
  title?: ReactNode
  subtitle?: ReactNode
  className?: string
}

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 sm:scroll-mt-24 overscroll-y-contain touch-scroll',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {(title || subtitle) && (
          <header className="mb-10 sm:mb-12">
            {typeof title === 'string' ? (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
            ) : (
              title
            )}
            {subtitle && <p className="mt-3 text-muted-foreground text-lg">
              {subtitle}
            </p>}
            <div className="subtle-separator mt-6" />
          </header>
        )}
        {children}
      </div>
    </section>
  )
}


