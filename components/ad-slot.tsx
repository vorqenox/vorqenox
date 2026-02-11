"use client"

import { useState, useEffect } from "react"
import type { SiteSettings, InternalAd } from "@/lib/data"

export function AdSlot({
  position,
  page = "home",
}: {
  position: "top" | "middle" | "bottom"
  page?: "home" | "article" | "landing"
}) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  // Zero-space logic: use display:none when ads disabled
  if (settings) {
    const toggleMap = {
      home: settings.adToggles?.homeAds ?? true,
      article: settings.adToggles?.articleAds ?? true,
      landing: settings.adToggles?.landingAds ?? true,
    }
    if (!toggleMap[page]) {
      return <div style={{ display: "none" }} />
    }
  }

  // Check for enabled internal ads
  const enabledAds = (settings?.internalAds ?? []).filter((ad: InternalAd) => ad.enabled && ad.imageUrl)

  if (enabledAds.length > 0) {
    // Pick a random internal ad to display
    const ad = enabledAds[Math.floor(Math.random() * enabledAds.length)]
    return (
      <div className="mx-auto max-w-7xl px-4 py-4">
        <a
          href={ad.cpaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl border border-primary/20 bg-card/50 transition-all hover:border-primary/40"
        >
          {ad.imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={ad.imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-auto w-full object-cover"
            />
          ) : (
            <img
              src={ad.imageUrl}
              alt={ad.title || "Advertisement"}
              className="h-auto w-full object-cover"
            />
          )}
          {ad.title && (
            <div className="px-4 py-2 text-center">
              <span className="text-xs font-medium text-primary">{ad.title}</span>
            </div>
          )}
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center justify-center rounded-xl border border-dashed border-primary/20 bg-card/50 p-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary/40">
            Advertisement
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground/50">
            {position} ad slot - 728x90
          </p>
        </div>
      </div>
    </div>
  )
}
