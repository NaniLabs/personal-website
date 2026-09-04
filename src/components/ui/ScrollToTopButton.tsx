import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ScrollToTopButtonProps {
  label: string
}

export function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'scroll-to-top',
        visible ? 'scroll-to-top-visible' : 'scroll-to-top-hidden'
      )}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}