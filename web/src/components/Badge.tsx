import type { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

interface BadgeProps extends PropsWithChildren {
  variant?: 'default' | 'outline'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs',
        variant === 'default' && 'border border-border bg-card text-muted-foreground',
        variant === 'outline' && 'border border-border text-muted-foreground',
      )}
    >
      {children}
    </span>
  )
}


