import { Play, Eye } from 'lucide-react'
import { PlatformIcon } from './BrandIcons'

// Carte vidéo VERTICALE 9:16 (style TikTok/Shorts). Lien réel sortant.
export default function VideoCard({ video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl card-surface"
      style={{ aspectRatio: '9 / 16' }}
    >
      <img
        src={video.poster}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay dégradé bas */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.1) 55%, rgba(10,10,10,0.25) 100%)' }}
      />

      {/* Badge plateforme haut-gauche */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{ backgroundColor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(6px)' }}
      >
        <PlatformIcon platform={video.platform} size={13} color="#fff" />
        <span className="font-heading font-bold text-[10px] uppercase tracking-wider" style={{ color: '#fff' }}>
          {video.platform}
        </span>
      </div>

      {/* Vues haut-droite */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full"
        style={{ backgroundColor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(6px)', color: '#fff' }}
      >
        <Eye size={11} />
        <span className="font-heading font-bold text-[10px]">{video.views}</span>
      </div>

      {/* Play central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-fire"
          style={{ boxShadow: '0 8px 30px rgba(255,107,0,0.45)' }}
        >
          <Play size={22} fill="#0A0A0A" style={{ color: '#0A0A0A', marginLeft: 2 }} />
        </div>
      </div>

      {/* Titre bas */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="eyebrow text-[9px]">{video.category}</span>
        <h3 className="font-heading font-bold text-sm leading-snug mt-1" style={{ color: '#fff' }}>
          {video.title}
        </h3>
      </div>
    </a>
  )
}
