interface SectionHeaderProps {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
      <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-neutral-400 sm:text-lg">{description}</p>
    </div>
  )
}
