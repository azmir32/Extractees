import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
    outline: 'bg-transparent text-foreground border border-border hover:bg-muted',
  }

  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}


