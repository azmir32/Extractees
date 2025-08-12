import type { PropsWithChildren, ReactNode } from 'react'
import { CheckIcon } from './Icons'

interface FeatureItemProps extends PropsWithChildren {
  icon?: ReactNode
  children: ReactNode
}

export function FeatureItem({ icon, children }: FeatureItemProps) {
  return (
    <li className="group flex items-start gap-3 rounded-[12px] border border-transparent hover:border-border bg-card/0 hover:bg-card/60 transition-all p-3 hover:-translate-y-0.5 shadow-sm/0 hover:shadow-sm">
      <span className="mt-0.5 text-primary">{icon ?? <CheckIcon className="size-4" />}</span>
      <span className="text-muted-foreground leading-relaxed">{children}</span>
    </li>
  )
}


