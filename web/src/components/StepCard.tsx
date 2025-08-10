import type { PropsWithChildren, ReactNode } from 'react'

interface StepCardProps extends PropsWithChildren {
  step: number
  title: string
  description?: ReactNode
}

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="group relative rounded-[14px] border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-transparent group-hover:ring-primary/40 group-hover:shadow-[0_0_0_3px_var(--ring)]/20" />
      <div className="text-xs text-muted-foreground">Step {step}</div>
      <h3 className="mt-2 font-medium">{title}</h3>
      {description && <div className="mt-2 text-sm text-muted-foreground">{description}</div>}
    </div>
  )
}


