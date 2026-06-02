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
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Site public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/explorer-tour" element={<ExplorerTour />} />
          <Route path="/partenariats" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
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
  )
}
