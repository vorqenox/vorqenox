"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCards } from "@/components/hero-cards"
import { SwiperSection } from "@/components/swiper-section"
import { CategoryTabs } from "@/components/category-tabs"
import { AdSlot } from "@/components/ad-slot"
import { SocialProofToast } from "@/components/social-proof-toast"
import type { Article } from "@/lib/data"

export function HomeClient({ articles }: { articles: Article[] }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <AdSlot position="top" page="home" />
        <HeroCards articles={articles} />
        <SwiperSection articles={articles} />
        <AdSlot position="middle" page="home" />
        <CategoryTabs articles={articles} />
        <AdSlot position="bottom" page="home" />
      </main>

      <Footer />
      <SocialProofToast />
    </div>
  )
}
