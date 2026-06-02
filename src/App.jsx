import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Videos from './pages/Videos'
import ExplorerTour from './pages/ExplorerTour'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import Analytics from './components/Analytics'

// Dashboard admin : chunk lazy (n'alourdit pas le site public)
const AdminApp = lazy(() => import('./pages/admin/AdminApp'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Layout public : Navbar + page + Footer
function PublicLayout() {
  return (
    <>
      <a href="#main" className="skip-link">Aller au contenu</a>
      <Navbar />
      <div id="main">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <Routes>
          {/* Site public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/explorer-tour" element={<ExplorerTour />} />
            <Route path="/partenariats" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard admin (lazy) */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }} />}>
                <AdminApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
