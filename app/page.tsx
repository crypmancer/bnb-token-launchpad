"use client"

import { useState } from "react"
import { TransactionTicker } from "../components/transaction-ticker"
import { Navigation } from "../components/navigation"
import { TokenGrid } from "../components/token-grid"
import { SearchBar } from "../components/search-bar"
import { FilterTabs } from "../components/filter-tabs"
import React from "react"

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <TransactionTicker />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Create Token</h1>
          <p className="text-muted-foreground text-lg">Launch your meme coin on BSC in seconds</p>
        </div>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <TokenGrid activeFilter={activeFilter} searchQuery={searchQuery} />
      </main>
    </div>
  )
}
