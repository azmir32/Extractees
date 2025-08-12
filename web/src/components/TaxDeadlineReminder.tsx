import { useEffect, useMemo, useState } from 'react'
import { CalendarIcon } from './Icons'

interface TaxDeadlineReminderProps {
  form?: 'BE' | 'B'
  year?: number
  inline?: boolean
  className?: string
  compact?: boolean
  banner?: boolean
}

// Defaults to Malaysia e-Filing deadlines (individuals without business income: Form BE)
// Form BE e-Filing: 15 May (following year)
// Form B e-Filing: 15 July (following year)
export function TaxDeadlineReminder({ form = 'BE', year, inline = false, className, compact = false, banner = false }: TaxDeadlineReminderProps) {
  const computeTargetDate = useMemo(() => {
    const now = new Date()
    const monthIndex = form === 'BE' ? 4 : 6 // May=4, July=6 (0-based)
    const day = 15
    const targetYear = year ?? now.getFullYear()
    let target = new Date(targetYear, monthIndex, day, 23, 59, 59)
    if (year == null && target <= now) {
      target = new Date(targetYear + 1, monthIndex, day, 23, 59, 59)
    }
    return target
  }, [form, year])

  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, computeTargetDate.getTime() - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingMs(Math.max(0, computeTargetDate.getTime() - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [computeTargetDate])

  const formLabel = form === 'BE' ? 'Form BE' : 'Form B'
  const dateLabel = `${computeTargetDate.getDate()} ${computeTargetDate.toLocaleString(undefined, { month: 'long' })} ${computeTargetDate.getFullYear()}`

  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad2 = (n: number) => String(n).padStart(2, '0')

  const Card = (
      <div className={"relative isolate overflow-hidden rounded-[12px] border border-border bg-card " + (compact ? 'p-2 sm:p-2' : 'p-3 sm:p-4') + ' ' + (className ?? '')}>
        <div className={"flex " + (compact ? 'items-center gap-2' : 'flex-col gap-3 sm:flex-row sm:items-center sm:justify-between')}>
          <div className={"flex items-center " + (compact ? 'gap-2' : 'gap-3')}>
            <div className={"rounded-md border border-border bg-background text-primary shadow-sm " + (compact ? 'p-1.5' : 'p-2')}>
              <CalendarIcon className={compact ? 'size-4' : 'size-5'} />
            </div>
            <div className={compact ? 'text-xs' : 'text-sm'}>
              {!compact && <div className="font-medium">Malaysia Personal Tax e‑Filing Deadline</div>}
              <div className="text-muted-foreground">{formLabel}: {dateLabel}</div>
            </div>
          </div>
          <div className={"grid grid-flow-col auto-cols-fr text-center " + (compact ? 'gap-1.5' : 'gap-2')}>
            <div className={"rounded-md border border-border bg-background " + (compact ? 'px-1.5 py-0.5' : 'px-2 py-1')}>
              <div className={"font-mono font-semibold " + (compact ? 'text-[11px]' : 'text-sm')}>{days}</div>
              <div className={"text-[9px] text-muted-foreground " + (compact ? 'leading-3' : '')}>DAYS</div>
            </div>
            <div className={"rounded-md border border-border bg-background " + (compact ? 'px-1.5 py-0.5' : 'px-2 py-1')}>
              <div className={"font-mono font-semibold " + (compact ? 'text-[11px]' : 'text-sm')}>{pad2(hours)}</div>
              <div className={"text-[9px] text-muted-foreground " + (compact ? 'leading-3' : '')}>HRS</div>
            </div>
            <div className={"rounded-md border border-border bg-background " + (compact ? 'px-1.5 py-0.5' : 'px-2 py-1')}>
              <div className={"font-mono font-semibold " + (compact ? 'text-[11px]' : 'text-sm')}>{pad2(minutes)}</div>
              <div className={"text-[9px] text-muted-foreground " + (compact ? 'leading-3' : '')}>MIN</div>
            </div>
            <div className={"rounded-md border border-border bg-background " + (compact ? 'px-1.5 py-0.5' : 'px-2 py-1')}>
              <div className={"font-mono font-semibold " + (compact ? 'text-[11px]' : 'text-sm')}>{pad2(seconds)}</div>
              <div className={"text-[9px] text-muted-foreground " + (compact ? 'leading-3' : '')}>SEC</div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>
  )

  if (banner) {
    return (
      <div className="w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-2">
          {/* Banner uses compact inner card without border/rounding */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="rounded-md border border-border bg-background p-1.5 text-primary shadow-sm">
                <CalendarIcon className="size-4" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-medium hidden sm:inline">Malaysia Personal Tax e‑Filing Deadline · </span>
                <span className="text-muted-foreground">{formLabel}: {dateLabel}</span>
              </div>
            </div>
            <div className="grid grid-flow-col auto-cols-fr gap-1.5 text-center">
              <div className="rounded-md border border-border bg-background px-1.5 py-0.5">
                <div className="font-mono text-[11px] font-semibold">{days}</div>
                <div className="text-[9px] text-muted-foreground leading-3">D</div>
              </div>
              <div className="rounded-md border border-border bg-background px-1.5 py-0.5">
                <div className="font-mono text-[11px] font-semibold">{pad2(hours)}</div>
                <div className="text-[9px] text-muted-foreground leading-3">H</div>
              </div>
              <div className="rounded-md border border-border bg-background px-1.5 py-0.5">
                <div className="font-mono text-[11px] font-semibold">{pad2(minutes)}</div>
                <div className="text-[9px] text-muted-foreground leading-3">M</div>
              </div>
              <div className="rounded-md border border-border bg-background px-1.5 py-0.5">
                <div className="font-mono text-[11px] font-semibold">{pad2(seconds)}</div>
                <div className="text-[9px] text-muted-foreground leading-3">S</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (inline) return Card
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6">{Card}</div>
  )
}


