interface ConnectorProps {
  direction?: 'right' | 'down'
}

export function Connector({ direction = 'right' }: ConnectorProps) {
  if (direction === 'down') {
    return (
      <div className="hidden md:flex items-center justify-center">
        <div className="relative h-10 w-px bg-border">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-[glow-sweep_1.6s_linear_infinite]" />
        </div>
      </div>
    )
  }
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative h-px w-12 bg-border">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-[glow-sweep_1.6s_linear_infinite]" />
      </div>
    </div>
  )
}


