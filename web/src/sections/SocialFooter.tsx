import { useEffect, useState } from 'react'
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from '../components/Icons'

function useKualaLumpurTime() {
  const [now, setNow] = useState<string>('')
  useEffect(() => {
    const update = () => {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setNow(formatter.format(new Date()))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function SocialFooter() {
  const time = useKualaLumpurTime()
  return (
    <footer className="relative mt-20 border-t border-border/80 bg-gradient-to-b from-transparent to-primary/5">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-foreground font-semibold tracking-tight">Extractees Sdn.Bhd.</div>
            <div className="text-muted-foreground">Kuala Lumpur — {time}</div>
            <a href="mailto:dev@extractees.com" className="text-primary hover:opacity-80">dev@extractees.com</a>
          </div>
          <nav className="flex items-center gap-3 text-muted-foreground">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="group rounded-full p-2 border border-border hover:bg-card">
              <XIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group rounded-full p-2 border border-border hover:bg-card">
              <InstagramIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group rounded-full p-2 border border-border hover:bg-card">
              <LinkedInIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="group rounded-full p-2 border border-border hover:bg-card">
              <GitHubIcon className="size-4 group-hover:text-foreground" />
            </a>
          </nav>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">© {new Date().getFullYear()} Extractees</div>
      </div>
    </footer>
  )
}


