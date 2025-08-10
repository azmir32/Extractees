import type { PropsWithChildren, ReactNode } from 'react'
import { CheckIcon } from './Icons'

interface FeatureItemProps extends PropsWithChildren {
  icon?: ReactNode
  children: ReactNode
}

export function FeatureItem({ icon, children }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-primary">{icon ?? <CheckIcon className="size-4" />}</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  )
}


