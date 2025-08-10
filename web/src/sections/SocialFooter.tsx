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
    <footer className="mt-20 border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-semibold tracking-tight">Extractees Sdn.Bhd.</div>
            <div className="text-muted-foreground">Kuala Lumpur — {time}</div>
            <a href="mailto:dev@extractees.com" className="text-primary hover:opacity-80">dev@extractees.com</a>
          </div>
          <nav className="flex items-center gap-2 text-muted-foreground">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center rounded-full p-2 border border-border bg-background hover:bg-muted transition-colors"
            >
              <XIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center rounded-full p-2 border border-border bg-background hover:bg-muted transition-colors"
            >
              <InstagramIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center rounded-full p-2 border border-border bg-background hover:bg-muted transition-colors"
            >
              <LinkedInIcon className="size-4 group-hover:text-foreground" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center rounded-full p-2 border border-border bg-background hover:bg-muted transition-colors"
            >
              <GitHubIcon className="size-4 group-hover:text-foreground" />
            </a>
          </nav>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">© {new Date().getFullYear()} Extractees</div>
      </div>
    </footer>
  )
}


