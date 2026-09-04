interface SectionHeaderProps {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <div className="section-header-accent">
        <div className="section-header-accent-line" aria-hidden="true" />
        <p className="section-header-eyebrow">{eyebrow}</p>
      </div>
      <h2 className="section-header-title">{title}</h2>
      <p className="section-header-description">{description}</p>
    </div>
  )
}