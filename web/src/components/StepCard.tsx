import type { PropsWithChildren, ReactNode } from 'react'
import { CalculatorIcon, ReceiptIcon, MailIcon } from './Icons'

interface StepCardProps extends PropsWithChildren {
  step: number
  title: string
  description?: ReactNode
}

export function StepCard({ step, title, description }: StepCardProps) {
  const Illustration = step === 1 ? MailIcon : step === 2 ? ReceiptIcon : CalculatorIcon
  return (
    <div className="group flip-card relative rounded-[14px] border border-border bg-card p-0 shadow-sm interactive-elevate card-tappable">
      <div className="flip-card-inner rounded-[14px]">
        <div className="flip-front rounded-[14px] p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">{step}</div>
            <Illustration className="size-5 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="mt-2 sm:mt-3 font-semibold text-base">{title}</h3>
          {description && <div className="mt-1 sm:mt-2 text-sm text-muted-foreground">{description}</div>}
        </div>
        <div className="flip-back absolute inset-0 rounded-[14px] p-4 sm:p-6 border border-border bg-card/95">
          <h4 className="font-medium">More details</h4>
          <p className="mt-2 text-sm text-muted-foreground">Hover to reveal tips and what to expect at this step.</p>
        </div>
      </div>
    </div>
  )
}


