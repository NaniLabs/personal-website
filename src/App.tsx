import { Route, Routes } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { usePortfolio } from '@/hooks/usePortfolio'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { useSeo } from '@/utils/seo'

function App() {
  const portfolio = usePortfolio()

  useSeo(portfolio)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-18rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan-500/16 blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_18%)]" />
      </div>

      <Navbar portfolio={portfolio} />

      <Routes>
        <Route path="/" element={<HomePage portfolio={portfolio} />} />
        <Route path="*" element={<NotFoundPage portfolio={portfolio} />} />
      </Routes>

      <Footer portfolio={portfolio} />
      <ScrollToTopButton label={portfolio.content.labels.backToTop} />
    </div>
  )
}

export default App
