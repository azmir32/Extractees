import { useMemo } from 'react'
import { MailIcon, VaultIcon, FileIcon, ShieldCheckIcon, SparklesIcon } from './Icons'

export function EmailToVaultDemo() {
  // Generate different delays for tiles so the motion feels organic
  const tileDelays = useMemo(() => [0, 150, 300], [])

  return (
    <div className="rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-4 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Glow sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-[glow-sweep_2.4s_linear_infinite]" />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>acc-0001.extractees.com</div>
        <div className="inline-flex items-center gap-1 text-primary animate-[live-pulse_2s_ease-in-out_infinite]">
          <SparklesIcon className="size-4" /> live
        </div>
      </div>
      <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 relative">
        {tileDelays.map((d, i) => (
          <div key={i} className="relative">
            <div
              className="rounded-md border border-border bg-background/80 backdrop-blur h-12 sm:h-16 flex items-center justify-center shadow-sm"
              style={{ animation: `tile-move 3.2s ease-in-out ${d}ms infinite` as string }}
            >
              {i === 0 ? <MailIcon className="size-6" /> : <FileIcon className="size-6" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3">
        <VaultIcon className="size-8 sm:size-10" />
        <div className="text-xs sm:text-sm text-muted-foreground">Secure vault storage</div>
        <ShieldCheckIcon className="size-5 text-primary" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
    </div>
  )
}


