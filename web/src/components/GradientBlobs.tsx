export function GradientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side_at_50%_50%,theme(colors.primary)_0%,transparent_70%)] opacity-20" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side_at_50%_50%,theme(colors.secondary)_0%,transparent_70%)] opacity-30" />
    </div>
  )
}


