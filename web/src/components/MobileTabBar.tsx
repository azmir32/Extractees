import { Link } from '@tanstack/react-router'
import { useKeyboardVisible } from '../hooks/use-keyboard-visible'

export function MobileTabBar() {
  const keyboardVisible = useKeyboardVisible()

  const Item = ({ to, label }: { to: string; label: string }) => {
    return (
      <Link
        to={to}
        activeOptions={{ exact: to === '/' }}
        className={`flex-1 text-center py-2 text-xs text-muted-foreground [&.active]:text-primary`}
      >
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:hidden transition-transform duration-200 ${keyboardVisible ? 'translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto max-w-6xl grid grid-cols-3">
        <Item to="/" label="Home" />
        <a href="#steps" className="flex-1 text-center py-2 text-xs text-muted-foreground">Steps</a>
        <a href="#faq" className="flex-1 text-center py-2 text-xs text-muted-foreground">FAQ</a>
      </div>
    </nav>
  )
}


