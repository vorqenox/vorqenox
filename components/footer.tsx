"use client"

import Link from "next/link"
import { Linkedin } from "lucide-react"
import { useState, useEffect }
import type { SiteSettings } from "@/lib/data" from "react"

export function Footer() {
  const [year, setYear] = useState<number | null>(null)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <span className="text-xs font-bold neon-text">V</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                Vorqe<span className="neon-text">nox</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The ultimate destination for premium apps, games, AI tools, and
              exclusive digital offers.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${settings?.supportEmail || "Vorqenox@gmail.com"}`}
                className="text-sm text-primary transition-opacity hover:opacity-80"
              >
                {settings?.supportEmail || "Vorqenox@gmail.com"}
              </a>
              {settings?.socialLinks?.linkedinEnabled && settings?.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {year ? `© ${year} Vorqenox. All rights reserved.` : "© Vorqenox. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
