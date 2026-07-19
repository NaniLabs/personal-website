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
      className={`fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg backdrop-blur transition duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
