import { useEffect, useState } from 'react'
import { TOUR_CITIES, VIDEOS, FEATURED_VIDEO } from './constants'

// ─────────────────────────────────────────────────────────────
// Contenu piloté par la base (dashboard) avec repli sur les constantes.
// Supabase est importé dynamiquement → 0 impact sur le bundle initial.
// Le SEO (prerender + JSON-LD) reste basé sur les constantes ; pour rafraîchir
// le HTML/SEO après une modif dashboard, déclencher un rebuild (webhook deploy).
// ─────────────────────────────────────────────────────────────

const MONTHS_FR = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']

export function formatFrDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`
}

// Dates de tournée — DB (bk_tour_dates) sinon TOUR_CITIES
export function useTourDates() {
  const [dates, setDates] = useState(TOUR_CITIES)
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const { supabase, hasSupabase } = await import('./supabase')
        if (!hasSupabase) return
        const { data, error } = await supabase
          .from('bk_tour_dates')
          .select('*')
          .neq('status', 'cancelled')
          .order('sort')
          .order('event_date')
        if (error || !data || !data.length || !active) return
        setDates(
          data.map((r) => ({
            city: r.city,
            country: r.country,
            date: formatFrDate(r.event_date),
            venue: r.venue,
            ticketUrl: r.ticket_url || undefined,
          })),
        )
      } catch {
        /* repli constantes */
      }
    })()
    return () => { active = false }
  }, [])
  return dates
}

// Vidéos — DB (bk_videos) sinon VIDEOS
export function useVideos() {
  const [videos, setVideos] = useState(VIDEOS)
  const [featured, setFeatured] = useState(FEATURED_VIDEO)
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const { supabase, hasSupabase } = await import('./supabase')
        if (!hasSupabase) return
        const { data, error } = await supabase.from('bk_videos').select('*').order('sort')
        if (error || !data || !data.length || !active) return
        const mapped = data.map((r) => ({
          id: r.id,
          platform: r.platform,
          videoId: r.video_id,
          url: r.url,
          title: r.title,
          category: r.category,
          views: r.views,
          poster: r.poster,
          featured: r.featured,
        }))
        setVideos(mapped)
        const feat = mapped.find((v) => v.featured)
        if (feat) setFeatured({ platform: feat.platform, id: feat.videoId, url: feat.url, title: feat.title, category: feat.category })
      } catch {
        /* repli constantes */
      }
    })()
    return () => { active = false }
  }, [])
  return { videos, featured }
}
