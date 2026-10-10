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