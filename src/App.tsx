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
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-12rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-[16rem] w-[16rem] rounded-full bg-[var(--color-accent-violet)]/8 blur-3xl" />
      </div>

      <Navbar portfolio={portfolio} />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage portfolio={portfolio} />} />
          <Route path="*" element={<NotFoundPage portfolio={portfolio} />} />
        </Routes>
      </main>

      <Footer portfolio={portfolio} />
      <ScrollToTopButton label={portfolio.content.labels.backToTop} />
    </div>
  )
}

export default App