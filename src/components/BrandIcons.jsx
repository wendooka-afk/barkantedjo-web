// Brand glyphs (lucide n'a pas YouTube/TikTok/Instagram en v1)
export function YouTubeIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  )
}

export function TikTokIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.4-1.4 4.8 4.8 0 0 1-1.3-2.6h-3.3v11.8a2.9 2.9 0 0 1-2.9 2.8 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 3.8-2.7V8.3a6.2 6.2 0 0 0-1-.1A6.2 6.2 0 0 0 2.5 14.4 6.2 6.2 0 0 0 8.6 20.6a6.2 6.2 0 0 0 6.2-6.2V8.1a8 8 0 0 0 4.8 1.6V6.7z" />
    </svg>
  )
}

export function FacebookIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
    </svg>
  )
}

export function PlatformIcon({ platform, size = 20, color = 'currentColor' }) {
  if (platform === 'youtube') return <YouTubeIcon size={size} color={color} />
  if (platform === 'tiktok') return <TikTokIcon size={size} color={color} />
  return <FacebookIcon size={size} color={color} />
}
