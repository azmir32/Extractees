import type { PropsWithChildren, ReactNode } from 'react'
import { CheckIcon } from './Icons'

interface FeatureItemProps extends PropsWithChildren {
  icon?: ReactNode
  children: ReactNode
}

export function FeatureItem({ icon, children }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3 group">
      <span className="mt-0.5 text-primary transition-transform duration-200 group-hover:scale-110">{icon ?? <CheckIcon className="size-4" />}</span>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">{children}</span>
    </li>
  )
}


