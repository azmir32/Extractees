import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export interface ButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:pointer-events-none transition-transform duration-150 active:scale-[0.99] shadow-sm'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:brightness-95',
    secondary: 'bg-secondary text-secondary-foreground hover:brightness-95',
    ghost: 'bg-transparent text-foreground hover:bg-muted/70',
    outline: 'bg-transparent text-foreground border border-border hover:bg-muted/70',
  }

  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}


