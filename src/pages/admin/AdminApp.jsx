import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../lib/useAuth'
import AdminShell from '../../components/admin/AdminShell'
import Login from './Login'
import Overview from './Overview'
import Leads from './Leads'
import Newsletter from './Newsletter'
import TourAdmin from './TourAdmin'
import VideosAdmin from './VideosAdmin'

// Sous-application admin — chargée en lazy (chunk séparé) pour garder
// le bundle public léger. Supabase n'est tiré que par cette branche + les
// handlers de formulaires (import dynamique).
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AdminShell />}>
          <Route index element={<Overview />} />
          <Route path="leads" element={<Leads />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="tour" element={<TourAdmin />} />
          <Route path="videos" element={<VideosAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
